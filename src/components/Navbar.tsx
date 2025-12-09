"use client";
import Container from "./Container";
import { Terminal } from "lucide-react";
import Link from "next/link";
const Navbar = () => (
  <nav className="fixed top-0 w-full z-50 bg-white/80 backdrop-blur-md border-b border-zinc-100">
    <Container className="h-16 flex items-center justify-between">
      <div className="flex items-center gap-2">
        <div className="w-8 h-8 bg-zinc-900 rounded-md flex items-center justify-center text-white">
          <Terminal size={16} />
        </div>
        <span className="font-mono font-semibold tracking-tight text-zinc-900">RepoSage</span>
      </div>
      
      <div className="hidden md:flex items-center gap-8 text-sm font-medium text-zinc-500">
        <a href="#features" className="hover:text-zinc-900 transition-colors">Features</a>
        <a href="#engine" className="hover:text-zinc-900 transition-colors">Engine</a>
        <a href="#pricing" className="hover:text-zinc-900 transition-colors">Pricing</a>
      </div>

      <div className="flex items-center gap-4">
        <Link href="/sign-in" className="text-sm font-medium text-zinc-500 hover:text-zinc-900 transition-colors">
          Sign in
        </Link>
        <Link href="/sign-up">
          <button className="bg-zinc-900 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-zinc-800 transition-all border border-transparent hover:border-zinc-700 shadow-sm">
            Get Started
          </button>
        </Link>
      </div>
    </Container>
  </nav>
);
export default Navbar;