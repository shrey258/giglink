'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';

const SPRING_ENTER = {
    type: 'spring',
    stiffness: 280,
    damping: 30,
    mass: 1,
} as const;

const steps = [
    {
        number: '01',
        title: 'Create a Project',
        description:
            'Name your project and client. GigLink generates a unique magic link automatically.',
        illustration: (
            <div className="relative h-full w-full overflow-hidden rounded-3xl bg-gradient-to-br from-neutral-900 to-neutral-800 p-6">
                {/* Noise overlay */}
                <div
                    className="absolute inset-0 opacity-[0.03]"
                    style={{
                        backgroundImage:
                            "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E\")",
                    }}
                />
                {/* Mock UI */}
                <div className="relative space-y-4">
                    <div className="h-10 w-32 rounded-xl bg-white/10 animate-pulse" />
                    <div className="h-12 w-full rounded-xl bg-white/5 border border-white/10" />
                    <div className="h-12 w-full rounded-xl bg-white/5 border border-white/10" />
                    <motion.div
                        animate={{ scale: [1, 1.02, 1] }}
                        transition={{ duration: 2, repeat: Infinity }}
                        className="h-12 w-full rounded-xl bg-gradient-to-r from-blue-500 to-violet-500 flex items-center justify-center text-white font-semibold text-sm"
                    >
                        Create Project
                    </motion.div>
                </div>
            </div>
        ),
    },
    {
        number: '02',
        title: 'Add Your Links',
        description:
            'Drop in Figma files, GitHub repos, Drive folders, videos, invoices — anything you need to share.',
        illustration: (
            <div className="relative h-full w-full overflow-hidden rounded-3xl bg-gradient-to-br from-slate-100 to-slate-50 p-6">
                {/* Link cards */}
                <div className="relative space-y-3">
                    {[
                        { name: 'Brand Guidelines.fig', color: 'from-[#F24E1E] to-[#A259FF]' },
                        { name: 'Source Code', color: 'from-neutral-800 to-neutral-700' },
                        { name: 'Assets Folder', color: 'from-blue-500 to-cyan-500' },
                    ].map((item, i) => (
                        <motion.div
                            key={item.name}
                            initial={{ x: 40, opacity: 0 }}
                            animate={{ x: 0, opacity: 1 }}
                            transition={{ delay: 0.5 + i * 0.2, ...SPRING_ENTER }}
                            className="flex items-center gap-3 rounded-2xl bg-white p-4 shadow-lg border border-neutral-200/60"
                        >
                            <div
                                className={`h-10 w-10 rounded-xl bg-gradient-to-br ${item.color}`}
                            />
                            <span className="text-sm font-medium text-neutral-700">
                                {item.name}
                            </span>
                        </motion.div>
                    ))}
                    <motion.div
                        animate={{ scale: [1, 1.05, 1], rotate: [0, 2, 0] }}
                        transition={{ duration: 3, repeat: Infinity }}
                        className="flex items-center justify-center h-16 rounded-2xl border-2 border-dashed border-neutral-300 text-neutral-400"
                    >
                        <svg
                            className="h-6 w-6 mr-2"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M12 4v16m8-8H4"
                            />
                        </svg>
                        Add link
                    </motion.div>
                </div>
            </div>
        ),
    },
    {
        number: '03',
        title: 'Share & Impress',
        description:
            'Send your magic link to clients. They see a beautiful portal. You look professional.',
        illustration: (
            <div className="relative h-full w-full overflow-hidden rounded-3xl bg-gradient-to-br from-emerald-50 to-cyan-50 p-6">
                {/* Success state */}
                <div className="relative flex flex-col items-center justify-center h-full space-y-4">
                    <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ delay: 0.3, type: 'spring', stiffness: 400, damping: 15 }}
                        className="flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-emerald-500 to-cyan-500 shadow-lg shadow-emerald-500/25"
                    >
                        <motion.svg
                            initial={{ pathLength: 0 }}
                            animate={{ pathLength: 1 }}
                            transition={{ delay: 0.5, duration: 0.5 }}
                            className="h-10 w-10 text-white"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            strokeWidth={3}
                        >
                            <motion.path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M5 13l4 4L19 7"
                            />
                        </motion.svg>
                    </motion.div>
                    <div className="text-center">
                        <p className="text-sm font-bold text-emerald-600">Link Copied!</p>
                        <p className="text-xs text-emerald-500/70">giglink.io/p/ace92k</p>
                    </div>
                    <motion.div
                        animate={{ y: [0, -5, 0] }}
                        transition={{ duration: 2, repeat: Infinity }}
                        className="flex items-center gap-2 rounded-full bg-white px-4 py-2 shadow-md border border-emerald-200"
                    >
                        <div className="h-6 w-6 rounded-full bg-gradient-to-br from-blue-400 to-violet-400" />
                        <span className="text-xs text-neutral-600">Client is viewing...</span>
                    </motion.div>
                </div>
            </div>
        ),
    },
];

