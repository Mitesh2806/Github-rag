"use client";

import useProject from "@/hooks/use-project";
import { useUser } from "@clerk/nextjs";
import CommitLog from "@/app/(protected)/dashboard/commit-log";
import AskQuestionCard from "@/app/(protected)/dashboard/ask-question-card";
import CommitPieChart from "@/app/(protected)/dashboard/commit-pie-chart";
import { useEffect, useState } from "react";
import { api } from "@/trpc/react";

export default function Dashboard() {
  const { project, projectId } = useProject();
  const [commits, setCommits] = useState<Commit[]>([]);
  
  const { data } = api.project.getCommits.useQuery(
    { projectId: projectId ?? "" },
    { enabled: !!projectId }
  );

  useEffect(() => {
    if (data) {
      setCommits(data);
    }
  }, [data]);

  return (
    <div className="flex flex-col items-center justify-between p-8">
      <div className="w-full max-w-4xl">
        {/* Project Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">{project?.name}</h1>
          {project?.githubUrl && (
            <p className="text-gray-600">
              GitHub Repository:{" "}
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-500 hover:underline"
              >
                {project.githubUrl}
              </a>
            </p>
          )}
        </div>

        {/* Graph and Question Box Side by Side */}
        <div className="grid md:grid-cols-2 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow p-6">
            <CommitPieChart commits={commits} />
          </div>
          <div className="bg-white rounded-lg shadow p-6">
            <AskQuestionCard />
          </div>
        </div>

        {/* Commit Log Section */}
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-semibold mb-4">Recent Commits</h2>
          <CommitLog />
        </div>
      </div>
    </div>
  );
}