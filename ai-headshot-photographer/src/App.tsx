import React, { useState, useEffect } from "react";
import { Navbar } from "./components/Navbar";
import { SelfieUploader } from "./components/SelfieUploader";
import { StyleSelector } from "./components/StyleSelector";
import { CustomizerPanel } from "./components/CustomizerPanel";
import { GenerationProgressModal } from "./components/GenerationProgressModal";
import { ResultViewer } from "./components/ResultViewer";
import { HistoryGallery } from "./components/HistoryGallery";
import { PhotoTipsModal } from "./components/PhotoTipsModal";

import {
  HEADSHOT_STYLES,
  ATTIRE_OPTIONS,
  EXPRESSION_OPTIONS,
  LIGHTING_OPTIONS,
  FRAMING_OPTIONS,
  SAMPLE_SELFIES,
} from "./data/styles";

import {
  HeadshotStyle,
  AttireOption,
  ExpressionOption,
  LightingOption,
  FramingOption,
  HeadshotResult,
  SelfieAnalysis,
} from "./types";

import {
  Sparkles,
  Camera,
  AlertCircle,
  ArrowRight,
  RotateCcw,
  Sliders,
  CheckCircle2,
} from "lucide-react";

const STORAGE_KEY = "studio_ai_headshots_history_v1";

