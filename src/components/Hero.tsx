'use client';
import { useEffect, useState } from "react";
import Container from "./Container";
import { Command, Check } from "lucide-react";
import { motion } from "framer-motion";

const Hero = () => {
  const [typedText, setTypedText] = useState('');
  const fullText = "https://github.com/vercel/next.js";

  useEffect(() => {
    if (typedText.length < fullText.length) {
      const timeout = setTimeout(() => {
        setTypedText(fullText.slice(0, typedText.length + 1));
      }, 50);
      return () => clearTimeout(timeout);
    }
  }, [typedText]);

  return (
    <section className="pt-32 pb-24 relative overflow-hidden">
      <Container>
        {/* Background Grid Texture */}
        <div className="absolute inset-0 -z-10 opacity-[0.03]" 
             style={{ backgroundImage: 'radial-gradient(#000 1px, transparent 1px)', backgroundSize: '24px 24px' }}>
        </div>

        <div className="text-center max-w-3xl mx-auto mb-16 space-y-6">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-zinc-100 border border-zinc-200 text-xs font-medium text-zinc-600 mb-4"
          >
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
            v1.0 is now live
          </motion.div>
          
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-5xl md:text-7xl font-semibold tracking-tight text-zinc-900"
          >
            Talk to your <br/>
            <span className="text-zinc-400">codebase.</span>
          </motion.h1>

          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-lg md:text-xl text-zinc-500 max-w-xl mx-auto leading-relaxed"
          >
            Instant RAG pipelines for any GitHub repository. 
            Analyze logic, trace dependencies, and debug across the entire stack.
          </motion.p>
        </div>

        {/* The "Terminal" Input - Visual Demo */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="max-w-2xl mx-auto relative group"
        >
          <div className="absolute -inset-1 bg-gradient-to-r from-zinc-200 via-zinc-400 to-zinc-200 rounded-lg blur opacity-25 group-hover:opacity-50 transition duration-1000"></div>
          <div className="relative bg-white border border-zinc-200 rounded-lg shadow-sm p-2 flex items-center gap-3">
            <div className="pl-4 text-zinc-400">
              <Command size={18} />
            </div>
            <div className="flex-1 font-mono text-sm text-zinc-800 h-6 flex items-center overflow-hidden">
              <span className="mr-2 text-zinc-400">$</span>
              <span className="truncate">analyze {typedText}</span>
              <span className="w-2 h-4 bg-zinc-900 ml-1 animate-pulse shrink-0"></span>
            </div>
            <button className="bg-zinc-900 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-zinc-800 transition-colors whitespace-nowrap">
              Index Repo
            </button>
          </div>
          <div className="mt-3 flex flex-wrap justify-center gap-x-6 gap-y-2 text-xs text-zinc-400 font-mono">
            <span className="flex items-center gap-1"><Check size={12} /> Local-first indexing</span>
            <span className="flex items-center gap-1"><Check size={12} /> AST Parsing</span>
            <span className="flex items-center gap-1"><Check size={12} /> SOC2 Compliant</span>
          </div>
        </motion.div>
      </Container>
    </section>
  );
};
export default Hero;