import React, { useState, useRef } from "react";
import { HeadshotResult } from "../types";
import {
  Download,
  Heart,
  RotateCcw,
  Sparkles,
  Sliders,
  Maximize2,
  Check,
  Copy,
  Eye,
  Share2,
  Layers,
  Wand2,
  RefreshCw,
} from "lucide-react";

interface ResultViewerProps {
  result: HeadshotResult;
  onSaveFavorite: (resultId: string) => void;
  onGenerateMore: () => void;
  onTouchUp: (resultId: string, instruction: string) => Promise<void>;
  isTouchingUp: boolean;
}

export const ResultViewer: React.FC<ResultViewerProps> = ({
  result,
  onSaveFavorite,
  onGenerateMore,
  onTouchUp,
  isTouchingUp,
}) => {
  const [sliderPosition, setSliderPosition] = useState(50); // 0 to 100%
  const [isDragging, setIsDragging] = useState(false);
  const [frameOverlay, setFrameOverlay] = useState<"none" | "circle" | "resume">("none");
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [copied, setCopied] = useState(false);
  const [touchupInput, setTouchupInput] = useState("");
  const sliderRef = useRef<HTMLDivElement | null>(null);

  // Split Slider Pointer Drag Logic
  const handlePointerMove = (e: React.PointerEvent) => {
    if (!isDragging || !sliderRef.current) return;
    const rect = sliderRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const percentage = Math.max(0, Math.min(100, (x / rect.width) * 100));
    setSliderPosition(percentage);
  };

  const handleDownload = () => {
    const link = document.createElement("a");
    link.href = result.generatedImageUrl;
    link.download = `AI-Headshot-${result.styleName.replace(/\s+/g, "-")}-${Date.now()}.png`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleCopy = async () => {
    try {
      // Copy URL or base64 to clipboard
      await navigator.clipboard.writeText(result.generatedImageUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Clipboard write error:", err);
    }
  };

  const handleQuickTouchup = (instruction: string) => {
    onTouchUp(result.id, instruction);
  };

  return (
    <div className="space-y-6">
      {/* Top Banner / Actions Bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
        <div>
          <span className="inline-block rounded-full bg-indigo-100 px-2.5 py-0.5 text-xs font-bold text-indigo-700 mb-1">
            Studio Result Ready
          </span>
          <h2 className="text-lg font-bold text-slate-900 sm:text-xl">
            {result.styleName} Headshot
          </h2>
          <p className="text-xs text-slate-500">
            {result.attireName} • {result.expressionName} • {result.framingRatio}
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <button
            onClick={() => onSaveFavorite(result.id)}
            className={`flex items-center gap-1.5 rounded-xl border px-3 py-2 text-xs font-semibold transition ${
              result.isFavorite
                ? "border-rose-300 bg-rose-50 text-rose-600 shadow-2xs"
                : "border-slate-200 bg-white text-slate-700 hover:bg-slate-50"
            }`}
          >
            <Heart
              className={`h-4 w-4 ${
                result.isFavorite ? "fill-rose-500 text-rose-500" : ""
              }`}
            />
            <span>{result.isFavorite ? "Saved" : "Save Favorite"}</span>
          </button>

          <button
            onClick={handleCopy}
            className="flex items-center gap-1.5 rounded-xl border border-slate-200 bg-white px-3 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-50 transition"
          >
            {copied ? <Check className="h-4 w-4 text-emerald-600" /> : <Copy className="h-4 w-4" />}
            <span>{copied ? "Copied!" : "Copy Image"}</span>
          </button>

          <button
            onClick={handleDownload}
            className="flex items-center gap-1.5 rounded-xl bg-indigo-600 px-4 py-2 text-xs font-bold text-white shadow-md hover:bg-indigo-500 transition"
          >
            <Download className="h-4 w-4" />
            <span>Download 1K PNG</span>
          </button>
        </div>
      </div>

      {/* Main Split-Screen Before & After Slider */}
      <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
        <div className="mb-3 flex items-center justify-between">
          <div className="flex items-center gap-2 text-xs font-bold text-slate-800">
            <Sliders className="h-4 w-4 text-indigo-600" /> Interactive Before / After Comparison
          </div>

          {/* Frame Preview Mode Toggle */}
          <div className="flex items-center gap-1 rounded-lg bg-slate-100 p-1 text-[11px] font-semibold text-slate-600">
            <span className="px-1 text-slate-400">View Overlay:</span>
            <button
              onClick={() => setFrameOverlay("none")}
              className={`rounded-md px-2 py-0.5 ${
                frameOverlay === "none" ? "bg-white text-slate-900 shadow-2xs" : "hover:text-slate-900"
              }`}
            >
              Full
            </button>
            <button
              onClick={() => setFrameOverlay("circle")}
              className={`rounded-md px-2 py-0.5 ${
                frameOverlay === "circle" ? "bg-white text-slate-900 shadow-2xs" : "hover:text-slate-900"
              }`}
            >
              LinkedIn Circle
            </button>
            <button
              onClick={() => setFrameOverlay("resume")}
              className={`rounded-md px-2 py-0.5 ${
                frameOverlay === "resume" ? "bg-white text-slate-900 shadow-2xs" : "hover:text-slate-900"
              }`}
            >
              Bio Card
            </button>
          </div>
        </div>

        {/* Interactive Image Box */}
        <div
          ref={sliderRef}
          onPointerDown={() => setIsDragging(true)}
          onPointerUp={() => setIsDragging(false)}
          onPointerLeave={() => setIsDragging(false)}
          onPointerMove={handlePointerMove}
          className="relative mx-auto aspect-square max-w-xl cursor-ew-resize select-none overflow-hidden rounded-xl border border-slate-300 bg-slate-950 shadow-inner"
        >
          {/* AFTER Image (Generated Studio Headshot) - Background */}
          <img
            src={result.generatedImageUrl}
            alt="AI Studio Headshot Result"
            referrerPolicy="no-referrer"
            className="absolute inset-0 h-full w-full object-cover"
          />

          {/* BEFORE Image (Original Casual Selfie) - Clipped Overlay */}
          <div
            className="absolute inset-y-0 left-0 overflow-hidden border-r-2 border-white shadow-[0_0_15px_rgba(0,0,0,0.5)]"
            style={{ width: `${sliderPosition}%` }}
          >
            <img
              src={result.originalSelfieUrl}
              alt="Original Casual Selfie"
              referrerPolicy="no-referrer"
              className="absolute inset-0 h-full w-full object-cover max-w-none"
              style={{
                width: sliderRef.current ? `${sliderRef.current.offsetWidth}px` : "100%",
                height: "100%",
              }}
            />
            {/* Before Badge */}
            <span className="absolute top-3 left-3 rounded-full bg-black/70 px-2.5 py-1 text-[10px] font-bold text-white backdrop-blur">
              Original Selfie
            </span>
          </div>

          {/* After Badge */}
          <span className="absolute top-3 right-3 rounded-full bg-indigo-600/90 px-2.5 py-1 text-[10px] font-bold text-white shadow backdrop-blur">
            Studio AI Headshot
          </span>

          {/* Slider Handle */}
          <div
            className="pointer-events-none absolute inset-y-0 flex items-center justify-center"
            style={{ left: `calc(${sliderPosition}% - 16px)` }}
          >
            <div className="flex h-8 w-8 items-center justify-center rounded-full border-2 border-white bg-slate-900 text-white shadow-xl">
              <Sliders className="h-4 w-4 rotate-90" />
            </div>
          </div>

          {/* Frame Overlays (LinkedIn / Resume) */}
          {frameOverlay === "circle" && (
            <div className="pointer-events-none absolute inset-0 flex items-center justify-center bg-black/60">
              <div className="h-64 w-64 rounded-full border-2 border-dashed border-white shadow-[0_0_0_9999px_rgba(0,0,0,0.6)]" />
              <span className="absolute bottom-4 rounded-full bg-slate-900/80 px-3 py-1 text-xs font-semibold text-white">
                LinkedIn Avatar Circle Guide
              </span>
            </div>
          )}

          {frameOverlay === "resume" && (
            <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
              <div className="h-[80%] w-[65%] rounded-lg border-2 border-amber-400 bg-transparent shadow-[0_0_0_9999px_rgba(0,0,0,0.5)]" />
              <span className="absolute bottom-4 rounded-full bg-slate-900/80 px-3 py-1 text-xs font-semibold text-white">
                PDF Resume / Biography Card Frame
              </span>
            </div>
          )}

          {/* Zoom Modal Button */}
          <button
            onClick={() => setIsFullscreen(true)}
            className="absolute bottom-3 right-3 rounded-lg bg-slate-900/80 p-2 text-white shadow hover:bg-slate-900 transition"
            title="Inspect High Res"
          >
            <Maximize2 className="h-4 w-4" />
          </button>
        </div>

        <p className="mt-2 text-center text-xs text-slate-500">
          👈 Drag slider left and right to compare original selfie vs AI studio headshot 👉
        </p>
      </div>

      {/* AI Touch-up & Refine Bar */}
      <div className="rounded-2xl border border-indigo-100 bg-gradient-to-br from-indigo-50/50 via-white to-purple-50/50 p-5 shadow-sm space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Wand2 className="h-5 w-5 text-indigo-600" />
            <h3 className="text-sm font-bold text-slate-900">
              Instant AI Touch-Up & Studio Refinements
            </h3>
          </div>
          {isTouchingUp && (
            <span className="flex items-center gap-1.5 text-xs font-semibold text-indigo-600">
              <RefreshCw className="h-3.5 w-3.5 animate-spin" /> Retouching...
            </span>
          )}
        </div>

        <p className="text-xs text-slate-600">
          Select a quick preset or type a custom adjustment instruction:
        </p>

        {/* Quick Touchup Chips */}
        <div className="flex flex-wrap gap-2">
          <button
            disabled={isTouchingUp}
            onClick={() => handleQuickTouchup("Soften background bokeh blur and increase subject isolation.")}
            className="rounded-xl border border-slate-200 bg-white px-3 py-1.5 text-xs font-semibold text-slate-700 shadow-2xs hover:border-indigo-300 hover:bg-indigo-50/50 transition disabled:opacity-50"
          >
            ✨ Soften Background Bokeh
          </button>

          <button
            disabled={isTouchingUp}
            onClick={() => handleQuickTouchup("Slightly warm up skin tone and add subtle studio catchlight in eyes.")}
            className="rounded-xl border border-slate-200 bg-white px-3 py-1.5 text-xs font-semibold text-slate-700 shadow-2xs hover:border-indigo-300 hover:bg-indigo-50/50 transition disabled:opacity-50"
          >
            💡 Warmer Studio Glow & Catchlight
          </button>

          <button
            disabled={isTouchingUp}
            onClick={() => handleQuickTouchup("Gently smooth skin textures while retaining natural facial details and sharpness.")}
            className="rounded-xl border border-slate-200 bg-white px-3 py-1.5 text-xs font-semibold text-slate-700 shadow-2xs hover:border-indigo-300 hover:bg-indigo-50/50 transition disabled:opacity-50"
          >
            🪞 Smooth Skin & Enhance Detail
          </button>

          <button
            disabled={isTouchingUp}
            onClick={() => handleQuickTouchup("Brighten teeth and sharpen eye contrast naturally.")}
            className="rounded-xl border border-slate-200 bg-white px-3 py-1.5 text-xs font-semibold text-slate-700 shadow-2xs hover:border-indigo-300 hover:bg-indigo-50/50 transition disabled:opacity-50"
          >
            😁 Brighten Smile & Eyes
          </button>
        </div>

        {/* Custom Touchup Input */}
        <div className="flex items-center gap-2 pt-1">
          <input
            type="text"
            value={touchupInput}
            onChange={(e) => setTouchupInput(e.target.value)}
            placeholder="Type custom adjustment (e.g., 'Change jacket color to charcoal grey')..."
            className="flex-1 rounded-xl border border-slate-200 bg-white px-3.5 py-2 text-xs text-slate-800 focus:border-indigo-500 focus:outline-hidden"
          />
          <button
            disabled={isTouchingUp || !touchupInput.trim()}
            onClick={() => {
              if (touchupInput.trim()) {
                handleQuickTouchup(touchupInput.trim());
                setTouchupInput("");
              }
            }}
            className="inline-flex items-center gap-1.5 rounded-xl bg-slate-900 px-4 py-2 text-xs font-bold text-white hover:bg-slate-800 disabled:opacity-50 transition"
          >
            <Sparkles className="h-3.5 w-3.5 text-amber-400" />
            <span>Apply Touchup</span>
          </button>
        </div>
      </div>

      {/* Fullscreen Inspection Modal */}
      {isFullscreen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4 backdrop-blur-md animate-fadeIn">
          <div className="relative max-h-[90vh] max-w-4xl overflow-hidden rounded-2xl bg-slate-900 p-2 shadow-2xl">
            <button
              onClick={() => setIsFullscreen(false)}
              className="absolute top-4 right-4 z-10 rounded-full bg-slate-800/80 p-2 text-white hover:bg-slate-700"
            >
              ✕
            </button>
            <img
              src={result.generatedImageUrl}
              alt="High Res Headshot"
              referrerPolicy="no-referrer"
              className="max-h-[85vh] w-auto max-w-full rounded-xl object-contain mx-auto"
            />
          </div>
        </div>
      )}
    </div>
  );
};
