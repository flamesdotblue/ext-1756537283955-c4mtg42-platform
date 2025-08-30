import React from 'react';
import Spline from '@splinetool/react-spline';
import { motion } from 'framer-motion';

export default function HeroSplineCover() {
  return (
    <div className="relative w-full h-full">
      <div className="absolute inset-0">
        <Spline scene="https://prod.spline.design/7m4PRZ7kg6K1jPfF/scene.splinecode" style={{ width: '100%', height: '100%' }} />
      </div>

      <div className="absolute inset-0 pointer-events-none bg-gradient-to-b from-black/40 via-black/10 to-black" />

      <div className="relative z-10 h-full flex flex-col items-center justify-center text-center px-6">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, ease: 'easeOut' }}
          className="text-4xl md:text-6xl lg:text-7xl font-black tracking-tight"
        >
          <span className="bg-gradient-to-br from-fuchsia-300 via-cyan-200 to-indigo-300 bg-clip-text text-transparent drop-shadow-[0_0_25px_rgba(99,102,241,0.25)]">
            Is Mercury in retrograde?
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 1 }}
          className="mt-5 max-w-2xl text-base md:text-lg text-white/80"
        >
          Shuffle your crystals, center your Wi‑Fi, and seek answers from the great algorithm in the sky.
        </motion.p>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 1.2, repeat: Infinity, repeatType: 'reverse' }}
          className="mt-10 text-white/70 text-xs md:text-sm"
        >
          scroll for revelations ↓
        </motion.div>
      </div>
    </div>
  );
}
