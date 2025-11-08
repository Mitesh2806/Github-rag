"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Code2, MessageSquare, Search, Sparkles, Github, Heart } from "lucide-react";
import { useEffect, useRef } from "react";

export default function Home() {
  const heroRef = useRef<HTMLDivElement>(null);
  const featuresRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Simple fade-in and slide-up animations
    const animateElement = (element: HTMLElement | null, delay: number) => {
      if (!element) return;
      
      element.style.opacity = "0";
      element.style.transform = "translateY(30px)";
      
      setTimeout(() => {
        element.style.transition = "opacity 0.8s ease-out, transform 0.8s ease-out";
        element.style.opacity = "1";
        element.style.transform = "translateY(0)";
      }, delay);
    };

    animateElement(heroRef.current, 100);
    animateElement(featuresRef.current, 300);
    animateElement(ctaRef.current, 500);

    // Animate feature cards individually
    const featureCards = document.querySelectorAll('.feature-card');
    featureCards.forEach((card, index) => {
      animateElement(card as HTMLElement, 400 + (index * 150));
    });
  }, []);

  return (
    <div className="min-h-screen flex flex-col relative overflow-hidden">
      {/* Animated Grid Background */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-b from-background via-background to-muted/20" />
        <div 
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage: `
              linear-gradient(to right, hsl(var(--border)) 1px, transparent 1px),
              linear-gradient(to bottom, hsl(var(--border)) 1px, transparent 1px)
            `,
            backgroundSize: '60px 60px',
            maskImage: 'radial-gradient(ellipse 80% 50% at 50% 40%, black 40%, transparent 100%)',
          }}
        />
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col items-center justify-center p-8">
        <div className="max-w-3xl w-full text-center space-y-8">
          {/* Hero Section */}
          <div ref={heroRef} className="space-y-4">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
              <Sparkles className="w-4 h-4" />
              AI-Powered Repository Analysis
            </div>
            
            <h1 className="text-5xl md:text-6xl font-bold tracking-tight">
              Understand Any Codebase
              <span className="text-primary"> Instantly</span>
            </h1>
            
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Drop in any repository and get intelligent insights. Ask questions about any file, 
              function, or concept—powered by advanced RAG technology.
            </p>
          </div>

          {/* Features */}
          <div ref={featuresRef} className="grid md:grid-cols-3 gap-6 pt-8">
            <div className="feature-card flex flex-col items-center gap-3 p-6 rounded-lg bg-card border hover:border-primary/50 transition-colors">
              <Code2 className="w-10 h-10 text-primary" />
              <h3 className="font-semibold">Full Repo Analysis</h3>
              <p className="text-sm text-muted-foreground">
                Comprehensive understanding of your entire codebase structure
              </p>
            </div>
            
            <div className="feature-card flex flex-col items-center gap-3 p-6 rounded-lg bg-card border hover:border-primary/50 transition-colors">
              <MessageSquare className="w-10 h-10 text-primary" />
              <h3 className="font-semibold">Natural Conversations</h3>
              <p className="text-sm text-muted-foreground">
                Chat naturally about code—ask anything, get clear answers
              </p>
            </div>
            
            <div className="feature-card flex flex-col items-center gap-3 p-6 rounded-lg bg-card border hover:border-primary/50 transition-colors">
              <Search className="w-10 h-10 text-primary" />
              <h3 className="font-semibold">Smart Context</h3>
              <p className="text-sm text-muted-foreground">
                RAG-powered search finds relevant code across your project
              </p>
            </div>
          </div>

          {/* CTA */}
          <div ref={ctaRef} className="flex flex-col items-center gap-6 pt-8">
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/sign-up">
                <Button size="lg" className="text-lg px-8 hover:scale-105 transition-transform">
                  Get Started
                </Button>
              </Link>
              <Link href="/sign-in">
                <Button size="lg" variant="outline" className="text-lg px-8 hover:scale-105 transition-transform">
                  Sign In
                </Button>
              </Link>
            </div>

            <p className="text-sm text-muted-foreground">
              No credit card required · Analyze public and private repositories
            </p>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="border-t bg-background/80 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col sm:flex-row items-center justify-center gap-2 text-sm text-muted-foreground">
            <span className="flex items-center gap-1">
              Made with <Heart className="w-4 h-4 text-red-500 fill-red-500" /> by
            </span>
            <Link 
              href="https://github.com/Mitesh2806" 
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 hover:text-foreground transition-colors font-medium"
            >
              <Github className="w-4 h-4" />
              Mitesh2806
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}