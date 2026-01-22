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
  initial: (direction: number) => ({
    y: direction > 0 ? 20 : -20,
    opacity: 0,
    filter: 'blur(8px)',
    scale: 0.96,
  }),
  active: {
    y: 0,
    opacity: 1,
    filter: 'blur(0px)',
    scale: 1,
  },
  exit: (direction: number) => ({
    y: direction > 0 ? -20 : 20,
    opacity: 0,
    filter: 'blur(8px)',
    scale: 0.96,
  }),
};

const SPRING_CONFIG = {
  type: 'spring',
  stiffness: 400,
  damping: 30,
  mass: 1,
} as const;

export default function AddLink({ projectId }: { projectId: string }) {
  const [loading, setLoading] = useState(false);
  const [selectedType, setSelectedType] =
    useState<LinkTypeOption>(defaultLinkType);
  const [currentStep, setCurrentStep] = useState(0);
  const [direction, setDirection] = useState(1);
  const [ref, bounds] = useMeasure();
  const [isSuccess, setIsSuccess] = useState(false);

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
            <motion.input
              name="url"
              required
              type="url"
              autoFocus
              animate={errors.url ? { x: [-2, 2, -2, 2, 0] } : {}}
              transition={{ duration: 0.4 }}
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
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
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
            <motion.input
              name="title"
              required
              autoFocus
              animate={errors.title ? { x: [-2, 2, -2, 2, 0] } : {}}
              transition={{ duration: 0.4 }}
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
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
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
        <div className="flex w-full flex-col items-center justify-center py-6">
          <motion.button
            type="submit"
            disabled={loading}
            whileHover={{ scale: 1.02, y: -2 }}
            whileTap={{ scale: 0.98, y: 0 }}
            className="group relative flex items-center justify-center gap-3 rounded-2xl bg-neutral-900 px-16 py-4 text-[15px] font-bold text-white shadow-xl hover:shadow-2xl transition-shadow disabled:opacity-50 overflow-hidden"
          >
            <motion.div
              className="absolute inset-0 bg-gradient-to-tr from-white/0 via-white/10 to-white/0"
              initial={{ x: '-100%' }}
              whileHover={{ x: '100%' }}
              transition={{ duration: 0.6, ease: 'easeInOut' }}
            />
            {loading ? (
              <Loader2 className="h-5 w-5 animate-spin" />
            ) : (
              <Plus className="h-5 w-5 transition-transform group-hover:rotate-90 group-hover:scale-110" />
            )}
            <span className="relative z-10">Add Resource</span>
          </motion.button>
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

    // Success State
    setIsSuccess(true);

    // Reset after delay
    setTimeout(() => {
      setIsSuccess(false);
      setCurrentStep(0);
      setDirection(1); // Reset direction for next entry
      setSelectedType(defaultLinkType);
      setUrl('');
      setTitle('');
      setErrors({});
    }, 2500);
  }

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (isSuccess) return; // Disable keys during success state

      const isInput =
        e.target instanceof HTMLInputElement ||
        e.target instanceof HTMLTextAreaElement;
      const isModifierKey = e.metaKey || e.ctrlKey;

      if (e.key === 'ArrowRight' && (!isInput || isModifierKey)) {
        e.preventDefault();
        handleNext();
      }
      if (e.key === 'ArrowLeft' && (!isInput || isModifierKey)) {
        e.preventDefault();
        handleBack();
      }

      if (e.key === 'Enter') {
        if (currentStep < steps.length - 1) {
          e.preventDefault();
          e.stopPropagation();
          handleNext();
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleNext, handleBack, currentStep, steps.length, isSuccess]);

  if (isSuccess) {
    return (
      <div className="glass rounded-3xl shadow-premium overflow-hidden h-[240px] flex items-center justify-center relative border-neutral-200/50">
        <Confetti />
        <motion.div
          initial={{ scale: 0.5, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          transition={{ type: 'spring', damping: 15, stiffness: 200 }}
          className="flex flex-col items-center gap-4 relative z-10"
        >
          <div className="h-20 w-20 rounded-full bg-green-50 flex items-center justify-center text-green-600 shadow-inner">
            <motion.svg
              initial={{ pathLength: 0, scale: 0.5 }}
              animate={{ pathLength: 1, scale: 1 }}
              transition={{ duration: 0.6, ease: 'easeOut' }}
              className="h-10 w-10"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={3}
            >
              <motion.path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M4.5 12.75l6 6 9-13.5"
              />
            </motion.svg>
          </div>
          <motion.h3
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-xl font-normal text-neutral-900 tracking-tight font-display"
          >
            Resource Added!
          </motion.h3>
        </motion.div>
      </div>
    );
  }

  return (
    <MotionConfig transition={SPRING_CONFIG}>
      <motion.div
        animate={{ height: bounds.height > 0 ? bounds.height : 'auto' }}
        className="glass rounded-3xl shadow-premium border-neutral-200/50 overflow-hidden"
      >
        <div ref={ref} className="px-6 py-8 flex flex-col items-center gap-10">
          <div className="w-full relative flex items-center h-12 px-2">
            <div className="flex flex-col gap-1 min-w-[100px]">
              <motion.h3
                layoutId="step-label"
                className="text-sm font-normal text-neutral-900 tracking-tight leading-none uppercase font-display"
              >
                {steps[currentStep].label}
              </motion.h3>
              <p className="text-[11px] text-neutral-400 font-bold leading-none tracking-wider">
                STEP {currentStep + 1} OF {steps.length}
              </p>
            </div>

            <div className="absolute left-1/2 -translate-x-1/2 flex items-center justify-center">
              <motion.div layout className="flex -space-x-3 h-8 items-center">
                {Array.from({ length: currentStep }).map((_, index) => {
                  const StepIcon = steps[index].icon;
                  return (
                    <motion.div
                      key={steps[index].id}
                      layoutId={`badge-${steps[index].id}`}
                      initial={{ scale: 0.5, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      className="h-8 w-8 rounded-full ring-4 ring-white shadow-md bg-neutral-900 flex items-center justify-center text-white"
                    >
                      <StepIcon className="h-3.5 w-3.5" />
                    </motion.div>
                  );
                })}
              </motion.div>
            </div>

            <div className="min-w-[100px]" />
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
                aria-label="Go to previous step"
                className="flex h-8 w-8 items-center justify-center rounded-full text-neutral-400 transition-colors hover:bg-neutral-100 hover:text-neutral-600 disabled:opacity-30 disabled:pointer-events-none"
              >
                <ArrowLeft className="h-4 w-4" />
              </button>
              <motion.button
                type="button"
                onClick={handleNext}
                disabled={currentStep >= steps.length - 1}
                aria-label="Go to next step"
                animate={
                  // Pulse animation if current step is valid
                  (currentStep === 0 && url.length > 5) ||
                    (currentStep === 1 && title.length >= 2)
                    ? { scale: [1, 1.1, 1] }
                    : {}
                }
                transition={{ repeat: Infinity, duration: 1.5, repeatDelay: 1 }}
                className="flex h-8 w-8 items-center justify-center rounded-full text-neutral-400 transition-colors hover:bg-neutral-100 hover:text-neutral-600 disabled:opacity-30 disabled:pointer-events-none"
              >
                <ArrowRight className="h-4 w-4" />
              </motion.button>
            </div>
          </form>
        </div>
      </motion.div>
    </MotionConfig>
  );
}

const Confetti = () => {
  const [particles] = useState(() =>
    [...Array(20)].map(() => ({
      x: (Math.random() - 0.5) * 400,
      y: (Math.random() - 0.5) * 400,
      rotate: Math.random() * 360,
      scale: Math.random() * 1 + 0.5,
      color: ['#FFD700', '#FF6347', '#00BFFF', '#32CD32', '#FF69B4'][
        Math.floor(Math.random() * 5)
      ],
    }))
  );

  return (
    <div className="absolute inset-0 pointer-events-none flex items-center justify-center overflow-hidden">
      {particles.map((p, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 1, scale: 0, x: 0, y: 0 }}
          animate={{
            opacity: 0,
            scale: p.scale,
            x: p.x,
            y: p.y,
            rotate: p.rotate,
          }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className="absolute w-3 h-3 rounded-full"
          style={{ backgroundColor: p.color }}
        />
      ))}
    </div>
  );
};
