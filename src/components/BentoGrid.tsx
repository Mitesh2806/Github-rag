'use client';
import Container from "./Container";
import { Search, Shield, Database, Code2, GitBranch, ArrowRight, Zap } from "lucide-react";




const BentoGrid = () => (
  <section id="features" className="py-32">
    <Container>
      <div className="mb-16">
        <h2 className="text-3xl font-semibold tracking-tight text-zinc-900">Semantic Infrastructure</h2>
        <p className="mt-4 text-zinc-500 max-w-2xl">We don't just read text files. RepoSage parses the Abstract Syntax Tree (AST) to understand how your code actually executes.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-[300px]">
        
        {/* Card 1: Context Window */}
        <div className="md:col-span-2 bg-white rounded-xl border border-zinc-200 p-8 relative overflow-hidden group">
          <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:opacity-20 transition-opacity">
            <Code2 size={120} />
          </div>
          <div className="relative z-10 h-full flex flex-col justify-between">
            <div>
              <div className="w-10 h-10 bg-zinc-50 border border-zinc-100 rounded-lg flex items-center justify-center mb-6">
                <Search size={20} className="text-zinc-700" />
              </div>
              <h3 className="text-xl font-medium text-zinc-900">Infinite Context Window</h3>
              <p className="mt-2 text-zinc-500 text-sm leading-relaxed max-w-md">
                Our sliding window algorithm traces logic across imports. Whether a function is defined in `utils.ts` or `server.go`, RepoSage connects the dots.
              </p>
            </div>
            {/* Mock Visualization */}
            <div className="w-full h-24 bg-zinc-50 border border-zinc-100 rounded-lg mt-8 p-3 font-mono text-xs text-zinc-400 overflow-hidden flex flex-col gap-2">
              <div className="flex gap-2"><span className="text-purple-500">import</span> {`{ auth }`} <span className="text-purple-500">from</span> <span className="text-emerald-600">'./lib/auth'</span></div>
              <div className="flex gap-2"><span className="text-blue-500">const</span> user = <span className="text-yellow-600">await</span> auth.getUser();</div>
              <div className="h-px w-full bg-zinc-200 my-1"></div>
              <div className="text-zinc-300">// Tracing dependency...</div>
            </div>
          </div>
        </div>

        {/* Card 2: Embeddings */}
        <div className="md:col-span-1 bg-white rounded-xl border border-zinc-200 p-8 relative overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px] opacity-50"></div>
          <div className="relative z-10 h-full flex flex-col justify-between">
            <div>
               <div className="w-10 h-10 bg-zinc-50 border border-zinc-100 rounded-lg flex items-center justify-center mb-6">
                <Database size={20} className="text-zinc-700" />
              </div>
              <h3 className="text-xl font-medium text-zinc-900">Vector Embeddings</h3>
              <p className="mt-2 text-zinc-500 text-sm leading-relaxed">
                Search by intent, not keyword. "Where is auth handled?" maps to `AuthService.ts`.
              </p>
            </div>
            <div className="flex items-center gap-2 mt-4">
               <span className="px-2 py-1 bg-blue-50 text-blue-600 text-xs font-mono rounded border border-blue-100">768 dim</span>
               <span className="px-2 py-1 bg-zinc-100 text-zinc-600 text-xs font-mono rounded border border-zinc-200">Cosine Sim</span>
            </div>
          </div>
        </div>

        {/* Card 3: Privacy */}
        <div className="md:col-span-1 bg-white rounded-xl border border-zinc-200 p-8 relative overflow-hidden">
           <div className="relative z-10 h-full flex flex-col justify-between">
            <div>
              <div className="w-10 h-10 bg-zinc-50 border border-zinc-100 rounded-lg flex items-center justify-center mb-6">
                <Shield size={20} className="text-zinc-700" />
              </div>
              <h3 className="text-xl font-medium text-zinc-900">Privacy Shield</h3>
              <p className="mt-2 text-zinc-500 text-sm leading-relaxed">
                Ephemeral indexing. Your code is processed in memory and never used to train our base models.
              </p>
            </div>
          </div>
        </div>

        {/* Card 4: Live Sync */}
        <div className="md:col-span-2 bg-zinc-900 rounded-xl border border-zinc-800 p-8 relative overflow-hidden">
           <div className="relative z-10 h-full flex flex-col justify-between">
            <div>
               <div className="w-10 h-10 bg-zinc-800 border border-zinc-700 rounded-lg flex items-center justify-center mb-6">
                <Zap size={20} className="text-white" />
              </div>
              <h3 className="text-xl font-medium text-white">Real-time Re-indexing</h3>
              <p className="mt-2 text-zinc-400 text-sm leading-relaxed max-w-md">
                Push a commit, and your RAG stays perfectly in sync via webhooks. No stale documentation.
              </p>
            </div>
            <div className="mt-8 flex items-center gap-4">
              <div className="flex items-center gap-2 text-xs font-mono text-emerald-400 bg-emerald-400/10 px-3 py-1 rounded-full border border-emerald-400/20">
                <GitBranch size={12} />
                git push origin main
              </div>
              <ArrowRight size={14} className="text-zinc-600" />
              <div className="flex items-center gap-2 text-xs font-mono text-zinc-300">
                <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></span>
                Index Updated (42ms)
              </div>
            </div>
          </div>
        </div>

      </div>
    </Container>
  </section>
);
export default BentoGrid;