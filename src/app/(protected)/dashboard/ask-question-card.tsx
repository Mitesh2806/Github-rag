"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogClose, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import useProject from "@/hooks/use-project";
import MDEditor from "@uiw/react-md-editor";
import { useState } from "react";
import { askQuestion } from "./actions";
import { readStreamableValue } from "ai/rsc";
import { Button } from "@/components/ui/button";

const AskQuestionCard = () => {
    const { project } = useProject();
    const [open, setOpen] = useState(false);
    const [question, setQuestion] = useState("");
    const [loading, setLoading] = useState(false);
    const [fileReferences, setFileReferences] = useState<{ fileName: string; sourceCode: string; summary: string }[]>([]);
    const [answer, setAnswer] = useState('');

    const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        setAnswer('');
        setFileReferences([]);
        if (!project?.id) return;
        setLoading(true);
        e.preventDefault();
        setOpen(true);

        const { output, fileReferences } = await askQuestion(question, project.id);
        setFileReferences(fileReferences);

        for await (const delta of readStreamableValue(output)) {
            if (delta) {
                setAnswer(ans => ans + delta);
            }
        }
        setLoading(false);
    };

    return (
        <>
            <Card className="relative col-span-3">
                <CardHeader>
                    <CardTitle>Ask a question</CardTitle>
                </CardHeader>
                <CardContent>
                    <form onSubmit={onSubmit}>
                        <Textarea 
                            placeholder="Which file should I edit to change the home page?" 
                            value={question} 
                            onChange={(e) => setQuestion(e.target.value)} 
                            className="resize-none" 
                            rows={3} 
                        />
                        <div className="h-4"></div>
                        <Button type="submit" disabled={loading}>
                            {loading ? "Asking..." : "Ask"}
                        </Button>
                    </form>
                </CardContent>
            </Card>

            <Dialog open={open} onOpenChange={setOpen}>
                <DialogContent className="max-w-[80vw] max-h-[80vh] flex flex-col">
                    <DialogHeader>
                        <DialogTitle>Answer</DialogTitle>
                    </DialogHeader>
                    
                    <div className="flex-1 overflow-auto space-y-4">
                        <MDEditor.Markdown 
                            source={answer} 
                            className="!bg-transparent !text-foreground"
                        />
                        
                        {fileReferences.length > 0 && (
                            <div className="mt-4 text-sm">
                                <h3 className="font-semibold mb-2">Relevant files:</h3>
                                <ul className="space-y-1">
                                    {fileReferences.map((file, i) => (
                                        <li key={i} className="text-muted-foreground">
                                            {file.fileName} - {file.summary.slice(0, 80)}...
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        )}
                    </div>

                    <DialogClose asChild>
                        <Button className="mt-4" type="button">
                            Close
                        </Button>
                    </DialogClose>
                </DialogContent>
            </Dialog>
        </>
    );
};

export default AskQuestionCard;