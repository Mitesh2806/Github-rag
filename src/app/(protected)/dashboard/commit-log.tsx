"use client";

import useProject from "@/hooks/use-project";
import { api } from "@/trpc/react";
import React from "react";
import Image from "next/image";

const CommitLog = () => {
    const { projectId } = useProject();
    const { data: commits, isLoading } = api.project.getCommits.useQuery({
        projectId
    });

    if (isLoading) return <div>Loading...</div>;
    if (!commits) return <div>No commits found</div>;

    return (
        <div className="flex flex-col gap-4">
            {commits?.map((commit) => (
                <div key={commit.id} className="flex items-start gap-4 p-4 border rounded-lg">
                    {/* Author Avatar */}
                    

                    {/* Commit Details */}
                    <div className="flex-1">
                        <div className="flex items-baseline gap-2">
                            <h3 className="text-lg font-semibold">{commit.commitAuthorName}</h3>
                            <span className="text-sm text-gray-500 font-mono">
                                {commit.commitHash.substring(0, 7)}
                            </span>
                        </div>
                        
                        {/* Commit Message */}
                        <p className="text-gray-800 mt-1">{commit.commitMessage}</p>
                        
                        {/* AI Summary */}
                        {commit.summary && (
                            <p className="text-sm text-gray-500 mt-2">
                                AI Summary: {commit.summary}
                            </p>
                        )}
                    </div>
                </div>
            ))}
        </div>
    );
}

export default CommitLog;