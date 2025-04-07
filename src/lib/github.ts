import { db } from "@/server/db";
import axios from "axios";
import { Octokit } from "octokit";
import { aiSummariseCommit } from "./gemini";

export const octokit = new Octokit({
    auth: process.env.GITHUB_TOKEN,
});

interface Response {
    commitHash: string;
    commitMessage: string;
    commitAuthorName: string;
    commitAuthorAvatar: string;
    commitDate: string;
}

export const getCommitHashes = async (githubUrl: string): Promise<Response[]> => {
    const [owner, repo] = githubUrl.split('/').slice(-2);
    if (!owner || !repo) {
        throw new Error("Invalid GitHub URL");
    }
    const { data } = await octokit.rest.repos.listCommits({
        owner,
        repo
    });

    const sortedCommits = data.sort((a: any, b: any) =>
        new Date(b.commit.author.date).getTime() - new Date(a.commit.author.date).getTime()
    );

    return sortedCommits.slice(0, 20).map((commit: any) => ({
        commitHash: commit.sha as string,
        commitMessage: commit.commit.message ?? "",
        commitAuthorName: commit.commit?.author?.name ?? "",
        commitAuthorAvatar: commit.author?.avatar ?? "",
        commitDate: commit.commit?.author?.date ?? "",
    }));
}

export const pollCommits = async (projectId: string) => {
    const { project, githubUrl } = await fetchProjectGithubUrl(projectId);
    const commitHashes = await getCommitHashes(githubUrl);
    const unprocessedCommits = await filterUnprocessedCommits(commitHashes, projectId);
    const summaryResponses = await Promise.allSettled(
        unprocessedCommits.map(async (commit) => {
            return summariseCommit(githubUrl, commit.commitHash);
        })
    );
    const summaries = summaryResponses.map((response) => {
        if (response.status === "fulfilled") {
            return response.value as string;
        }
        return "No summary available";
})
const commits = await db.commit.createMany({
    data: summaries.map((summary, index) => {
        return{
            projectId: projectId,
            commitHash: unprocessedCommits[index]!.commitHash,
            commitMessage: unprocessedCommits[index]!.commitMessage,
            commitAuthorName: unprocessedCommits[index]!.commitAuthorName,
            commitAuthorAvatar: unprocessedCommits[index]!.commitAuthorAvatar,
            commitDate: unprocessedCommits[index]!.commitDate,
            summary

        }
        
    })
})
 return commits
}

const summariseCommit = async (githubUrl: string, commitHash: string) => {
    const { data } = await axios.get(`${githubUrl}/commits/${commitHash}.diff`, {
        headers: {
            Accept: 'application/vnd.github.v3.diff',
        }
    });
    console.log("Diff data:", data);
    return(await aiSummariseCommit(data)) || "No summary available";
}

async function fetchProjectGithubUrl(projectId: string) {
    const project = await db.project.findUnique({
        where: { id: projectId },
        select: { githubUrl: true },
    });

    if (!project?.githubUrl) {
        throw new Error("Project not found or no GitHub URL provided.");
    }
    return { project, githubUrl: project.githubUrl };
}

async function filterUnprocessedCommits(commitHashes: Response[], projectId: string): Promise<Response[]> {
    const processedCommits = await db.commit.findMany({
        where: {
            projectId
        }
    });
    return commitHashes.filter(commit =>
        !processedCommits.some(processedCommit => processedCommit.commitHash === commit.commitHash)
    );
}