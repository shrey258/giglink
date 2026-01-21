'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';

const SPRING_ENTER = {
    type: 'spring',
    stiffness: 280,
    damping: 30,
    mass: 1,
} as const;

const features = [
    {
        title: 'Beautiful Portals',
        description:
            'Create stunning client portals that showcase your work with premium aesthetics. First impressions matter.',
        icon: (
            <svg
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
            >
                <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z"
                />
            </svg>
        ),
        gradient: 'from-blue-500 to-violet-500',
        delay: 0,
    },
    {
        title: 'Smart Organization',
        description:
            'Categorize links automatically. Figma, GitHub, Drive, Invoices — each gets its own beautiful treatment.',
        icon: (
            <svg
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
            >
                <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
                />
            </svg>
        ),
        gradient: 'from-emerald-500 to-cyan-500',
        delay: 0.1,
    },
    {
        title: 'One-Click Sharing',
        description:
            'Generate unique magic links for each project. Share once, update anytime. No more email chains.',
        icon: (
            <svg
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
            >
                <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z"
                />
            </svg>
        ),
        gradient: 'from-pink-500 to-rose-500',
        delay: 0.2,
    },
    {
        title: 'Fluid Animations',
        description:
            'Every interaction feels premium. Hardware-accelerated, spring-physics animations that delight.',
        icon: (
            <svg
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
            >
                <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"
                />
                <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
            </svg>
        ),
        gradient: 'from-amber-500 to-orange-500',
        delay: 0.3,
    },
    {
        title: 'Safe Deletions',
        description:
            'Two-tap deletion prevents accidents. No disruptive dialogs, just smooth confirmation flows.',
        icon: (
            <svg
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
            >
                <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                />
            </svg>
        ),
        gradient: 'from-violet-500 to-purple-500',
        delay: 0.4,
    },
    {
        title: 'Lightning Fast',
        description:
            'Built on Next.js 15 with server actions. Zero loading spinners, instant interactions.',
        icon: (
            <svg
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
            >
                <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M13 10V3L4 14h7v7l9-11h-7z"
                />
            </svg>
        ),
        gradient: 'from-cyan-500 to-blue-500',
        delay: 0.5,
    },
];

function FeatureCard({
    feature,
    index,
}: {
    feature: (typeof features)[0];
    index: number;
}) {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: '-50px' });

    return (
        <motion.div
            ref={ref}
            initial={{ opacity: 0, y: 40 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
            transition={{ ...SPRING_ENTER, delay: feature.delay }}
            className="group relative rounded-[32px] border border-neutral-200/60 bg-white/60 backdrop-blur-sm p-8 shadow-sm transition-all duration-500 hover:shadow-premium hover:bg-white/80 hover:border-neutral-200"
        >
            {/* Gradient hover glow */}
            <div
                className={`absolute inset-0 -z-10 rounded-[32px] bg-gradient-to-br ${feature.gradient} opacity-0 blur-2xl transition-opacity duration-500 group-hover:opacity-10`}
            />

            {/* Icon */}
            <div
                className={`mb-6 inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br ${feature.gradient} text-white shadow-lg shadow-${feature.gradient.split('-')[1]}-500/25 transition-transform duration-300 group-hover:scale-110`}
            >
                {feature.icon}
            </div>

            {/* Content */}
            <h3 className="mb-3 text-xl font-bold tracking-tight text-neutral-900">
                {feature.title}
            </h3>
            <p className="text-base text-neutral-500 leading-relaxed">
                {feature.description}
            </p>
        </motion.div>
    );
}

export default function Features() {
    const headerRef = useRef(null);
    const isHeaderInView = useInView(headerRef, { once: true, margin: '-100px' });

    return (
        <section id="features" className="relative py-32 px-6">
            {/* Background pattern fade */}
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-neutral-50/50 to-transparent pointer-events-none" />

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
                        <span className="inline-flex items-center rounded-full border border-blue-200 bg-blue-50 px-4 py-1.5 text-sm font-semibold text-blue-600">
                            Features
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
                        Everything you need
                        <br />
                        <span className="text-neutral-400">to impress clients</span>
                    </motion.h2>
                </div>

                {/* Features Grid */}
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                    {features.map((feature, index) => (
                        <FeatureCard key={feature.title} feature={feature} index={index} />
                    ))}
                </div>
            </div>
        </section>
    );
}
