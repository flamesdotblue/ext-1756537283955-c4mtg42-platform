import React from 'react';
import { motion } from 'framer-motion';

const phrases = [
  'cleanse your cache',
  'hydrate your aura',
  'back up your feelings',
  'ask your emails for consent',
  'debug your destiny',
  'speak kindly to your browser tabs',
  'update your boundaries',
  'perform a soft reboot of your soul',
  'charge your crystals and your phone',
  'reinstall karma v2.0',
];

export default function CosmicTicker() {
  return (
    <div className="relative overflow-hidden py-6 bg-gradient-to-b from-black to-[#070714]">
      <div className="absolute inset-0 pointer-events-none opacity-40 bg-[radial-gradient(800px_200px_at_10%_0%,rgba(56,189,248,0.15),transparent),radial-gradient(600px_200px_at_90%_100%,rgba(217,70,239,0.12),transparent)]" />
      <div className="relative">
        <Marquee>
          {phrases.map((p, i) => (
            <Chip key={i} label={p} />
          ))}
        </Marquee>
        <Marquee reverse delay={5}>
          {phrases.slice().reverse().map((p, i) => (
            <Chip key={`r-${i}`} label={p} />
          ))}
        </Marquee>
      </div>
    </div>
  );
}

function Chip({ label }) {
  return (
    <div className="mx-3 my-2 whitespace-nowrap rounded-full border border-white/15 bg-white/5 px-4 py-2 text-sm text-white/90 shadow-[0_0_20px_rgba(99,102,241,0.15)]">
      ✦ {label}
    </div>
  );
}

function Marquee({ children, reverse = false, delay = 0 }) {
  return (
    <div className="flex overflow-hidden py-1">
      <motion.div
        initial={{ x: reverse ? '-50%' : '0%' }}
        animate={{ x: reverse ? '0%' : '-50%' }}
        transition={{ duration: 20, ease: 'linear', repeat: Infinity, delay }}
        className="flex min-w-[200%]"
      >
        <div className="flex">{children}</div>
        <div className="flex">{children}</div>
      </motion.div>
    </div>
  );
}
