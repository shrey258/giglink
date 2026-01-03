'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { useState } from 'react';

interface PreviewCardProps {
  className?: string;
}

// 1. Define a consistent width for inner content to prevent layout collapse
const CONTENT_WIDTH = "w-[340px]"; 

const widgetData = [
  {
    id: 'first',
    badgeColor: 'bg-neutral-900',
    content: (
      <div className={`flex items-center gap-3 ${CONTENT_WIDTH}`}>
        <motion.div
          layoutId="badge-first"
          className="h-10 w-10 shrink-0 rounded-full bg-neutral-900 shadow-sm"
        />
        <div className="h-10 flex-1 rounded-xl bg-neutral-100 border border-neutral-200 shadow-inner" />
      </div>
    ),
  },
  {
    id: 'second',
    badgeColor: 'bg-blue-600',
    content: (
      <div className={`flex items-center gap-3 ${CONTENT_WIDTH}`}>
        <motion.div
          layoutId="badge-second"
          className="h-10 w-10 shrink-0 rounded-full bg-blue-600 shadow-sm"
        />
        <div className="h-10 flex-1 rounded-xl bg-linear-to-r from-blue-50 to-indigo-50 border border-blue-100 shadow-inner" />
      </div>
    ),
  },
  {
    id: 'third',
    badgeColor: 'bg-emerald-600',
    content: (
      <div className={`flex items-center gap-3 ${CONTENT_WIDTH}`}>
        <motion.div
          layoutId="badge-third"
          className="h-10 w-10 shrink-0 rounded-full bg-emerald-600 shadow-sm"
        />
        <div className="h-10 flex-1 rounded-xl bg-emerald-50/40 border border-dashed border-emerald-200 shadow-inner" />
      </div>
    ),
  },
  {
    id: 'fourth',
    badgeColor: 'bg-purple-600',
    content: (
      <div className={`flex items-center gap-3 ${CONTENT_WIDTH}`}>
        <motion.div
          layoutId="badge-fourth"
          className="h-10 w-10 shrink-0 rounded-full bg-purple-600 shadow-sm"
        />
        <div className="h-10 flex-1 rounded-xl bg-neutral-50 border border-neutral-200 shadow-inner" />
      </div>
    ),
  },
  {
    id: 'submit',
    badgeColor: 'bg-neutral-900',
    content: (
      <div className={`flex items-center gap-3 ${CONTENT_WIDTH}`}>
        {/* 2. OPTIONAL TRICK: 
           We add a invisible placeholder of the exact same size (w-10) 
           as the badges above. This ensures the "Submit" button aligns 
           perfectly with the inputs, rather than stretching full width.
           If you WANT it full width, remove this empty div.
        */}
        {/* <div className="w-10 shrink-0" />  */}
        
        <button
          type="button"
          className="h-10 flex-1 rounded-xl bg-neutral-900 text-white text-sm font-medium border border-neutral-900 shadow-sm flex items-center justify-center"
        >
          Submit
        </button>
      </div>
    ),
  },
];

export default function PreviewCard({ className }: PreviewCardProps) {
  const [currentWidget, setCurrentWidget] = useState(0);

  return (
    // 3. Add 'layout' to the parent container. 
    // This tells Framer to smoothly animate any height/width changes of the white card itself.
    <motion.div
      layout
      className={cn(
        'rounded-xl border border-neutral-200 bg-white p-5 shadow-sm min-h-[300px] flex flex-col items-center justify-center space-y-6',
        className
      )}
    >
      <div className="flex -space-x-2 h-6">
        {Array.from({ length: currentWidget }).map((_, index) => (
          <motion.div
            key={widgetData[index].id}
            layoutId={`badge-${widgetData[index].id}`}
            className={cn(
              "h-6 w-6 rounded-full ring-2 ring-white shadow-sm",
              widgetData[index].badgeColor
            )}
          />
        ))}
      </div>

      <AnimatePresence mode="popLayout"> 
        <motion.div
          key={currentWidget}
          // 4. Use 'y' instead of 'transform' string
          initial={{ opacity: 0, transform: 'translateY(100%)' }}
          animate={{ opacity: 1, transform:'translateY(0)' }}
          exit={{ scale: 0.9, opacity: 0, transform:'translateY(-100%)' }} // Scale 0 is too aggressive, 0.9 feels smoother
          transition={{ duration: 0.5, ease: "easeInOut" }}
          // 5. Ensure this container doesn't shrink during animation
          className="flex items-center justify-center w-full" 
        >
          {widgetData[currentWidget].content}
        </motion.div>
      </AnimatePresence>

      <div className="flex items-center gap-2">
        <button
          type="button"
          onClick={() => setCurrentWidget((prev) => (prev - 1 + widgetData.length) % widgetData.length)}
          className="flex h-8 w-8 items-center justify-center rounded-full border border-neutral-200 bg-white text-neutral-500 shadow-sm transition-all hover:bg-neutral-50 hover:text-neutral-900 active:scale-95"
        >
          <ArrowLeft className="h-4 w-4" />
        </button>
        <button
          type="button"
          onClick={() => setCurrentWidget((prev) => (prev + 1) % widgetData.length)}
          className="flex h-8 w-8 items-center justify-center rounded-full border border-neutral-200 bg-white text-neutral-500 shadow-sm transition-all hover:bg-neutral-50 hover:text-neutral-900 active:scale-95"
        >
          <ArrowRight className="h-4 w-4" />
        </button>
      </div>
    </motion.div>
  );
}