import React from 'react';
import HeroSplineCover from './components/HeroSplineCover';
import RetrogradeAnswer from './components/RetrogradeAnswer';
import CosmicTicker from './components/CosmicTicker';
import Starfield from './components/Starfield';

export default function App() {
  return (
    <div className="min-h-screen bg-black text-white font-inter overflow-x-hidden">
      <section className="relative w-full h-screen">
        <HeroSplineCover />
      </section>

      <section className="relative w-full py-24 md:py-32 overflow-hidden">
        <Starfield />
        <div className="relative container mx-auto px-6 max-w-5xl">
          <RetrogradeAnswer />
        </div>
      </section>

      <section className="relative border-t border-white/10">
        <CosmicTicker />
      </section>

      <footer className="py-10 text-center text-sm text-white/60">
        Copyright © {new Date().getFullYear()} Cosmic Customer Support. No refunds for karmic lessons.
      </footer>
    </div>
  );
}
