'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';

const SPRING_ENTER = {
    type: 'spring',
    stiffness: 280,
    damping: 30,
    mass: 1,
} as const;

const footerLinks = {
    Product: ['Features', 'Pricing', 'Changelog', 'Roadmap'],
    Resources: ['Documentation', 'API', 'Guides', 'Support'],
    Company: ['About', 'Blog', 'Careers', 'Contact'],
    Legal: ['Privacy', 'Terms', 'Security'],
};

export default function Footer() {
    return (
        <footer className="relative border-t border-neutral-200/60 bg-white/50 backdrop-blur-sm">
            <div className="mx-auto max-w-6xl px-6 py-16">
                <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-5">
                    {/* Brand Column */}
                    <div className="lg:col-span-2">
                        <Link href="/" className="flex items-center gap-2">
                            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-blue-600 to-violet-600 shadow-md">
                                <svg
                                    className="h-5 w-5 text-white"
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
                            <span className="text-xl font-bold tracking-tight text-neutral-900">
                                GigLink
                            </span>
                        </Link>
                        <p className="mt-4 max-w-xs text-sm text-neutral-500 leading-relaxed">
                            The friction-less way to share project deliverables with clients.
                            Beautiful portals, zero email chains.
                        </p>

                        {/* Social Links */}
                        <div className="mt-6 flex gap-3">
                            {[
                                {
                                    name: 'Twitter',
                                    icon: (
                                        <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                                            <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                                        </svg>
                                    ),
                                },
                                {
                                    name: 'GitHub',
                                    icon: (
                                        <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                                            <path
                                                fillRule="evenodd"
                                                d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
                                                clipRule="evenodd"
                                            />
                                        </svg>
                                    ),
                                },
                                {
                                    name: 'LinkedIn',
                                    icon: (
                                        <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                                            <path d="M20.5 2h-17A1.5 1.5 0 002 3.5v17A1.5 1.5 0 003.5 22h17a1.5 1.5 0 001.5-1.5v-17A1.5 1.5 0 0020.5 2zM8 19H5v-9h3zM6.5 8.25A1.75 1.75 0 118.3 6.5a1.78 1.78 0 01-1.8 1.75zM19 19h-3v-4.74c0-1.42-.6-1.93-1.38-1.93A1.74 1.74 0 0013 14.19a.66.66 0 000 .14V19h-3v-9h2.9v1.3a3.11 3.11 0 012.7-1.4c1.55 0 3.36.86 3.36 3.66z" />
                                        </svg>
                                    ),
                                },
                            ].map((social) => (
                                <a
                                    key={social.name}
                                    href="#"
                                    aria-label={social.name}
                                    className="flex h-10 w-10 items-center justify-center rounded-full border border-neutral-200 bg-white text-neutral-500 transition-all duration-200 hover:border-neutral-300 hover:text-neutral-700 hover:shadow-sm"
                                >
                                    {social.icon}
                                </a>
                            ))}
                        </div>
                    </div>

                    {/* Link Columns */}
                    {Object.entries(footerLinks).map(([category, links]) => (
                        <div key={category}>
                            <h4 className="text-sm font-semibold text-neutral-900 mb-4">
                                {category}
                            </h4>
                            <ul className="space-y-3">
                                {links.map((link) => (
                                    <li key={link}>
                                        <a
                                            href="#"
                                            className="text-sm text-neutral-500 transition-colors duration-200 hover:text-neutral-900"
                                        >
                                            {link}
                                        </a>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>

                {/* Bottom Bar */}
                <div className="mt-16 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-neutral-200/60 pt-8">
                    <p className="text-sm text-neutral-500">
                        © {new Date().getFullYear()} GigLink. All rights reserved.
                    </p>
                    <p className="text-sm text-neutral-400">
                        Built with ❤️ by{' '}
                        <a
                            href="https://github.com/shrey258"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-neutral-600 hover:text-neutral-900 transition-colors"
                        >
                            Shrey
                        </a>
                    </p>
                </div>
            </div>
        </footer>
    );
}
