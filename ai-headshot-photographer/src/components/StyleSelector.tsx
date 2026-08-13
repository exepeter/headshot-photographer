import React, { useState } from "react";
import { HEADSHOT_STYLES } from "../data/styles";
import { HeadshotStyle, StyleCategory } from "../types";
import { Sparkles, Check, Building2, Laptop, Trees, Palette, Layers } from "lucide-react";

interface StyleSelectorProps {
  selectedStyle: HeadshotStyle;
  onSelectStyle: (style: HeadshotStyle) => void;
}

const CATEGORIES: { id: StyleCategory; label: string; icon: React.ReactNode }[] = [
  { id: "all", label: "All Styles", icon: <Layers className="h-3.5 w-3.5" /> },
  { id: "corporate", label: "Corporate", icon: <Building2 className="h-3.5 w-3.5" /> },
  { id: "tech", label: "Tech & Startup", icon: <Laptop className="h-3.5 w-3.5" /> },
  { id: "outdoor", label: "Outdoor", icon: <Trees className="h-3.5 w-3.5" /> },
  { id: "creative", label: "Creative & Editorial", icon: <Palette className="h-3.5 w-3.5" /> },
];

export const StyleSelector: React.FC<StyleSelectorProps> = ({
  selectedStyle,
  onSelectStyle,
}) => {
  const [activeCategory, setActiveCategory] = useState<StyleCategory>("all");

  const filteredStyles =
    activeCategory === "all"
      ? HEADSHOT_STYLES
      : HEADSHOT_STYLES.filter((s) => s.category === activeCategory);

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
      <div className="mb-4 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
        <div>
          <h2 className="text-base font-bold text-slate-900 sm:text-lg flex items-center gap-2">
            <Sparkles className="h-5 w-5 text-indigo-600" /> Step 2: Choose Studio Style
          </h2>
          <p className="text-xs text-slate-500">
            Select the aesthetic environment and backdrop for your headshot
          </p>
        </div>

        {/* Category Pills */}
        <div className="flex flex-wrap items-center gap-1.5 rounded-xl bg-slate-100 p-1">
          {CATEGORIES.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`flex items-center gap-1.5 rounded-lg px-2.5 py-1 text-xs font-semibold transition-all ${
                activeCategory === cat.id
                  ? "bg-white text-slate-900 shadow-2xs"
                  : "text-slate-600 hover:text-slate-900"
              }`}
            >
              {cat.icon}
              <span>{cat.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Grid of Styles */}
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {filteredStyles.map((style) => {
          const isSelected = selectedStyle.id === style.id;
          return (
            <div
              key={style.id}
              onClick={() => onSelectStyle(style)}
              className={`group relative cursor-pointer overflow-hidden rounded-xl border p-3.5 transition-all ${
                isSelected
                  ? "border-indigo-600 bg-indigo-50/20 shadow-md ring-2 ring-indigo-600/20"
                  : "border-slate-200 bg-white hover:border-slate-300 hover:bg-slate-50/50 hover:shadow-sm"
              }`}
            >
              {/* Card Top Preview Gradient Header */}
              <div
                className={`relative mb-3 h-20 w-full overflow-hidden rounded-lg bg-gradient-to-br ${style.previewGradient} p-2 text-white shadow-inner`}
              >
                {style.badge && (
                  <span className="inline-block rounded-full bg-black/40 px-2 py-0.5 text-[10px] font-bold tracking-wide uppercase text-amber-300 backdrop-blur-xs">
                    {style.badge}
                  </span>
                )}
                {isSelected && (
                  <div className="absolute top-2 right-2 flex h-6 w-6 items-center justify-center rounded-full bg-indigo-600 text-white shadow">
                    <Check className="h-4 w-4 stroke-[3]" />
                  </div>
                )}
                <div className="absolute bottom-2 left-2 text-xs font-extrabold tracking-wide text-white drop-shadow">
                  {style.name}
                </div>
              </div>

              {/* Card Body */}
              <p className="text-xs text-slate-600 line-clamp-2 min-h-[32px]">
                {style.description}
              </p>

              {/* Footer indicator */}
              <div className="mt-2.5 flex items-center justify-between border-t border-slate-100 pt-2 text-[10px] text-slate-500 font-medium">
                <span>Setting: <strong className="text-slate-700 capitalize">{style.category}</strong></span>
                {isSelected ? (
                  <span className="font-bold text-indigo-600">Selected</span>
                ) : (
                  <span className="group-hover:text-slate-800 transition">Select</span>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
