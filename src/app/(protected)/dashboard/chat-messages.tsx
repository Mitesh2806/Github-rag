// components/chat-messages.tsx
"use client";

import { useUIState } from "ai/rsc";
import MDEditor from "@uiw/react-md-editor";

export const ChatMessages = () => {
  const [messages] = useUIState();

  return (
    <div className="space-y-4">
      {messages.map((message: any) => (
        <div key={message.id} className="p-4 bg-card rounded-lg border">
          <MDEditor.Markdown 
            source={typeof message.content === 'string' ? message.content : ''}
            className="!bg-transparent !text-foreground"
          />
          {message.data?.fileReferences && (
            <div className="mt-4 text-sm">
              <h3 className="font-semibold mb-2">Relevant files:</h3>
              <ul className="space-y-1">
                {message.data.fileReferences.map((file: any, i: number) => (
                  <li key={i} className="text-muted-foreground">
                    {file.fileName} - {file.summary.slice(0, 80)}...
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};