export default function HowItWorks() {
    const headerRef = useRef(null);
    const isHeaderInView = useInView(headerRef, { once: true, margin: '-100px' });

    return (
        <section id="how-it-works" className="relative py-32 px-6 overflow-hidden">
            {/* Background gradient */}
            <div className="absolute inset-0 bg-gradient-to-b from-neutral-50/50 via-white to-neutral-50/50 pointer-events-none" />

            <div className="mx-auto max-w-6xl relative">
                {/* Section Header */}
                <div ref={headerRef} className="mb-20 text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={
                            isHeaderInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }
                        }
                        transition={{ ...SPRING_ENTER }}
                        className="mb-4"
                    >
                        <span className="inline-flex items-center rounded-full border border-emerald-200 bg-emerald-50 px-4 py-1.5 text-sm font-semibold text-emerald-600">
                            How It Works
                        </span>
                    </motion.div>
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        animate={
                            isHeaderInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }
                        }
                        transition={{ ...SPRING_ENTER, delay: 0.1 }}
                        className="text-4xl sm:text-5xl font-bold tracking-tighter text-neutral-900"
                    >
                        Three steps to
                        <br />
                        <span className="text-neutral-400">professional client delivery</span>
                    </motion.h2>
                </div>

                {/* Steps */}
                <div className="space-y-24">
                    {steps.map((step, index) => {
                        const stepRef = useRef(null);
                        const isStepInView = useInView(stepRef, { once: true, margin: '-50px' });
                        const isEven = index % 2 === 0;

                        return (
                            <motion.div
                                key={step.number}
                                ref={stepRef}
                                initial={{ opacity: 0, y: 60 }}
                                animate={isStepInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 60 }}
                                transition={{ ...SPRING_ENTER, delay: 0.1 }}
                                className={`flex flex-col lg:flex-row items-center gap-12 lg:gap-20 ${isEven ? '' : 'lg:flex-row-reverse'}`}
                            >
                                {/* Text */}
                                <div className="flex-1 text-center lg:text-left">
                                    <span className="inline-block text-7xl font-black text-neutral-100 leading-none mb-4">
                                        {step.number}
                                    </span>
                                    <h3 className="text-3xl font-bold tracking-tight text-neutral-900 mb-4">
                                        {step.title}
                                    </h3>
                                    <p className="text-lg text-neutral-500 leading-relaxed max-w-md mx-auto lg:mx-0">
                                        {step.description}
                                    </p>
                                </div>

                                {/* Illustration */}
                                <div className="flex-1 w-full max-w-md lg:max-w-none">
                                    <div className="aspect-[4/3] rounded-[40px] border border-neutral-200/60 bg-white/60 backdrop-blur-sm p-4 shadow-premium overflow-hidden">
                                        {step.illustration}
                                    </div>
                                </div>
                            </motion.div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
