import {GoogleGenerativeAI} from '@google/generative-ai';
import { Document } from '@langchain/core/documents';

if (!process.env.GOOGLE_API_KEY) throw new Error('GOOGLE_API_KEY environment variable is not set');
const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY);
const model = genAI.getGenerativeModel({ model: 'gemini-2.0-flash' });

export const aiSummariseCommit = async (diff: string) => {
    const response = await model.generateContent(
        `You are an expert programmer analyzing a git diff. Provide a concise, point-by-point summary of the changes.

INSTRUCTIONS:
1. Focus ONLY on actual code changes, not context lines
2. Group related changes by file or functionality
3. Format each change as a bullet point starting with "•"
4. For each change, briefly explain WHAT changed and WHY it matters (if obvious from context)
5. Include the file path in [square brackets] at the end of each point
6. Prioritize meaningful changes over trivial ones (like whitespace or comments)
7. Limit to 3-7 bullet points total, depending on complexity

EXAMPLE OUTPUT:
• Added pagination support to user listings with a default limit of 25 results [src/controllers/userController.ts]
• Fixed authentication bug by properly validating JWT tokens before database queries [src/middleware/auth.ts]
• Refactored database connection to use connection pooling for better performance [src/db/connection.ts]

Do NOT include example points in your response. Analyze and summarize the following diff:

${diff}`
    );
   
    return response.response.text();
};

export async function summariseCode(doc: Document) {
    const code = doc.pageContent.slice(0, 10000);
    const response = await model.generateContent(
        `You are an expert software developer explaining code to another developer. Your task is to analyze and summarize this code file.

INSTRUCTIONS:
1. First identify the programming language and overall purpose of this file (${doc.metadata.source})
2. Provide a concise summary of what this code does in 1-2 sentences
3. List the main components/functions/classes with bullet points (•), describing what each one does
4. Highlight any important patterns, libraries, or techniques used
5. Note any potential issues or areas for improvement
6. Keep explanations technical but clear - assume the reader is a competent developer

The code to analyze:
\`\`\`
${code}
\`\`\``
    );
    return response.response.text();
}

export async function generateEmbedding(summary:string){
    const model = genAI.getGenerativeModel({
        model: "text-embedding-004",
    })
    const result = await model.embedContent(summary);
    const embedding = result.embedding;
    return embedding.values;
}