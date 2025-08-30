import React, { useEffect, useMemo, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

function formatDateLabel(raw) {
  if (!raw) return null;
  const d = new Date(raw);
  if (isNaN(d)) return raw;
  return d.toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: 'numeric' });
}

function useMercuryRetrograde() {
  const [data, setData] = useState({ loading: true, error: null, retrograde: null, meta: null });

  useEffect(() => {
    const controller = new AbortController();
    const today = new Date();
    const yyyy = today.getFullYear();
    const mm = String(today.getMonth() + 1).padStart(2, '0');
    const dd = String(today.getDate()).padStart(2, '0');
    const dateParam = `${yyyy}-${mm}-${dd}`;

    async function fetchStatus() {
      try {
        const resp = await fetch(`https://mercuryretrogradeapi.com?date=${dateParam}`, {
          signal: controller.signal,
          headers: { 'Accept': 'application/json' },
        });
        const json = await resp.json();
        const isRet = typeof json.is_retrograde === 'boolean' ? json.is_retrograde : (typeof json.retrograde === 'boolean' ? json.retrograde : null);
        setData({
          loading: false,
          error: null,
          retrograde: isRet,
          meta: {
            sign: json.sign || null,
            date: json.date || dateParam,
            starts: json.retrograde?.starts || json.date_previous || null,
            ends: json.retrograde?.ends || json.date_next || null,
          },
        });
      } catch (e) {
        setData({ loading: false, error: e?.message || 'Unknown error', retrograde: null, meta: null });
      }
    }

    fetchStatus();
    return () => controller.abort();
  }, []);

  return data;
}

function GlimmerDivider() {
  return (
    <div className="relative my-10">
      <div className="absolute inset-0 blur-xl bg-gradient-to-r from-fuchsia-600/20 via-cyan-500/20 to-indigo-500/20" />
      <div className="relative h-px w-full bg-gradient-to-r from-transparent via-white/30 to-transparent" />
    </div>
  );
}

export default function RetrogradeAnswer() {
  const { loading, error, retrograde, meta } = useMercuryRetrograde();

  const vibe = useMemo(() => {
    if (loading) return { title: 'Consulting the cosmos…', sub: 'Buffering your destiny. Please do not close your third eye.', color: 'from-cyan-300 via-fuchsia-300 to-indigo-300' };
    if (error) return { title: 'The stars ghosted us.', sub: 'Our divination API is having an existential moment. Try again soon.', color: 'from-yellow-300 via-rose-300 to-orange-300' };
    if (retrograde) return { title: 'YES', sub: 'Hide your texts, back up your vibes, and don’t sign anything unless it’s a crystal delivery.', color: 'from-fuchsia-400 via-cyan-300 to-indigo-400' };
    return { title: 'NO', sub: 'Mercury is behaving… suspiciously well. Celebrate by sending one (1) risk-free email.', color: 'from-emerald-300 via-teal-300 to-sky-300' };
  }, [loading, error, retrograde]);

  return (
    <div className="relative">
      <div className="absolute -inset-x-10 -top-10 -bottom-10 opacity-50 pointer-events-none">
        <div className="animate-pulse blur-3xl h-full w-full bg-[radial-gradient(ellipse_at_top,rgba(217,70,239,0.15),transparent_60%),radial-gradient(ellipse_at_bottom,rgba(56,189,248,0.15),transparent_60%)]" />
      </div>

      <div className="relative backdrop-blur-sm bg-white/5 border border-white/10 rounded-3xl p-8 md:p-12 shadow-[0_0_60px_rgba(99,102,241,0.15)]">
        <AnimatePresence mode="popLayout">
          <motion.h2
            key={vibe.title}
            initial={{ opacity: 0, scale: 0.9, rotate: -2 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            exit={{ opacity: 0, scale: 0.9, rotate: 2 }}
            transition={{ type: 'spring', stiffness: 120, damping: 12 }}
            className="text-center text-6xl md:text-8xl font-extrabold tracking-tighter"
          >
            <span className={`bg-gradient-to-br ${vibe.color} bg-clip-text text-transparent drop-shadow-[0_0_30px_rgba(255,255,255,0.15)]`}>
              {vibe.title}
            </span>
          </motion.h2>
        </AnimatePresence>

        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mt-6 text-center text-lg md:text-xl text-white/85"
        >
          {vibe.sub}
        </motion.p>

        <GlimmerDivider />

        <div className="grid md:grid-cols-3 gap-6">
          <InfoCard label="Today" value={meta?.date ? formatDateLabel(meta.date) : 'Now-ish'} note={meta?.sign ? `Mercury in ${meta.sign}` : 'Mercury is somewhere shiny'} loading={loading} />
          <InfoCard label={retrograde ? 'Began' : 'Next starts'} value={formatDateLabel(retrograde ? meta?.starts : meta?.starts)} note={retrograde ? 'You felt it, admit it.' : 'Brace your inbox.'} loading={loading} />
          <InfoCard label={retrograde ? 'Ends' : 'Last ended'} value={formatDateLabel(retrograde ? meta?.ends : meta?.ends)} note={retrograde ? 'Release the chaos.' : 'We survived… barely.'} loading={loading} />
        </div>

        {loading && (
          <div className="mt-10 flex justify-center">
            <CosmicSpinner />
          </div>
        )}

        {error && (
          <div className="mt-8 text-center text-sm text-rose-200/80">
            Error: {String(error)}
          </div>
        )}
      </div>
    </div>
  );
}

function InfoCard({ label, value, note, loading }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="relative overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-br from-white/5 to-white/0 p-5"
    >
      <div className="absolute inset-0 opacity-40 pointer-events-none bg-[radial-gradient(150px_80px_at_10%_0%,rgba(244,114,182,0.15),transparent_60%)]" />
      <div className="text-xs uppercase tracking-wider text-white/60">{label}</div>
      <div className="mt-1 text-2xl font-semibold">{loading ? '•••' : value || 'Unknown'}</div>
      <div className="mt-2 text-xs text-white/60">{note}</div>
    </motion.div>
  );
}

function CosmicSpinner() {
  return (
    <motion.div
      initial={{ rotate: 0 }}
      animate={{ rotate: 360 }}
      transition={{ repeat: Infinity, duration: 3, ease: 'linear' }}
      className="h-14 w-14 rounded-full border-2 border-cyan-300/50 border-t-fuchsia-300/80 shadow-[0_0_30px_rgba(56,189,248,0.35)]"
    />
  );
}
