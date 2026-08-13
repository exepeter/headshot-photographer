import React from "react";
import { Camera, Sparkles, Image as ImageIcon, HelpCircle, Key, CheckCircle2, AlertCircle } from "lucide-react";

interface NavbarProps {
  activeTab: "generator" | "gallery" | "guide";
  setActiveTab: (tab: "generator" | "gallery" | "guide") => void;
  savedCount: number;
  hasApiKey: boolean;
  onOpenKeyModal?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  setActiveTab,
  savedCount,
  hasApiKey,
}) => {
  return (
    <header className="sticky top-0 z-40 w-full border-b border-slate-200 bg-white/90 backdrop-blur-md">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6">
        {/* Brand Title */}
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-tr from-slate-900 via-indigo-950 to-slate-800 text-amber-400 shadow-md ring-1 ring-slate-800/10">
            <Camera className="h-5 w-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-lg font-bold tracking-tight text-slate-900 sm:text-xl">
                StudioAI <span className="font-semibold text-indigo-600">Headshots</span>
              </h1>
              <span className="inline-flex items-center gap-1 rounded-full bg-amber-500/10 px-2 py-0.5 text-xs font-semibold text-amber-700 ring-1 ring-amber-500/20">
                <Sparkles className="h-3 w-3" /> Pro AI
              </span>
            </div>
            <p className="hidden text-xs text-slate-500 sm:block">
              Turn casual selfies into executive studio headshots in seconds
            </p>
          </div>
        </div>

        {/* Center Tabs */}
        <nav className="flex items-center rounded-full bg-slate-100 p-1 text-sm font-medium text-slate-600 ring-1 ring-slate-200">
          <button
            onClick={() => setActiveTab("generator")}
            className={`flex items-center gap-2 rounded-full px-3 py-1.5 transition-all sm:px-4 ${
              activeTab === "generator"
                ? "bg-white text-slate-900 shadow-sm"
                : "hover:text-slate-900"
            }`}
          >
            <Sparkles className="h-4 w-4 text-indigo-600" />
            <span>Studio</span>
          </button>
          <button
            onClick={() => setActiveTab("gallery")}
            className={`flex items-center gap-2 rounded-full px-3 py-1.5 transition-all sm:px-4 ${
              activeTab === "gallery"
                ? "bg-white text-slate-900 shadow-sm"
                : "hover:text-slate-900"
            }`}
          >
            <ImageIcon className="h-4 w-4 text-slate-600" />
            <span>Saved Shots</span>
            {savedCount > 0 && (
              <span className="ml-0.5 rounded-full bg-indigo-100 px-1.5 py-0.2 text-xs font-bold text-indigo-700">
                {savedCount}
              </span>
            )}
          </button>
          <button
            onClick={() => setActiveTab("guide")}
            className={`hidden items-center gap-2 rounded-full px-3 py-1.5 transition-all sm:flex sm:px-4 ${
              activeTab === "guide"
                ? "bg-white text-slate-900 shadow-sm"
                : "hover:text-slate-900"
            }`}
          >
            <HelpCircle className="h-4 w-4 text-slate-500" />
            <span>Selfie Guide</span>
          </button>
        </nav>

        {/* Right Status */}
        <div className="flex items-center gap-2">
          {hasApiKey ? (
            <div
              title="Gemini API connected"
              className="flex items-center gap-1.5 rounded-full bg-emerald-50 px-3 py-1 text-xs font-medium text-emerald-700 ring-1 ring-emerald-200"
            >
              <CheckCircle2 className="h-3.5 w-3.5 text-emerald-600" />
              <span className="hidden sm:inline">AI Engine Active</span>
            </div>
          ) : (
            <div
              title="Missing GEMINI_API_KEY"
              className="flex items-center gap-1.5 rounded-full bg-amber-50 px-3 py-1 text-xs font-medium text-amber-800 ring-1 ring-amber-300"
            >
              <AlertCircle className="h-3.5 w-3.5 text-amber-600" />
              <span className="hidden sm:inline">Check API Key</span>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};
