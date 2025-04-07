'use client'

import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import type { Commit } from '@prisma/client';

ChartJS.register(ArcElement, Tooltip, Legend);

export default function CommitPieChart({ commits }: { commits: Commit[] }) {
  // Process commit data for chart
  const authorCounts = commits.reduce((acc, commit) => {
    const author = commit.commitAuthorName || 'Unknown';
    acc[author] = (acc[author] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const chartData = {
    labels: Object.keys(authorCounts),
    datasets: [
      {
        label: 'Commits by Author',
        data: Object.values(authorCounts),
        backgroundColor: [
          '#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', 
          '#9966FF', '#FF9F40', '#FFCD56', '#47BCC7'
        ],
        hoverOffset: 4
      }
    ]
  };

  return (
    <div className="bg-white rounded-lg shadow p-6 mb-6">
      <h2 className="text-xl font-semibold mb-4">Commit Distribution</h2>
      <div className="max-w-md mx-auto">
        <Pie 
          data={chartData} 
          options={{
            responsive: true,
            plugins: {
              legend: {
                position: 'right',
                labels: {
                  boxWidth: 15
                }
              }
            }
          }}
        />
      </div>
    </div>
  );
}