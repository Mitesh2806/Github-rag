'use client';
import Container from "./Container";
import { Check } from "lucide-react";
import Link from "next/link";



const Pricing = () => (
  <section id="pricing" className="py-32 bg-zinc-50 border-t border-zinc-200">
    <Container>
      <div className="mb-16 text-center">
        <h2 className="text-3xl font-semibold tracking-tight text-zinc-900">Compute Pricing</h2>
        <p className="mt-4 text-zinc-500">Pay for the tokens you process. Not the seats you fill.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        
        {/* Free */}
        <div className="bg-white p-8 rounded-xl border border-zinc-200">
          <div className="font-mono text-sm text-zinc-500 mb-2">Hobby</div>
          <div className="text-4xl font-semibold tracking-tight text-zinc-900 mb-6">$0</div>
          <ul className="space-y-3 mb-8">
            {['Public Repositories', '100 queries / day', 'GPT-3.5 Turbo', 'Community Support'].map((item) => (
              <li key={item} className="flex items-center gap-3 text-sm text-zinc-600">
                <Check size={14} className="text-zinc-400" /> {item}
              </li>
            ))}
          </ul>
          <Link href="/sign-up">
            <button className="w-full py-2 bg-white border border-zinc-200 text-zinc-900 rounded-md text-sm font-medium hover:bg-zinc-50 transition-colors">
              Start Free
            </button>
          </Link>
        </div>

        {/* Pro */}
        <div className="bg-white p-8 rounded-xl border border-zinc-300 shadow-xl shadow-zinc-200/50 relative">
          <div className="absolute top-0 inset-x-0 h-1 bg-zinc-900 rounded-t-xl"></div>
          <div className="font-mono text-sm text-zinc-900 mb-2 font-medium">Pro</div>
          <div className="text-4xl font-semibold tracking-tight text-zinc-900 mb-6">$29<span className="text-lg text-zinc-400 font-normal">/mo</span></div>
          <ul className="space-y-3 mb-8">
            {['Private Repositories', 'Unlimited queries', 'GPT-4o Integration', 'VS Code Extension'].map((item) => (
              <li key={item} className="flex items-center gap-3 text-sm text-zinc-900 font-medium">
                <Check size={14} className="text-zinc-900" /> {item}
              </li>
            ))}
          </ul>
          <Link href="/sign-up">
            <button className="w-full py-2 bg-zinc-900 text-white rounded-md text-sm font-medium hover:bg-zinc-800 transition-colors">
              Get Pro
            </button>
          </Link>
        </div>

        {/* Enterprise */}
        <div className="bg-white p-8 rounded-xl border border-zinc-200">
          <div className="font-mono text-sm text-zinc-500 mb-2">Enterprise</div>
          <div className="text-4xl font-semibold tracking-tight text-zinc-900 mb-6">Custom</div>
          <ul className="space-y-3 mb-8">
            {['Self-Hosted Deployment', 'Fine-tuned Models', 'SSO / SAML', 'SLA Guarantee'].map((item) => (
              <li key={item} className="flex items-center gap-3 text-sm text-zinc-600">
                <Check size={14} className="text-zinc-400" /> {item}
              </li>
            ))}
          </ul>
          <button className="w-full py-2 bg-white border border-zinc-200 text-zinc-900 rounded-md text-sm font-medium hover:bg-zinc-50 transition-colors">
            Contact Sales
          </button>
        </div>

      </div>
    </Container>
  </section>
);
export default Pricing;