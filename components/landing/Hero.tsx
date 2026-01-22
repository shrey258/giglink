'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';

const SPRING_ENTER = {
    type: 'spring',
    stiffness: 280,
    damping: 30,
    mass: 1,
} as const;

export default function Hero() {
    return (
        <section className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden px-6 pt-20 pb-32">
            {/* Animated gradient orbs */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 1.2, ease: [0.19, 1, 0.22, 1] }}
                    className="absolute top-[10%] left-[15%] h-[500px] w-[500px] rounded-full bg-gradient-to-br from-blue-400/20 via-violet-400/15 to-transparent blur-3xl animate-float"
                />
                <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 1.2, delay: 0.2, ease: [0.19, 1, 0.22, 1] }}
                    className="absolute bottom-[10%] right-[10%] h-[400px] w-[400px] rounded-full bg-gradient-to-br from-emerald-400/15 via-cyan-400/10 to-transparent blur-3xl animate-float-reverse"
                />
                <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 1.2, delay: 0.4, ease: [0.19, 1, 0.22, 1] }}
                    className="absolute top-[40%] right-[30%] h-[300px] w-[300px] rounded-full bg-gradient-to-br from-pink-400/10 via-rose-400/5 to-transparent blur-3xl animate-breathe"
                />
            </div>

            {/* Badge */}
            <motion.div
                initial={{ opacity: 0, y: 20, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ ...SPRING_ENTER, delay: 0.1 }}
                className="mb-8"
            >
                <span className="inline-flex items-center gap-2 rounded-full border border-neutral-200/60 bg-white/60 backdrop-blur-md px-4 py-2 text-sm font-medium text-neutral-600 shadow-sm">
                    <span className="flex h-2 w-2">
                        <span className="absolute inline-flex h-2 w-2 animate-ping rounded-full bg-emerald-400 opacity-75" />
                        <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
                    </span>
                    Now in Public Beta
                </span>
            </motion.div>

            {/* Heading */}
            <motion.h1
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ ...SPRING_ENTER, delay: 0.2 }}
                className="text-center text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-normal tracking-tighter text-neutral-900 leading-[0.9] font-display overflow-visible"
            >
                Client portals
                <br />
                <span className="bg-gradient-to-r from-blue-600 via-violet-600 to-purple-600 bg-clip-text text-transparent italic pr-[0.1em]">
                    without the friction
                </span>
                <span className="text-blue-600">.</span>
            </motion.h1>

            {/* Subheading */}
            <motion.p
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ ...SPRING_ENTER, delay: 0.35 }}
                className="mt-8 max-w-xl text-center text-lg sm:text-xl text-neutral-500 leading-relaxed"
            >
                Share project deliverables with clients through beautiful, organized
                portals. Stop chasing emails. Start impressing clients.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ ...SPRING_ENTER, delay: 0.5 }}
                className="mt-12 flex flex-col sm:flex-row items-center gap-4"
            >
                <Link
                    href="/login"
                    className="group relative inline-flex items-center justify-center gap-2 rounded-full bg-neutral-900 px-8 py-4 text-base font-semibold text-white shadow-lg shadow-neutral-900/25 transition-all duration-300 hover:shadow-xl hover:shadow-neutral-900/30 hover:scale-[1.02] active:scale-[0.98]"
                >
                    <span>Get Started Free</span>
                    <motion.svg
                        className="h-4 w-4"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={2.5}
                        animate={{ x: [0, 4, 0] }}
                        transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"
                        />
                    </motion.svg>
                    {/* Glow effect */}
                    <div className="absolute inset-0 -z-10 rounded-full bg-gradient-to-r from-blue-600 via-violet-600 to-purple-600 opacity-0 blur-xl transition-opacity duration-300 group-hover:opacity-40" />
                </Link>

                <Link
                    href="#features"
                    className="inline-flex items-center justify-center gap-2 rounded-full border border-neutral-200 bg-white/60 backdrop-blur-sm px-8 py-4 text-base font-semibold text-neutral-700 shadow-sm transition-all duration-300 hover:bg-white hover:border-neutral-300 hover:shadow-md hover:scale-[1.02] active:scale-[0.98]"
                >
                    <span>See How It Works</span>
                </Link>
            </motion.div>

            {/* Social Proof */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ ...SPRING_ENTER, delay: 0.7 }}
                className="mt-20 flex flex-col items-center gap-4"
            >
                <div className="flex -space-x-3">
                    {[
                        'bg-gradient-to-br from-blue-400 to-blue-600',
                        'bg-gradient-to-br from-emerald-400 to-emerald-600',
                        'bg-gradient-to-br from-violet-400 to-violet-600',
                        'bg-gradient-to-br from-amber-400 to-amber-600',
                        'bg-gradient-to-br from-pink-400 to-pink-600',
                    ].map((gradient, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, scale: 0.5, x: -10 }}
                            animate={{ opacity: 1, scale: 1, x: 0 }}
                            transition={{ delay: 0.8 + i * 0.1, ...SPRING_ENTER }}
                            className={`flex h-10 w-10 items-center justify-center rounded-full ${gradient} border-2 border-white shadow-md text-white text-sm font-bold`}
                        >
                            {String.fromCharCode(65 + i)}
                        </motion.div>
                    ))}
                </div>
                <p className="text-sm text-neutral-500">
                    <span className="font-semibold text-neutral-700">500+</span>{' '}
                    freelancers already love GigLink
                </p>
            </motion.div>
        </section>
    );
}
