GitHub RAG (Retrieval-Augmented Generation)
===========================================

A powerful Next.js application that allows you to "chat" with your GitHub repositories. This tool indexes your codebase and commit history using AI, enabling you to ask questions about your code and view intelligent summaries of your project's evolution.

🚀 Features
-----------

*   **Codebase Indexing**: Automatically fetches and indexes GitHub repositories using LangChain.
    
*   **RAG (Retrieval-Augmented Generation)**: Uses vector embeddings to understand and answer questions about your source code.
    
*   **AI Commit Summaries**: Generates concise, human-readable bullet points for git commits using Gemini AI, focusing on the "what" and "why" of changes.
    
*   **Vector Search**: Utilizes PostgreSQL with pgvector for efficient semantic search over code summaries.
    
*   **Project Dashboard**: Manage multiple repositories and view commit history visually.
    

🛠️ Tech Stack
--------------

*   **Framework**: [Next.js 15+](https://nextjs.org/) (App Router)
    
*   **Language**: [TypeScript](https://www.typescriptlang.org/)
    
*   **Database**: [PostgreSQL](https://www.postgresql.org/) (with vector extension)
    
*   **ORM**: [Prisma](https://www.prisma.io/)
    
*   **AI & LLM**:
    
    *   [Google Gemini 2.0 Flash](https://deepmind.google/technologies/gemini/) (for summarization)
        
    *   text-embedding-004 (for vector embeddings)
        
    *   [LangChain](https://js.langchain.com/) (for document loading and processing)
        
*   **Authentication**: [Clerk](https://clerk.com/)
    
*   **API**: [tRPC](https://trpc.io/)
    
*   **Styling**: [Tailwind CSS](https://tailwindcss.com/) & [Shadcn UI](https://ui.shadcn.com/)
    
*   **GitHub Interaction**: [Octokit](https://github.com/octokit)
    

⚙️ Prerequisites
----------------

Before you begin, ensure you have the following installed:

*   **Node.js** (v18 or higher)
    
*   **npm** or **yarn**
    
*   **PostgreSQL** database (must support the vector extension)
    

📦 Installation & Setup
-----------------------

1.  Bashgit clone cd Github-rag
    
2.  Bashnpm install
    
3.  Code snippet# Database (Postgres with pgvector support)DATABASE\_URL="postgresql://user:password@localhost:5432/github\_rag"# Google Gemini API KeyGOOGLE\_API\_KEY="your\_google\_api\_key\_here"# Clerk AuthenticationNEXT\_PUBLIC\_CLERK\_PUBLISHABLE\_KEY="your\_clerk\_publishable\_key"CLERK\_SECRET\_KEY="your\_clerk\_secret\_key"# GitHub Token (Optional but recommended for higher rate limits)GITHUB\_TOKEN="your\_github\_personal\_access\_token"
    
4.  Push the Prisma schema to your database:Bashnpm run db:push# ORnpm run db:migrate_Note: The schema requires the vector extension. Prisma will attempt to enable it via the postgresqlExtensions preview feature._
    
5.  Bashnpm run devThe app should now be running at http://localhost:3000.
    

📜 Scripts
----------

*   npm run dev: Starts the development server using Turbopack.
    
*   npm run build: Builds the application for production.
    
*   npm run db:generate: Generates the Prisma client.
    
*   npm run db:studio: Opens Prisma Studio to view/edit your database data.
    
*   npm run check: Runs ESLint and Type checking.
    

🗃️ Database Schema
-------------------

The core models include:

*   **User**: Stores authenticated user details.
    
*   **Project**: Represents a linked GitHub repository.
    
*   **Commit**: Stores commit history with AI-generated summaries.
    
*   **SourceCodeEmbedding**: Stores vector embeddings and summaries of file contents for RAG functionality.
    

🤝 Contributing
---------------

1.  Fork the repository.
    
2.  Create a new branch (git checkout -b feature/amazing-feature).
    
3.  Commit your changes (git commit -m 'Add some amazing feature').
    
4.  Push to the branch (git push origin feature/amazing-feature).
    
5.  Open a Pull Request.
