'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import Link from 'next/link';
import { ArrowRight, Check } from 'lucide-react';

const SPRING_ENTER = {
    type: 'spring',
    stiffness: 280,
    damping: 30,
    mass: 1,
} as const;

export default function CTA() {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: '-100px' });

    return (
        <section className="relative py-32 px-6 overflow-hidden">
            <div ref={ref} className="mx-auto max-w-4xl relative">
                <motion.div
                    initial={{ opacity: 0, y: 40, scale: 0.95 }}
                    animate={
                        isInView
                            ? { opacity: 1, y: 0, scale: 1 }
                            : { opacity: 0, y: 40, scale: 0.95 }
                    }
                    transition={{ ...SPRING_ENTER }}
                    className="relative rounded-[48px] bg-gradient-to-br from-neutral-900 via-neutral-800 to-neutral-900 p-12 sm:p-16 overflow-hidden shadow-2xl"
                >
                    {/* Noise texture */}
                    <div
                        className="absolute inset-0 opacity-[0.03]"
                        style={{
                            backgroundImage:
                                "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E\")",
                        }}
                    />

                    {/* Gradient orbs */}
                    <div className="absolute top-0 left-0 h-64 w-64 rounded-full bg-blue-500/20 blur-3xl" />
                    <div className="absolute bottom-0 right-0 h-64 w-64 rounded-full bg-violet-500/20 blur-3xl" />
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-48 w-48 rounded-full bg-emerald-500/10 blur-3xl" />

                    {/* Grid pattern */}
                    <div
                        className="absolute inset-0 opacity-10"
                        style={{
                            backgroundImage:
                                'linear-gradient(rgba(255,255,255,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.05) 1px, transparent 1px)',
                            backgroundSize: '32px 32px',
                        }}
                    />

                    {/* Content */}
                    <div className="relative text-center">
                        <motion.h2
                            initial={{ opacity: 0, y: 20 }}
                            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                            transition={{ ...SPRING_ENTER, delay: 0.1 }}
                            className="text-4xl sm:text-5xl lg:text-6xl font-normal tracking-tighter text-white leading-[1.1] font-display"
                        >
                            Ready to impress
                            <br />
                            <span className="italic">your clients?</span>
                        </motion.h2>

                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                            transition={{ ...SPRING_ENTER, delay: 0.2 }}
                            className="mt-6 text-lg text-neutral-400 max-w-md mx-auto"
                        >
                            Start sharing beautiful project portals today. Free during beta —
                            no credit card required.
                        </motion.p>

                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                            transition={{ ...SPRING_ENTER, delay: 0.3 }}
                            className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4"
                        >
                            <Link
                                href="/login"
                                className="group relative inline-flex items-center justify-center gap-2 rounded-full bg-white px-8 py-4 text-base font-semibold text-neutral-900 shadow-lg transition-all duration-300 hover:shadow-xl hover:scale-[1.02] active:scale-[0.98]"
                            >
                                <span>Get Started Free</span>
                                <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" strokeWidth={2.5} />
                            </Link>

                            <Link
                                href="mailto:hey@giglink.io"
                                className="inline-flex items-center justify-center gap-2 rounded-full border border-white/20 px-8 py-4 text-base font-semibold text-white transition-all duration-300 hover:bg-white/10 hover:border-white/30 hover:scale-[1.02] active:scale-[0.98]"
                            >
                                <span>Contact Sales</span>
                            </Link>
                        </motion.div>

                        {/* Features list */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={isInView ? { opacity: 1 } : { opacity: 0 }}
                            transition={{ ...SPRING_ENTER, delay: 0.5 }}
                            className="mt-12 flex flex-wrap items-center justify-center gap-6 text-sm text-neutral-500"
                        >
                            {['No credit card', 'Free during beta', 'Cancel anytime'].map(
                                (item) => (
                                    <div key={item} className="flex items-center gap-2">
                                        <Check className="h-4 w-4 text-emerald-500" strokeWidth={3} />
                                        <span>{item}</span>
                                    </div>
                                )
                            )}
                        </motion.div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
