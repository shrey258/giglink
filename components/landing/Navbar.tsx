'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';

const SPRING_ENTER = {
    type: 'spring',
    stiffness: 280,
    damping: 30,
    mass: 1,
} as const;

export default function Navbar() {
    return (
        <motion.nav
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ ...SPRING_ENTER, delay: 0.1 }}
            className="fixed top-0 left-0 right-0 z-50"
        >
            <div className="mx-auto max-w-6xl px-6 pt-4">
                <div className="flex items-center justify-between rounded-full border border-neutral-200/60 bg-white/70 backdrop-blur-xl px-6 py-3 shadow-lg shadow-neutral-900/5">
                    {/* Logo */}
                    <Link href="/" className="flex items-center gap-2">
                        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-blue-600 to-violet-600 shadow-md">
                            <svg
                                className="h-4 w-4 text-white"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                                strokeWidth={2.5}
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1"
                                />
                            </svg>
                        </div>
                        <span className="text-lg font-bold tracking-tight text-neutral-900">
                            GigLink
                        </span>
                    </Link>

                    {/* Nav Links */}
                    <div className="hidden md:flex items-center gap-1">
                        {['Features', 'How It Works', 'Pricing'].map((item) => (
                            <Link
                                key={item}
                                href={`#${item.toLowerCase().replace(/\s+/g, '-')}`}
                                className="rounded-full px-4 py-2 text-sm font-medium text-neutral-600 transition-colors duration-200 hover:text-neutral-900 hover:bg-neutral-100/50"
                            >
                                {item}
                            </Link>
                        ))}
                    </div>

                    {/* CTA */}
                    <div className="flex items-center gap-3">
                        <Link
                            href="/login"
                            className="hidden sm:inline-flex rounded-full px-4 py-2 text-sm font-medium text-neutral-600 transition-colors duration-200 hover:text-neutral-900"
                        >
                            Log In
                        </Link>
                        <Link
                            href="/login"
                            className="inline-flex items-center rounded-full bg-neutral-900 px-5 py-2.5 text-sm font-semibold text-white shadow-md transition-all duration-200 hover:shadow-lg hover:scale-[1.02] active:scale-[0.98]"
                        >
                            Get Started
                        </Link>
                    </div>
                </div>
            </div>
        </motion.nav>
    );
}
