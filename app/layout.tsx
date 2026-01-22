import type { Metadata } from 'next';
import { Inter, Instrument_Serif, JetBrains_Mono } from 'next/font/google';
import './globals.css';

const inter = Inter({
  variable: '--font-inter',
  subsets: ['latin'],
  display: 'swap',
});

const instrumentSerif = Instrument_Serif({
  variable: '--font-instrument-serif',
  subsets: ['latin'],
  weight: ['400'],
  display: 'swap',
});

const jetbrainsMono = JetBrains_Mono({
  variable: '--font-mono',
  subsets: ['latin'],
  display: 'swap',
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
    <html lang="en" className={`${inter.variable} ${instrumentSerif.variable} ${jetbrainsMono.variable}`}>
      <body
        className="font-sans antialiased selection:bg-neutral-900 selection:text-white"
      >
        <div className="relative min-h-screen">
          {children}
        </div>
      </body>
    </html>
  );
}
