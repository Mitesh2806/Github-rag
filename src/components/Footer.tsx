'use client';
import Container from "./Container";
import { Terminal, ChevronRight, Heart, Github } from "lucide-react";
import Link from "next/link";



const Footer = () => (
  <footer className="bg-zinc-950 text-white pt-24 pb-12 border-t border-zinc-900">
    <Container className="grid grid-cols-1 md:grid-cols-4 gap-12">
      <div className="col-span-1 md:col-span-2">
        <div className="flex items-center gap-2 mb-6">
          <div className="w-6 h-6 bg-white rounded flex items-center justify-center text-zinc-900">
            <Terminal size={12} />
          </div>
          <span className="font-mono font-semibold tracking-tight">RepoSage</span>
        </div>
        <p className="text-zinc-500 text-sm max-w-sm mb-8">
          The semantic infrastructure for the AI-native developer. 
          Built for precision, engineered for scale.
        </p>
        <div className="relative max-w-md">
          <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
             <ChevronRight size={14} className="text-zinc-600" />
          </div>
          <input 
            type="text" 
            placeholder="Ready to debug faster?" 
            className="w-full bg-zinc-900 border border-zinc-800 text-zinc-300 text-sm rounded-md py-2 pl-8 pr-4 focus:outline-none focus:border-zinc-700 font-mono"
          />
          <div className="absolute inset-y-0 right-3 flex items-center">
            <span className="w-1.5 h-4 bg-zinc-600 animate-pulse"></span>
          </div>
        </div>
      </div>
      
      <div>
        <h4 className="text-sm font-semibold text-zinc-100 mb-4">Product</h4>
        <ul className="space-y-2 text-sm text-zinc-500">
          <li><a href="#" className="hover:text-white transition-colors">Changelog</a></li>
          <li><a href="#" className="hover:text-white transition-colors">Documentation</a></li>
          <li><a href="#" className="hover:text-white transition-colors">Integration</a></li>
          <li><a href="#" className="hover:text-white transition-colors">Security</a></li>
        </ul>
      </div>

      <div>
        <h4 className="text-sm font-semibold text-zinc-100 mb-4">Legal</h4>
        <ul className="space-y-2 text-sm text-zinc-500">
          <li><a href="#" className="hover:text-white transition-colors">Privacy</a></li>
          <li><a href="#" className="hover:text-white transition-colors">Terms</a></li>
          <li><a href="#" className="hover:text-white transition-colors">DPA</a></li>
        </ul>
      </div>
    </Container>
    
    <Container className="mt-24 pt-8 border-t border-zinc-900 text-zinc-600 text-xs font-mono flex flex-col md:flex-row justify-between items-center gap-4">
      {/* Footer Attribution */}
      <span className="flex items-center gap-1.5">
        Made with <Heart className="w-3 h-3 text-red-500 fill-red-500" /> by 
        <Link 
          href="https://github.com/Mitesh2806" 
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-1 hover:text-zinc-300 transition-colors"
        >
          <Github className="w-3 h-3" />
          Mitesh2806
        </Link>
      </span>
      
      <span className="flex items-center gap-2">
        <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
        All Systems Operational
      </span>
    </Container>
  </footer>
);
export default Footer;