import React, { useEffect, useState } from "react";
import { Sparkles, Camera, CheckCircle2, Loader2, ShieldCheck } from "lucide-react";

interface GenerationProgressModalProps {
  styleName: string;
}

const STEPS = [
  "Mapping facial structure & key landmark identity...",
  "Calibrating studio lighting & backdrop environment...",
  "Fitting tailored professional attire & texture...",
  "Rendering 1K high-definition portrait photography...",
];

const TIPS = [
  "LinkedIn profiles with professional headshots receive 21x more profile views.",
  "Natural warm smiles are rated 38% more approachable in corporate hiring.",
  "Our AI retains your exact facial identity while upgrading clothing and studio lighting.",
  "Vertical 3:4 crops are ideal for PDF resumes and executive press releases.",
];

export const GenerationProgressModal: React.FC<GenerationProgressModalProps> = ({
  styleName,
}) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [tipIndex, setTipIndex] = useState(0);

  useEffect(() => {
    const stepInterval = setInterval(() => {
      setCurrentStep((prev) => (prev < STEPS.length - 1 ? prev + 1 : prev));
    }, 2200);

    const tipInterval = setInterval(() => {
      setTipIndex((prev) => (prev + 1) % TIPS.length);
    }, 3800);

    return () => {
      clearInterval(stepInterval);
      clearInterval(tipInterval);
    };
  }, []);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/80 p-4 backdrop-blur-md animate-fadeIn">
      <div className="w-full max-w-lg rounded-2xl border border-slate-700 bg-slate-900 p-6 text-white shadow-2xl">
        {/* Header Icon */}
        <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-tr from-indigo-600 to-purple-500 text-white shadow-lg ring-4 ring-indigo-500/20">
          <Camera className="h-7 w-7 animate-pulse" />
        </div>

        <h3 className="text-center text-lg font-bold sm:text-xl">
          Developing Your AI Studio Headshot
        </h3>
        <p className="mt-1 text-center text-xs text-slate-400">
          Applying <strong className="text-amber-400 font-semibold">{styleName}</strong> aesthetic
        </p>

        {/* Animated Step List */}
        <div className="my-6 space-y-3 rounded-xl border border-slate-800 bg-slate-950/60 p-4">
          {STEPS.map((stepText, idx) => {
            const isDone = idx < currentStep;
            const isCurrent = idx === currentStep;
            return (
              <div key={idx} className="flex items-center gap-3 text-xs">
                {isDone ? (
                  <CheckCircle2 className="h-4 w-4 shrink-0 text-emerald-400" />
                ) : isCurrent ? (
                  <Loader2 className="h-4 w-4 shrink-0 animate-spin text-indigo-400" />
                ) : (
                  <div className="h-4 w-4 shrink-0 rounded-full border border-slate-700" />
                )}
                <span
                  className={
                    isDone
                      ? "text-slate-400 line-through decoration-slate-600"
                      : isCurrent
                      ? "font-semibold text-white"
                      : "text-slate-500"
                  }
                >
                  {stepText}
                </span>
              </div>
            );
          })}
        </div>

        {/* Tip Banner */}
        <div className="rounded-xl border border-indigo-900/50 bg-indigo-950/40 p-3 text-xs text-indigo-200 flex items-start gap-2.5">
          <Sparkles className="h-4 w-4 shrink-0 text-amber-400 mt-0.5" />
          <div>
            <div className="font-bold text-amber-300">Photography Fact:</div>
            <p className="mt-0.5 text-indigo-200/90 text-[11px] leading-relaxed">
              {TIPS[tipIndex]}
            </p>
          </div>
        </div>

        {/* Likeness Guarantee Note */}
        <div className="mt-4 flex items-center justify-center gap-1.5 text-[11px] text-slate-400">
          <ShieldCheck className="h-3.5 w-3.5 text-emerald-400" />
          <span>Facial identity & skin tone protection active</span>
        </div>
      </div>
    </div>
  );
};
