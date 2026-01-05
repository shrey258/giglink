'use client';

import { useState, useCallback, useEffect } from 'react';
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
  const [selectedType, setSelectedType] =
    useState<LinkTypeOption>(defaultLinkType);
  const [currentStep, setCurrentStep] = useState(0);
  const [direction, setDirection] = useState(1);
  const [ref, bounds] = useMeasure();

  // Form State
  const [url, setUrl] = useState('');
  const [title, setTitle] = useState('');
  const [errors, setErrors] = useState<{ url?: string; title?: string }>({});

  const validateStep = useCallback(() => {
    const newErrors: { url?: string; title?: string } = {};

    if (currentStep === 0) {
      if (!url) {
        newErrors.url = 'URL is required';
      } else {
        try {
          new URL(url);
        } catch {
          newErrors.url = 'Please enter a valid URL';
        }
      }
    }

    if (currentStep === 1) {
      if (!title.trim()) {
        newErrors.title = 'Title is required';
      } else if (title.length < 2) {
        newErrors.title = 'Title must be at least 2 characters';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }, [currentStep, url, title]);

  const steps = [
    {
      id: 'url',
      label: 'URL',
      icon: LinkIcon,
      content: (
        <div className="flex w-full flex-col gap-1">
          <div className="flex w-full items-center gap-4">
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
              value={url}
              onChange={e => {
                setUrl(e.target.value);
                if (errors.url)
                  setErrors(prev => ({ ...prev, url: undefined }));
              }}
              className="flex-1 bg-transparent text-[15px] text-neutral-900 outline-none placeholder:text-neutral-400 caret-neutral-900"
            />
          </div>
          {errors.url && (
            <motion.p
              key="url-error"
              initial={{ opacity: 0, x: -100 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.2, ease: [0.215, 0.61, 0.355, 1] }}
              className="ml-14 text-[11px] font-medium text-red-500"
            >
              {errors.url}
            </motion.p>
          )}
        </div>
      ),
    },
    {
      id: 'title',
      label: 'Title',
      icon: Type,
      content: (
        <div className="flex w-full flex-col gap-1">
          <div className="flex w-full items-center gap-4">
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
              value={title}
              onChange={e => {
                setTitle(e.target.value);
                if (errors.title)
                  setErrors(prev => ({ ...prev, title: undefined }));
              }}
              className="flex-1 bg-transparent text-[15px] text-neutral-900 outline-none placeholder:text-neutral-400 caret-neutral-900"
            />
          </div>
          {errors.title && (
            <motion.p
              key="title-error"
              initial={{ opacity: 0, x: -100 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.2, ease: [0.215, 0.61, 0.355, 1] }}
              className="ml-14 text-[11px] font-medium text-red-500"
            >
              {errors.title}
            </motion.p>
          )}
        </div>
      ),
    },
    {
      id: 'type',
      label: 'Type',
      icon: MousePointer2,
      content: (
        <div className="flex w-full items-center gap-4">
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
      label: 'Finish',
      icon: Plus,
      content: (
        <div className="flex w-full flex-col items-center justify-center py-4">
          <button
            type="submit"
            disabled={loading}
            className="group relative flex items-center justify-center gap-2 rounded-full bg-neutral-900 px-12 py-4 text-[15px] font-semibold text-white shadow-2xl ring-8 ring-neutral-50 transition-all hover:bg-black hover:scale-[1.02] active:scale-[0.98] disabled:scale-100 disabled:opacity-50"
          >
            {loading ? (
              <Loader2 className="h-5 w-5 animate-spin" />
            ) : (
              <Plus className="h-5 w-5 transition-transform group-hover:rotate-90" />
            )}
            <span>Add Resource</span>
          </button>
        </div>
      ),
    },
  ];

  const handleNext = useCallback(() => {
    if (!validateStep()) return;

    if (currentStep < steps.length - 1) {
      setDirection(1);
      setCurrentStep(prev => prev + 1);
    }
  }, [currentStep, steps.length, validateStep]);

  const handleBack = useCallback(() => {
    setErrors({}); // Clear errors on back
    if (currentStep > 0) {
      setDirection(-1);
      setCurrentStep(prev => prev - 1);
    }
  }, [currentStep]);

  async function handleSubmit() {
    if (!validateStep()) return;

    setLoading(true);
    const formData = new FormData();
    formData.append('projectId', projectId);
    formData.append('url', url);
    formData.append('title', title);
    formData.append('type', selectedType.value);

    const result = await createLink(formData);
    setLoading(false);

    if (result?.error) {
      setErrors({ url: result.error });
      return;
    }

    // Reset
    setCurrentStep(0);
    setDirection(-1);
    setSelectedType(defaultLinkType);
    setUrl('');
    setTitle('');
    setErrors({});
  }

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const isInput =
        e.target instanceof HTMLInputElement ||
        e.target instanceof HTMLTextAreaElement;
      const isModifierKey = e.metaKey || e.ctrlKey;

      // Handle Arrow Keys
      if (e.key === 'ArrowRight' && (!isInput || isModifierKey)) {
        e.preventDefault();
        handleNext();
      }
      if (e.key === 'ArrowLeft' && (!isInput || isModifierKey)) {
        e.preventDefault();
        handleBack();
      }

      // Handle Enter Key
      if (e.key === 'Enter') {
        if (currentStep < steps.length - 1) {
          // If we're not on the last step, advance to next
          e.preventDefault();
          // Stop propagation to prevent the form from seeing this Enter
          e.stopPropagation();
          handleNext();
        }
        // If we ARE on the last step (submit), let the natural form submission happen
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleNext, handleBack, currentStep, steps.length]);

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

          <form
            onSubmit={e => {
              e.preventDefault();
              handleSubmit();
            }}
            className="w-full flex flex-col items-center gap-8"
          >
            <div className="relative flex items-center justify-center w-full min-h-[40px]">
              <AnimatePresence
                mode="popLayout"
                initial={false}
                custom={direction}
              >
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
