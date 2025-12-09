"use client";

import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import SocialProof from '../components/SocialProof';
import BentoGrid from '../components/BentoGrid';
import Pricing from '../components/Pricing';
import Footer from '../components/Footer';










export default function Home() {
  return (
    <div className="min-h-screen bg-zinc-50 font-sans text-zinc-900 selection:bg-zinc-200 selection:text-zinc-900">
      <Navbar />
      <Hero />
      <SocialProof />
      <BentoGrid />
      <Pricing />
      <Footer />
    </div>
  );
}