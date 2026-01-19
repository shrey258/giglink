import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: {
    default: 'GigLink — The Friction-less Client Portal',
    template: '%s | GigLink',
  },
  description:
    'Share project deliverables with clients through beautiful, organized portals. The friction-less way to manage client resources.',
  openGraph: {
    title: 'GigLink',
    description: 'The friction-less client portal.',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased selection:bg-neutral-900 selection:text-white`}
      >
        <div className="relative min-h-screen">
          {children}
        </div>
      </body>

    </html>
  );
}
