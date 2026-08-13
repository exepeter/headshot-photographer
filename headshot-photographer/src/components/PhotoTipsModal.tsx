import React from "react";
import { CheckCircle2, XCircle, Lightbulb, Camera, Sun, Smile, UserCheck } from "lucide-react";

export const PhotoTipsModal: React.FC = () => {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="rounded-2xl border border-slate-200 bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 p-6 text-white shadow-sm">
        <div className="flex items-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-indigo-600 text-white shadow">
            <Camera className="h-6 w-6" />
          </div>
          <div>
            <h2 className="text-xl font-bold sm:text-2xl">
              Selfie Preparation Guide for AI Headshots
            </h2>
            <p className="mt-0.5 text-xs text-indigo-200">
              Follow these simple photography tips to achieve maximum facial likeness and 4K studio quality
            </p>
          </div>
        </div>
      </div>

      {/* Grid of Tips */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        {/* DOs Card */}
        <div className="rounded-2xl border border-emerald-200 bg-emerald-50/40 p-5 shadow-2xs space-y-3">
          <div className="flex items-center gap-2 text-emerald-800 font-bold text-sm">
            <CheckCircle2 className="h-5 w-5 text-emerald-600" />
            <span>DO: Recommended Photo Conditions</span>
          </div>
          <ul className="space-y-2 text-xs text-emerald-950 leading-relaxed">
            <li className="flex items-start gap-2">
              <Sun className="h-4 w-4 text-emerald-600 shrink-0 mt-0.5" />
              <span><strong>Soft Front Natural Light:</strong> Face a window with soft indirect daylight. Avoid dark shadows across cheeks.</span>
            </li>
            <li className="flex items-start gap-2">
              <UserCheck className="h-4 w-4 text-emerald-600 shrink-0 mt-0.5" />
              <span><strong>Eye-Level Camera Angle:</strong> Hold your phone directly at eye level, roughly 2-3 feet away from your face.</span>
            </li>
            <li className="flex items-start gap-2">
              <Smile className="h-4 w-4 text-emerald-600 shrink-0 mt-0.5" />
              <span><strong>Neutral or Natural Smile:</strong> Keep your shoulders relaxed and look directly into the camera lens.</span>
            </li>
            <li className="flex items-start gap-2">
              <Camera className="h-4 w-4 text-emerald-600 shrink-0 mt-0.5" />
              <span><strong>Clear Unobstructed Face:</strong> Ensure eyes, eyebrows, nose, and mouth are clearly visible without heavy filters.</span>
            </li>
          </ul>
        </div>

        {/* DON'Ts Card */}
        <div className="rounded-2xl border border-rose-200 bg-rose-50/40 p-5 shadow-2xs space-y-3">
          <div className="flex items-center gap-2 text-rose-800 font-bold text-sm">
            <XCircle className="h-5 w-5 text-rose-600" />
            <span>DON'T: Things to Avoid</span>
          </div>
          <ul className="space-y-2 text-xs text-rose-950 leading-relaxed">
            <li className="flex items-start gap-2">
              <span className="text-rose-600 font-bold shrink-0">✕</span>
              <span><strong>Harsh Backlighting:</strong> Don't sit with a bright window directly behind your head.</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-rose-600 font-bold shrink-0">✕</span>
              <span><strong>Extreme Angles:</strong> Avoid steep low-angle upward shots or extreme high-angle tilt selfies.</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-rose-600 font-bold shrink-0">✕</span>
              <span><strong>Heavy Accessories or Glasses:</strong> Avoid dark tinted sunglasses, hats, or hands covering chin.</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-rose-600 font-bold shrink-0">✕</span>
              <span><strong>Blurry / Heavy Motion:</strong> Low resolution or pixelated photos hinder facial feature mapping.</span>
            </li>
          </ul>
        </div>
      </div>

      {/* Pro Tip Banner */}
      <div className="rounded-2xl border border-amber-200 bg-amber-50 p-4 text-xs text-amber-900 flex items-start gap-3">
        <Lightbulb className="h-5 w-5 text-amber-600 shrink-0 mt-0.5" />
        <div>
          <div className="font-bold text-amber-950">How our AI preserves your face:</div>
          <p className="mt-0.5 text-amber-900/90 leading-relaxed">
            StudioAI Headshots uses advanced facial feature recognition on your uploaded photo. It replaces casual clothing with tailored blazers or silk blouses, cleans up messy backgrounds into studio backdrops, and recalculates three-point lighting — while guaranteeing your face remains 100% recognizable.
          </p>
        </div>
      </div>
    </div>
  );
};