export default function App() {
  const [activeTab, setActiveTab] = useState<"generator" | "gallery" | "guide">("generator");
  const [hasApiKey, setHasApiKey] = useState(true);

  // Studio Workflow State
  const [currentSelfieUrl, setCurrentSelfieUrl] = useState<string | null>(
    SAMPLE_SELFIES[0].dataUrl
  );
  const [selectedStyle, setSelectedStyle] = useState<HeadshotStyle>(HEADSHOT_STYLES[0]);
  const [selectedAttire, setSelectedAttire] = useState<AttireOption>(ATTIRE_OPTIONS[0]);
  const [selectedExpression, setSelectedExpression] = useState<ExpressionOption>(
    EXPRESSION_OPTIONS[0]
  );
  const [selectedLighting, setSelectedLighting] = useState<LightingOption>(
    LIGHTING_OPTIONS[0]
  );
  const [selectedFraming, setSelectedFraming] = useState<FramingOption>(
    FRAMING_OPTIONS[0]
  );
  const [promptDetails, setPromptDetails] = useState("");
  const [variationCount, setVariationCount] = useState(1);

  // Generation & Results
  const [isGenerating, setIsGenerating] = useState(false);
  const [generationError, setGenerationError] = useState<string | null>(null);
  const [activeResult, setActiveResult] = useState<HeadshotResult | null>(null);
  const [resultsHistory, setResultsHistory] = useState<HeadshotResult[]>([]);

  // Selfie Quality Analysis State
  const [analysis, setAnalysis] = useState<SelfieAnalysis | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [isTouchingUp, setIsTouchingUp] = useState(false);

  // Load History from localStorage on mount & check API key health
  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed) && parsed.length > 0) {
          setResultsHistory(parsed);
          setActiveResult(parsed[0]);
        }
      }
    } catch (e) {
      console.error("Failed to load stored history:", e);
    }

    // Health Check
    fetch("/api/health")
      .then((res) => res.json())
      .then((data) => {
        if (typeof data.hasApiKey === "boolean") {
          setHasApiKey(data.hasApiKey);
        }
      })
      .catch(() => setHasApiKey(true));
  }, []);

  // Save History helper
  const saveHistoryToStorage = (updated: HeadshotResult[]) => {
    setResultsHistory(updated);
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    } catch (e) {
      console.error("Failed to save to localStorage:", e);
    }
  };

  // When user changes style, automatically adjust defaults to match style
  const handleSelectStyle = (style: HeadshotStyle) => {
    setSelectedStyle(style);
    const matchedAttire = ATTIRE_OPTIONS.find((a) => a.id === style.defaultAttire);
    if (matchedAttire) setSelectedAttire(matchedAttire);
    const matchedLighting = LIGHTING_OPTIONS.find((l) => l.id === style.defaultLighting);
    if (matchedLighting) setSelectedLighting(matchedLighting);
  };

  // Analyze Selfie Quality
  const handleAnalyzeSelfie = async () => {
    if (!currentSelfieUrl) return;
    setIsAnalyzing(true);
    setAnalysis(null);
    try {
      const res = await fetch("/api/analyze-selfie", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ imageBase64: currentSelfieUrl }),
      });
      const data = await res.json();
      if (data.success && data.analysis) {
        setAnalysis(data.analysis);
      } else {
        alert(data.error || "Failed to analyze photo quality.");
      }
    } catch (err: any) {
      console.error("Analysis Error:", err);
    } finally {
      setIsAnalyzing(false);
    }
  };

  // Generate Headshot Handler
  const handleGenerateHeadshot = async () => {
    if (!currentSelfieUrl) {
      alert("Please upload a casual selfie or select a sample photo first.");
      return;
    }

    setIsGenerating(true);
    setGenerationError(null);

    try {
      const response = await fetch("/api/generate-headshot", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          imageBase64: currentSelfieUrl,
          styleName: selectedStyle.name,
          stylePrompt: selectedStyle.stylePrompt,
          attire: selectedAttire.prompt,
          expression: selectedExpression.prompt,
          lighting: selectedLighting.prompt,
          framing: selectedFraming.prompt,
          aspectRatio: selectedFraming.ratio,
          promptDetails: promptDetails,
          count: variationCount,
        }),
      });

      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(data.error || "Failed to generate headshot.");
      }

      const createdResults: HeadshotResult[] = data.images.map(
        (imgDataUrl: string, idx: number) => ({
          id: `res_${Date.now()}_${idx}`,
          originalSelfieUrl: currentSelfieUrl,
          generatedImageUrl: imgDataUrl,
          styleName: selectedStyle.name,
          attireName: selectedAttire.name,
          expressionName: selectedExpression.name,
          lightingName: selectedLighting.name,
          framingRatio: selectedFraming.ratio,
          createdAt: new Date().toLocaleDateString(),
          isFavorite: false,
          promptDetails: promptDetails,
        })
      );

      const newHistory = [...createdResults, ...resultsHistory];
      saveHistoryToStorage(newHistory);
      setActiveResult(createdResults[0]);

      // Smooth scroll up to result viewer
      window.scrollTo({ top: 0, behavior: "smooth" });
    } catch (err: any) {
      console.error("Generation Error:", err);
      setGenerationError(err.message || "Failed to generate headshot. Please try again.");
    } finally {
      setIsGenerating(false);
    }
  };

  // Touch Up Handler
  const handleTouchUp = async (resultId: string, instruction: string) => {
    if (!activeResult) return;
    setIsTouchingUp(true);
    try {
      const response = await fetch("/api/touchup-headshot", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          headshotBase64: activeResult.generatedImageUrl,
          instruction,
        }),
      });

      const data = await response.json();
      if (data.success && data.image) {
        const updatedResult: HeadshotResult = {
          ...activeResult,
          id: `touchup_${Date.now()}`,
          generatedImageUrl: data.image,
          touchUpHistory: [...(activeResult.touchUpHistory || []), instruction],
        };

        const newHistory = [updatedResult, ...resultsHistory];
        saveHistoryToStorage(newHistory);
        setActiveResult(updatedResult);
      } else {
        alert(data.error || "Failed to apply touchup.");
      }
    } catch (err: any) {
      console.error("Touchup Exception:", err);
      alert("Error applying touchup adjustment.");
    } finally {
      setIsTouchingUp(false);
    }
  };

  // Toggle Favorite
  const handleToggleFavorite = (id: string) => {
    const updated = resultsHistory.map((item) =>
      item.id === id ? { ...item, isFavorite: !item.isFavorite } : item
    );
    saveHistoryToStorage(updated);
    if (activeResult && activeResult.id === id) {
      setActiveResult({ ...activeResult, isFavorite: !activeResult.isFavorite });
    }
  };

  // Delete Result
  const handleDeleteResult = (id: string) => {
    const updated = resultsHistory.filter((item) => item.id !== id);
    saveHistoryToStorage(updated);
    if (activeResult && activeResult.id === id) {
      setActiveResult(updated[0] || null);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50/60 font-sans text-slate-900 antialiased selection:bg-indigo-500 selection:text-white">
      {/* Top Navbar */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        savedCount={resultsHistory.length}
        hasApiKey={hasApiKey}
      />

      {/* Main Container */}
      <main className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:py-8">
        {/* Active Tab: STUDIO GENERATOR */}
        {activeTab === "generator" && (
          <div className="space-y-8">
            {/* Display Active Generated Result Viewer if available */}
            {activeResult && (
              <div className="animate-fadeIn">
                <ResultViewer
                  result={activeResult}
                  onSaveFavorite={handleToggleFavorite}
                  onGenerateMore={() => {
                    window.scrollTo({ top: 600, behavior: "smooth" });
                  }}
                  onTouchUp={handleTouchUp}
                  isTouchingUp={isTouchingUp}
                />
              </div>
            )}

            {/* Error Banner */}
            {generationError && (
              <div className="rounded-2xl border border-red-200 bg-red-50 p-4 text-red-800 flex items-start gap-3 shadow-sm">
                <AlertCircle className="h-5 w-5 text-red-600 shrink-0 mt-0.5" />
                <div className="flex-1 text-xs">
                  <strong className="font-bold text-red-900">Generation Failed: </strong>
                  {generationError}
                </div>
                <button
                  onClick={() => setGenerationError(null)}
                  className="text-red-600 hover:text-red-900 text-xs font-bold"
                >
                  Dismiss
                </button>
              </div>
            )}

            {/* Studio Studio Form Grid */}
            <div className="space-y-6">
              {/* Step 1: Selfie Upload */}
              <SelfieUploader
                currentSelfieUrl={currentSelfieUrl}
                onSelectSelfie={(url) => {
                  setCurrentSelfieUrl(url);
                  setAnalysis(null);
                }}
                analysis={analysis}
                isAnalyzing={isAnalyzing}
                onAnalyzeSelfie={handleAnalyzeSelfie}
              />

              {/* Step 2: Choose Studio Style */}
              <StyleSelector
                selectedStyle={selectedStyle}
                onSelectStyle={handleSelectStyle}
              />

              {/* Step 3: Wardrobe & Portrait Controls */}
              <CustomizerPanel
                selectedAttire={selectedAttire}
                onSelectAttire={setSelectedAttire}
                selectedExpression={selectedExpression}
                onSelectExpression={setSelectedExpression}
                selectedLighting={selectedLighting}
                onSelectLighting={setSelectedLighting}
                selectedFraming={selectedFraming}
                onSelectFraming={setSelectedFraming}
                promptDetails={promptDetails}
                setPromptDetails={setPromptDetails}
                variationCount={variationCount}
                setVariationCount={setVariationCount}
              />

              {/* Sticky / Big Action Bar: GENERATE HEADSHOT */}
              <div className="sticky bottom-4 z-30 rounded-2xl border border-slate-800 bg-slate-900 p-4 text-white shadow-xl backdrop-blur-md">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gradient-to-tr from-amber-400 to-indigo-500 text-slate-950 font-black">
                      <Sparkles className="h-5 w-5" />
                    </div>
                    <div>
                      <div className="text-sm font-bold">
                        Ready to develop {variationCount} studio headshot{variationCount > 1 ? "s" : ""}
                      </div>
                      <div className="text-xs text-slate-400">
                        Style: <span className="text-indigo-300 font-semibold">{selectedStyle.name}</span> • Attire: <span className="text-indigo-300 font-semibold">{selectedAttire.name}</span>
                      </div>
                    </div>
                  </div>

                  <button
                    onClick={handleGenerateHeadshot}
                    disabled={isGenerating || !currentSelfieUrl}
                    className="inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-indigo-500 via-indigo-600 to-purple-600 px-6 py-3.5 text-sm font-extrabold text-white shadow-lg transition-all hover:scale-[1.02] hover:shadow-indigo-500/25 active:scale-95 disabled:opacity-50 disabled:pointer-events-none"
                  >
                    <Sparkles className="h-4 w-4 text-amber-300 animate-spin-slow" />
                    <span>Generate AI Headshots</span>
                    <ArrowRight className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Active Tab: SAVED GALLERY */}
        {activeTab === "gallery" && (
          <HistoryGallery
            results={resultsHistory}
            onToggleFavorite={handleToggleFavorite}
            onDeleteResult={handleDeleteResult}
            onSelectResultToView={(res) => {
              setActiveResult(res);
              setActiveTab("generator");
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
          />
        )}

        {/* Active Tab: SELFIE GUIDE */}
        {activeTab === "guide" && <PhotoTipsModal />}

        {/* Loading Modal Overlay */}
        {isGenerating && (
          <GenerationProgressModal styleName={selectedStyle.name} />
        )}
      </main>

      {/* Footer */}
      <footer className="mt-12 border-t border-slate-200 bg-white py-6 text-center text-xs text-slate-500">
        <div className="mx-auto max-w-7xl px-4 flex flex-col sm:flex-row items-center justify-between gap-2">
          <div className="flex items-center gap-2 font-semibold text-slate-700">
            <Camera className="h-4 w-4 text-indigo-600" />
            <span>StudioAI Headshots • Executive Studio Photographer</span>
          </div>
          <p className="text-slate-500">
            Powered by Gemini AI • Photorealistic likeness preservation
          </p>
        </div>
      </footer>
    </div>
  );
}
