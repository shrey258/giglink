'use client';

import { useState, useCallback } from 'react';
import { createLink } from '@/app/actions';
import {
  Plus,
  Loader2,
  Link as LinkIcon,
  Type,
  MousePointer2,
  ArrowLeft,
  ArrowRight,
} from 'lucide-react';
import LinkTypeSelect, {
  linkTypeOptions,
  defaultLinkType,
  type LinkTypeOption,
} from '@/components/LinkTypeSelect';
import { cn } from '@/lib/utils';
import { motion, AnimatePresence, MotionConfig } from 'framer-motion';
import useMeasure from 'react-use-measure';

const variants = {
  initial: (direction: number) => {
    return { y: `${110 * direction}%`, opacity: 0, filter: 'blur(10px)' };
  },
  active: { y: '0%', opacity: 1, filter: 'blur(0px)' },
  exit: (direction: number) => {
    return { y: `${-110 * direction}%`, opacity: 0, filter: 'blur(10px)' };
  },
};

export default function AddLink({ projectId }: { projectId: string }) {
  const [loading, setLoading] = useState(false);
  const [selectedType, setSelectedType] = useState<LinkTypeOption>(defaultLinkType);
  const [currentStep, setCurrentStep] = useState(0);
  const [direction, setDirection] = useState(1);
  const [ref, bounds] = useMeasure();

  const steps = [
    {
      id: 'url',
      label: 'URL',
      icon: LinkIcon,
      content: (
        <div className="flex items-center gap-4 w-full">
          <motion.div
            layoutId="badge-url"
            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-neutral-900 text-white"
          >
            <LinkIcon className="h-4 w-4" />
          </motion.div>
          <input
            name="url"
            required
            type="url"
            autoFocus
            placeholder="Paste link"
            className="flex-1 bg-transparent text-[15px] text-neutral-900 placeholder:text-neutral-400 outline-none caret-neutral-900"
          />
        </div>
      ),
    },
    {
      id: 'title',
      label: 'Title',
      icon: Type,
      content: (
        <div className="flex items-center gap-4 w-full">
          <motion.div
            layoutId="badge-title"
            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-neutral-900 text-white"
          >
            <Type className="h-4 w-4" />
          </motion.div>
          <input
            name="title"
            required
            autoFocus
            placeholder="Give it a name"
            className="flex-1 bg-transparent text-[15px] text-neutral-900 placeholder:text-neutral-400 outline-none caret-neutral-900"
          />
        </div>
      ),
    },
    {
      id: 'type',
      label: 'Type',
      icon: MousePointer2,
      content: (
        <div className="flex items-center gap-4 w-full">
          <motion.div
            layoutId="badge-type"
            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-neutral-900 text-white"
          >
            <MousePointer2 className="h-4 w-4" />
          </motion.div>
          <div className="flex-1">
            <input type="hidden" name="type" value={selectedType.value} />
            <LinkTypeSelect
              value={selectedType}
              options={linkTypeOptions}
              onChange={setSelectedType}
            />
          </div>
        </div>
      ),
    },
    {
      id: 'submit',
      label: 'Submit',
      icon: Plus,
      content: (
        <div className="flex items-center gap-4 w-full">
          <button
            type="submit"
            disabled={loading}
            className="flex flex-1 h-10 items-center justify-center gap-2 rounded-full bg-neutral-900 text-[13px] font-medium text-white transition-colors hover:bg-neutral-800 disabled:opacity-50"
          >
            {loading ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <Plus className="h-4 w-4" />
            )}
            Add Resource
          </button>
        </div>
      ),
    },
  ];

  const handleNext = useCallback(() => {
    if (currentStep < steps.length - 1) {
      setDirection(1);
      setCurrentStep((prev) => prev + 1);
    }
  }, [currentStep, steps.length]);

  const handleBack = useCallback(() => {
    if (currentStep > 0) {
      setDirection(-1);
      setCurrentStep((prev) => prev - 1);
    }
  }, [currentStep]);

  async function handleSubmit(formData: FormData) {
    setLoading(true);
    formData.append('projectId', projectId);
    await createLink(formData);
    setLoading(false);

    // Reset
    setCurrentStep(0);
    setDirection(-1);
    setSelectedType(defaultLinkType);
  }

  return (
    <MotionConfig transition={{ duration: 0.5, type: 'spring', bounce: 0.25 }}>
      <motion.div
        animate={{ height: bounds.height > 0 ? bounds.height : 'auto' }}
        className="rounded-xl border border-neutral-200 bg-white shadow-sm overflow-hidden"
      >
        <div ref={ref} className="px-5 py-6 flex flex-col items-center gap-8">
          <div className="w-full relative flex items-center h-10 px-1">
            <div className="flex flex-col gap-0.5 min-w-[80px]">
              <h3 className="text-[13px] font-semibold text-neutral-900 tracking-tight leading-none">
                {steps[currentStep].label}
              </h3>
              <p className="text-[10px] text-neutral-400 font-medium leading-none">
                Step {currentStep + 1}/{steps.length}
              </p>
            </div>
            
            <div className="absolute left-1/2 -translate-x-1/2 flex items-center justify-center">
              <motion.div layout className="flex -space-x-2 h-6 items-center">
                  {Array.from({ length: currentStep }).map((_, index) => {
                    const StepIcon = steps[index].icon;
                    return (
                      <motion.div
                        key={steps[index].id}
                        layoutId={`badge-${steps[index].id}`}
                        className="h-6 w-6 rounded-full ring-2 ring-white shadow-sm bg-neutral-900 flex items-center justify-center text-white"
                      >
                        <StepIcon className="h-2.5 w-2.5" />
                      </motion.div>
                    );
                  })}
              </motion.div>
            </div>

            <div className="min-w-[80px]" />
          </div>

          <form action={handleSubmit} className="w-full flex flex-col items-center gap-8">
            <div className="relative flex items-center justify-center w-full min-h-[40px]">
              <AnimatePresence mode="popLayout" initial={false} custom={direction}>
                <motion.div
                  key={currentStep}
                  variants={variants}
                  initial="initial"
                  animate="active"
                  exit="exit"
                  custom={direction}
                  className="w-full"
                >
                  {steps[currentStep].content}
                </motion.div>
              </AnimatePresence>
            </div>

            <div className="flex items-center justify-center gap-1.5 w-full">
              <button
                type="button"
                disabled={currentStep === 0}
                onClick={handleBack}
                className="flex h-8 w-8 items-center justify-center rounded-full text-neutral-400 transition-colors hover:bg-neutral-100 hover:text-neutral-600 disabled:opacity-30 disabled:pointer-events-none"
              >
                <ArrowLeft className="h-4 w-4" />
              </button>
              <button
                type="button"
                onClick={handleNext}
                disabled={currentStep >= steps.length - 1}
                className="flex h-8 w-8 items-center justify-center rounded-full text-neutral-400 transition-colors hover:bg-neutral-100 hover:text-neutral-600 disabled:opacity-30 disabled:pointer-events-none"
              >
                <ArrowRight className="h-4 w-4" />
              </button>
            </div>
          </form>
        </div>
      </motion.div>
    </MotionConfig>
  );
}
