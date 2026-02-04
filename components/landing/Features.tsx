'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { Sparkles, Layout, Zap, Play, ShieldCheck, Rocket } from 'lucide-react';

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
        icon: Sparkles,
        gradient: 'from-blue-500 to-violet-500',
        delay: 0,
    },
    {
        title: 'Smart Organization',
        description:
            'Categorize links automatically. Figma, GitHub, Drive, Invoices — each gets its own beautiful treatment.',
        icon: Layout,
        gradient: 'from-emerald-500 to-cyan-500',
        delay: 0.1,
    },
    {
        title: 'One-Click Sharing',
        description:
            'Generate unique magic links for each project. Share once, update anytime. No more email chains.',
        icon: Zap,
        gradient: 'from-pink-500 to-rose-500',
        delay: 0.2,
    },
    {
        title: 'Fluid Animations',
        description:
            'Every interaction feels premium. Hardware-accelerated, spring-physics animations that delight.',
        icon: Play,
        gradient: 'from-amber-500 to-orange-500',
        delay: 0.3,
    },
    {
        title: 'Safe Deletions',
        description:
            'Two-tap deletion prevents accidents. No disruptive dialogs, just smooth confirmation flows.',
        icon: ShieldCheck,
        gradient: 'from-violet-500 to-purple-500',
        delay: 0.4,
    },
    {
        title: 'Lightning Fast',
        description:
            'Built on Next.js 15 with server actions. Zero loading spinners, instant interactions.',
        icon: Rocket,
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
    const Icon = feature.icon;

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
                <Icon className="h-6 w-6" strokeWidth={2} />
            </div>

            {/* Content */}
            <h3 className="mb-3 text-xl font-normal tracking-tight text-neutral-900 font-display">
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
                        className="text-4xl sm:text-5xl font-normal tracking-tighter text-neutral-900 font-display"
                    >
                        Everything you need
                        <br />
                        <span className="text-neutral-400 italic">to impress clients</span>
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
