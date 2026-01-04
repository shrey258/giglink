'use client';

import { AnimatePresence, motion, MotionConfig } from 'framer-motion';
import { cn } from '@/lib/utils';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { useState, useEffect, useCallback } from 'react';
import useMeasure from 'react-use-measure';

interface PreviewCardProps {
  className?: string;
}

// 1. Define a consistent width for inner content to prevent layout collapse
const CONTENT_WIDTH = 'w-[340px]';

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
  const [direction, setDirection] = useState(1);
  const [ref, bounds] = useMeasure();

  const handleNext = useCallback(() => {
    if (currentWidget < widgetData.length - 1) {
      setDirection(1);
      setCurrentWidget(prev => prev + 1);
    }
  }, [currentWidget]);

  const handleBack = useCallback(() => {
    if (currentWidget > 0) {
      setDirection(-1);
      setCurrentWidget(prev => prev - 1);
    }
  }, [currentWidget]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') handleNext();
      if (e.key === 'ArrowLeft') handleBack();
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleNext, handleBack]);

  return (
    <MotionConfig transition={{ duration: 0.5, type: 'spring', bounce: 0.25 }}>
      <motion.div
        animate={{ height: bounds.height > 0 ? bounds.height : 'auto' }}
        className={cn(
          'rounded-xl border border-neutral-200 bg-white shadow-sm overflow-hidden',
          className
        )}
      >
        <div
          ref={ref}
          className="p-5 flex flex-col items-center justify-center space-y-12"
        >
          <motion.div layout className="flex -space-x-2 h-6">
            {Array.from({ length: currentWidget }).map((_, index) => (
              <motion.div
                key={widgetData[index].id}
                layoutId={`badge-${widgetData[index].id}`}
                className={cn(
                  'h-6 w-6 rounded-full ring-2 ring-white shadow-sm',
                  widgetData[index].badgeColor
                )}
              />
            ))}
          </motion.div>

          <div className="relative flex items-center justify-center w-full">
            <AnimatePresence
              mode="popLayout"
              initial={false}
              custom={direction}
            >
              <motion.div
                key={currentWidget}
                variants={variants}
                initial="initial"
                animate="active"
                exit="exit"
                custom={direction}
                className="flex items-center justify-center w-full"
              >
                {widgetData[currentWidget].content}
              </motion.div>
            </AnimatePresence>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              disabled={currentWidget === 0}
              onClick={handleBack}
              className="flex h-8 w-8 items-center justify-center rounded-full border border-neutral-200 bg-white text-neutral-500 shadow-sm transition-all hover:bg-neutral-50 hover:text-neutral-900 active:scale-95 disabled:opacity-30 disabled:pointer-events-none"
            >
              <ArrowLeft className="h-4 w-4" />
            </button>
            <button
              type="button"
              disabled={currentWidget === widgetData.length - 1}
              onClick={handleNext}
              className="flex h-8 w-8 items-center justify-center rounded-full border border-neutral-200 bg-white text-neutral-500 shadow-sm transition-all hover:bg-neutral-50 hover:text-neutral-900 active:scale-95 disabled:opacity-30 disabled:pointer-events-none"
            >
              <ArrowRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      </motion.div>
    </MotionConfig>
  );
}

const variants = {
  initial: (direction: number) => {
    return { y: `${110 * direction}%`, opacity: 0 , filter: 'blur(10px)'};
  },
  active: { y: '0%', opacity: 1 , filter: 'blur(0px)'},
  exit: (direction: number) => {
    return { y: `${-110 * direction}%`, opacity: 0 , filter: 'blur(10px)'};
  },
};
