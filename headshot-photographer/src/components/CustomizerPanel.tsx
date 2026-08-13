import React from "react";
import {
  ATTIRE_OPTIONS,
  EXPRESSION_OPTIONS,
  LIGHTING_OPTIONS,
  FRAMING_OPTIONS,
} from "../data/styles";
import {
  AttireOption,
  ExpressionOption,
  LightingOption,
  FramingOption,
} from "../types";
import {
  Shirt,
  Smile,
  Sun,
  Crop,
  Sliders,
  Sparkles,
  Info,
} from "lucide-react";

interface CustomizerPanelProps {
  selectedAttire: AttireOption;
  onSelectAttire: (attire: AttireOption) => void;
  selectedExpression: ExpressionOption;
  onSelectExpression: (expr: ExpressionOption) => void;
  selectedLighting: LightingOption;
  onSelectLighting: (lighting: LightingOption) => void;
  selectedFraming: FramingOption;
  onSelectFraming: (framing: FramingOption) => void;
  promptDetails: string;
  setPromptDetails: (val: string) => void;
  variationCount: number;
  setVariationCount: (val: number) => void;
}

export const CustomizerPanel: React.FC<CustomizerPanelProps> = ({
  selectedAttire,
  onSelectAttire,
  selectedExpression,
  onSelectExpression,
  selectedLighting,
  onSelectLighting,
  selectedFraming,
  onSelectFraming,
  promptDetails,
  setPromptDetails,
  variationCount,
  setVariationCount,
}) => {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm space-y-6">
      <div>
        <h2 className="text-base font-bold text-slate-900 sm:text-lg flex items-center gap-2">
          <Sliders className="h-5 w-5 text-indigo-600" /> Step 3: Wardrobe & Portrait Controls
        </h2>
        <p className="text-xs text-slate-500">
          Tailor outfit, facial expression, lighting style, and cropping format
        </p>
      </div>

      {/* Attire Selection */}
      <div className="space-y-2">
        <label className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-slate-700">
          <Shirt className="h-3.5 w-3.5 text-indigo-600" /> Wardrobe / Attire
        </label>
        <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
          {ATTIRE_OPTIONS.map((attire) => {
            const isSelected = selectedAttire.id === attire.id;
            return (
              <button
                key={attire.id}
                type="button"
                onClick={() => onSelectAttire(attire)}
                className={`rounded-xl border p-2.5 text-left transition-all ${
                  isSelected
                    ? "border-indigo-600 bg-indigo-50/50 shadow-2xs ring-2 ring-indigo-600/20"
                    : "border-slate-200 bg-white hover:border-slate-300 hover:bg-slate-50"
                }`}
              >
                <div className="font-semibold text-xs text-slate-900 line-clamp-1">
                  {attire.name}
                </div>
                <div className="text-[10px] text-slate-500 line-clamp-1 mt-0.5">
                  {attire.description}
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Expression & Pose */}
      <div className="space-y-2">
        <label className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-slate-700">
          <Smile className="h-3.5 w-3.5 text-indigo-600" /> Expression & Pose
        </label>
        <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
          {EXPRESSION_OPTIONS.map((expr) => {
            const isSelected = selectedExpression.id === expr.id;
            return (
              <button
                key={expr.id}
                type="button"
                onClick={() => onSelectExpression(expr)}
                className={`rounded-xl border p-2.5 text-left transition-all ${
                  isSelected
                    ? "border-indigo-600 bg-indigo-50/50 shadow-2xs ring-2 ring-indigo-600/20"
                    : "border-slate-200 bg-white hover:border-slate-300 hover:bg-slate-50"
                }`}
              >
                <div className="font-semibold text-xs text-slate-900">
                  {expr.name}
                </div>
                <div className="text-[10px] text-slate-500 line-clamp-1 mt-0.5">
                  {expr.description}
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Lighting & Aspect Ratio */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        {/* Lighting */}
        <div className="space-y-2">
          <label className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-slate-700">
            <Sun className="h-3.5 w-3.5 text-indigo-600" /> Studio Lighting
          </label>
          <div className="grid grid-cols-2 gap-2">
            {LIGHTING_OPTIONS.map((lighting) => {
              const isSelected = selectedLighting.id === lighting.id;
              return (
                <button
                  key={lighting.id}
                  type="button"
                  onClick={() => onSelectLighting(lighting)}
                  className={`rounded-xl border p-2 text-left transition-all ${
                    isSelected
                      ? "border-indigo-600 bg-indigo-50/50 shadow-2xs ring-2 ring-indigo-600/20"
                      : "border-slate-200 bg-white hover:border-slate-300 hover:bg-slate-50"
                  }`}
                >
                  <div className="font-semibold text-xs text-slate-900">
                    {lighting.name}
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Framing Ratio */}
        <div className="space-y-2">
          <label className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-slate-700">
            <Crop className="h-3.5 w-3.5 text-indigo-600" /> Aspect Ratio & Framing
          </label>
          <div className="grid grid-cols-3 gap-2">
            {FRAMING_OPTIONS.map((framing) => {
              const isSelected = selectedFraming.id === framing.id;
              return (
                <button
                  key={framing.id}
                  type="button"
                  onClick={() => onSelectFraming(framing)}
                  className={`rounded-xl border p-2 text-center transition-all ${
                    isSelected
                      ? "border-indigo-600 bg-indigo-50/50 shadow-2xs ring-2 ring-indigo-600/20"
                      : "border-slate-200 bg-white hover:border-slate-300 hover:bg-slate-50"
                  }`}
                >
                  <div className="font-bold text-xs text-slate-900">
                    {framing.ratio}
                  </div>
                  <div className="text-[10px] text-slate-500 line-clamp-1 mt-0.5">
                    {framing.name.split(" ")[0]}
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Custom Fine-Tuning Prompt & Batch */}
      <div className="border-t border-slate-100 pt-4 space-y-3">
        <div className="flex items-center justify-between">
          <label className="text-xs font-semibold text-slate-800 flex items-center gap-1.5">
            <Sparkles className="h-3.5 w-3.5 text-amber-500" /> Fine-tune Details (Optional)
          </label>
          <div className="flex items-center gap-2 text-xs">
            <span className="text-slate-500">Variations:</span>
            <button
              type="button"
              onClick={() => setVariationCount(1)}
              className={`rounded-md px-2 py-0.5 font-bold ${
                variationCount === 1
                  ? "bg-indigo-600 text-white"
                  : "bg-slate-100 text-slate-700 hover:bg-slate-200"
              }`}
            >
              1
            </button>
            <button
              type="button"
              onClick={() => setVariationCount(2)}
              className={`rounded-md px-2 py-0.5 font-bold ${
                variationCount === 2
                  ? "bg-indigo-600 text-white"
                  : "bg-slate-100 text-slate-700 hover:bg-slate-200"
              }`}
            >
              2
            </button>
          </div>
        </div>
        <input
          type="text"
          value={promptDetails}
          onChange={(e) => setPromptDetails(e.target.value)}
          placeholder="e.g., Wearing thin silver wire glasses, slight stubble, warm skin tone..."
          className="w-full rounded-xl border border-slate-200 bg-slate-50/50 px-3.5 py-2 text-xs text-slate-800 focus:border-indigo-500 focus:bg-white focus:outline-hidden"
        />
      </div>
    </div>
  );
};
