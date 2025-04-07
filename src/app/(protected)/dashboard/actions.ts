"use server";

import {streamText} from "ai";
import { createStreamableValue} from "ai/rsc";
import {createGoogleGenerativeAI} from "@ai-sdk/google";
import { generateEmbedding } from "@/lib/gemini";
import { db } from "@/server/db";

const google = createGoogleGenerativeAI({
    apiKey: process.env.GOOGLE_API_KEY,
})

export async function askQuestion(question:string, projectId: string){
    const stream = createStreamableValue()

    const queryVector = await generateEmbedding(question)
    const vectorQuery = `[${queryVector.join(",")}]`

    const result = await db.$queryRaw<{fileName: string; sourceCode: string; summary: string}[]>
    ` SELECT "fileName", "sourceCode", "summary",
    1- ("summaryEmbedding" <=>${vectorQuery}:: vector) AS similarity
    FROM "SourceCodeEmbedding"
    WHERE 1 - ("summaryEmbedding" <=> ${vectorQuery}:: vector) > 0.5
    AND "projectId" = ${projectId}
    ORDER BY similarity DESC
    LIMIT 10`

    let context = ''
    for (const doc of result){
        context += `source:${doc.fileName}\n code content:${doc.sourceCode}\n summary:${doc.summary}\n\n`
    }
    (async () => {
        const {textStream}= await streamText({
            model: google('gemini-2.0-flash'),
            prompt: `You are an expert programmer, and you are trying to answer a question about a code snippet.\n\nContext:\n${context}\n\nQuestion:\n${question}\n\nAnswer:`,
        })
        

        for await (const delta of textStream){
            stream.update(delta)
        }

        stream.done()
    })()

    return{
        output: stream.value,
        fileReferences: result
    }

}