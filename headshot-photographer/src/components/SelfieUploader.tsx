import React, { useState, useRef } from "react";
import {
  Upload,
  Camera,
  Image as ImageIcon,
  Sparkles,
  CheckCircle,
  RefreshCw,
  X,
  ScanFace,
  Info,
  ChevronRight,
  AlertTriangle,
} from "lucide-react";
import { SAMPLE_SELFIES } from "../data/styles";
import { SelfieAnalysis, SampleSelfie } from "../types";

interface SelfieUploaderProps {
  currentSelfieUrl: string | null;
  onSelectSelfie: (dataUrl: string) => void;
  analysis: SelfieAnalysis | null;
  isAnalyzing: boolean;
  onAnalyzeSelfie: () => void;
}

export const SelfieUploader: React.FC<SelfieUploaderProps> = ({
  currentSelfieUrl,
  onSelectSelfie,
  analysis,
  isAnalyzing,
  onAnalyzeSelfie,
}) => {
  const [isCameraActive, setIsCameraActive] = useState(false);
  const [cameraError, setCameraError] = useState<string | null>(null);
  const [showFaceOverlay, setShowFaceOverlay] = useState(true);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  // File Upload Handler
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (!file.type.startsWith("image/")) {
        alert("Please select a valid image file (JPEG, PNG, WEBP).");
        return;
      }
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target?.result) {
          onSelectSelfie(event.target.result as string);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  // Drag and drop handlers
  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const file = e.dataTransfer.files?.[0];
    if (file && file.type.startsWith("image/")) {
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target?.result) {
          onSelectSelfie(event.target.result as string);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  // Webcam Capture Handlers
  const startCamera = async () => {
    setCameraError(null);
    setIsCameraActive(true);
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { width: { ideal: 1280 }, height: { ideal: 1280 }, facingMode: "user" },
      });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        videoRef.current.play();
      }
    } catch (err: any) {
      console.error("Camera access error:", err);
      setCameraError("Camera permission denied or camera not found. Please upload a file instead.");
    }
  };

  const stopCamera = () => {
    if (videoRef.current && videoRef.current.srcObject) {
      const stream = videoRef.current.srcObject as MediaStream;
      stream.getTracks().forEach((track) => track.stop());
      videoRef.current.srcObject = null;
    }
    setIsCameraActive(false);
  };

  const captureCameraPhoto = () => {
    if (!videoRef.current) return;
    const canvas = document.createElement("canvas");
    canvas.width = videoRef.current.videoWidth || 800;
    canvas.height = videoRef.current.videoHeight || 800;
    const ctx = canvas.getContext("2d");
    if (ctx) {
      ctx.drawImage(videoRef.current, 0, 0, canvas.width, canvas.height);
      const dataUrl = canvas.toDataURL("image/jpeg", 0.92);
      onSelectSelfie(dataUrl);
      stopCamera();
    }
  };

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
      <div className="mb-4 flex items-center justify-between">
        <div>
          <h2 className="text-base font-bold text-slate-900 sm:text-lg flex items-center gap-2">
            <ScanFace className="h-5 w-5 text-indigo-600" /> Step 1: Upload Casual Selfie
          </h2>
          <p className="text-xs text-slate-500">
            Front-facing photo with natural lighting works best
          </p>
        </div>
        {currentSelfieUrl && (
          <button
            onClick={() => fileInputRef.current?.click()}
            className="flex items-center gap-1.5 rounded-lg border border-slate-200 bg-slate-50 px-2.5 py-1 text-xs font-semibold text-slate-700 hover:bg-slate-100"
          >
            <RefreshCw className="h-3.5 w-3.5" />
            <span>Change Photo</span>
          </button>
        )}
      </div>

      <input
        ref={fileInputRef}
        type="file"
        accept="image/jpeg,image/png,image/webp"
        onChange={handleFileChange}
        className="hidden"
      />

      {/* Main Upload / Camera / Preview Area */}
      {!currentSelfieUrl && !isCameraActive && (
        <div
          onDragOver={(e) => e.preventDefault()}
          onDrop={handleDrop}
          onClick={() => fileInputRef.current?.click()}
          className="group relative flex cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed border-slate-300 bg-slate-50/70 py-10 px-6 text-center transition-all hover:border-indigo-500 hover:bg-indigo-50/30"
        >
          <div className="mb-3 flex h-14 w-14 items-center justify-center rounded-2xl bg-white shadow-sm ring-1 ring-slate-200 group-hover:scale-105 transition-transform">
            <Upload className="h-7 w-7 text-indigo-600" />
          </div>
          <h3 className="text-sm font-semibold text-slate-800">
            Drag and drop your selfie here, or <span className="text-indigo-600 underline">browse</span>
          </h3>
          <p className="mt-1 text-xs text-slate-500">
            Supports JPG, PNG, WEBP (Max 15MB)
          </p>

          <div className="mt-4 flex flex-wrap items-center justify-center gap-2">
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                startCamera();
              }}
              className="inline-flex items-center gap-1.5 rounded-lg bg-slate-900 px-3 py-1.5 text-xs font-semibold text-white shadow-sm hover:bg-slate-800"
            >
              <Camera className="h-3.5 w-3.5" />
              <span>Take Live Camera Selfie</span>
            </button>
          </div>
        </div>
      )}

      {/* Camera Live View Modal / Embed */}
      {isCameraActive && (
        <div className="relative overflow-hidden rounded-xl border border-slate-900 bg-black p-2 shadow-inner">
          <div className="relative aspect-square w-full max-w-md mx-auto overflow-hidden rounded-lg bg-slate-950">
            <video
              ref={videoRef}
              autoPlay
              playsInline
              className="h-full w-full object-cover scale-x-[-1]"
            />
            {/* Guide overlay */}
            {showFaceOverlay && (
              <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
                <div className="h-64 w-48 rounded-[50%] border-2 border-dashed border-indigo-400/80 bg-indigo-500/10 shadow-[0_0_20px_rgba(99,102,241,0.3)]">
                  <div className="mt-6 text-center text-xs font-medium text-white/90 drop-shadow">
                    Align Face Here
                  </div>
                </div>
              </div>
            )}
          </div>

          {cameraError ? (
            <div className="mt-2 rounded-lg bg-red-900/80 p-3 text-xs text-red-200">
              {cameraError}
            </div>
          ) : (
            <div className="mt-3 flex items-center justify-between px-2">
              <button
                type="button"
                onClick={() => setShowFaceOverlay(!showFaceOverlay)}
                className="text-xs text-slate-400 hover:text-white"
              >
                {showFaceOverlay ? "Hide Face Guide" : "Show Face Guide"}
              </button>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={stopCamera}
                  className="rounded-lg bg-slate-800 px-3 py-1.5 text-xs font-semibold text-slate-300 hover:bg-slate-700"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={captureCameraPhoto}
                  className="inline-flex items-center gap-1.5 rounded-lg bg-indigo-600 px-4 py-1.5 text-xs font-bold text-white shadow hover:bg-indigo-500"
                >
                  <Camera className="h-4 w-4" />
                  <span>Snap Photo</span>
                </button>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Selected Photo Preview */}
      {currentSelfieUrl && !isCameraActive && (
        <div className="space-y-4">
          <div className="relative overflow-hidden rounded-xl border border-slate-200 bg-slate-900/5 p-2">
            <div className="relative mx-auto aspect-square w-full max-w-xs overflow-hidden rounded-lg bg-slate-100 shadow-inner">
              <img
                src={currentSelfieUrl}
                alt="Your casual selfie"
                referrerPolicy="no-referrer"
                className="h-full w-full object-cover"
              />
              {/* Optional Alignment Frame */}
              <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
                <div className="h-48 w-36 rounded-[50%] border border-white/40 bg-white/5 ring-1 ring-black/10" />
              </div>
              <div className="absolute top-2 left-2 rounded-full bg-slate-900/70 px-2.5 py-1 text-[10px] font-semibold text-white backdrop-blur">
                Subject Identified
              </div>
            </div>
          </div>

          {/* AI Quality Check Trigger */}
          <div className="rounded-xl border border-indigo-100 bg-gradient-to-r from-indigo-50/80 via-white to-purple-50/80 p-3 shadow-2xs">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Sparkles className="h-4 w-4 text-indigo-600" />
                <span className="text-xs font-bold text-slate-800">
                  AI Photo Doctor
                </span>
              </div>
              <button
                onClick={onAnalyzeSelfie}
                disabled={isAnalyzing}
                className="inline-flex items-center gap-1.5 rounded-lg bg-indigo-600 px-3 py-1 text-xs font-semibold text-white shadow-xs transition hover:bg-indigo-500 disabled:opacity-50"
              >
                {isAnalyzing ? (
                  <>
                    <RefreshCw className="h-3 w-3 animate-spin" />
                    <span>Analyzing...</span>
                  </>
                ) : (
                  <>
                    <Sparkles className="h-3 w-3" />
                    <span>Analyze Quality</span>
                  </>
                )}
              </button>
            </div>

            {/* Analysis Results Card */}
            {analysis && (
              <div className="mt-3 space-y-2 rounded-lg bg-white p-3 text-xs border border-indigo-100 shadow-2xs">
                <div className="font-semibold text-slate-900">
                  {analysis.summary}
                </div>
                <div className="grid grid-cols-2 gap-2 pt-1">
                  <div className="rounded-md bg-slate-50 p-2 border border-slate-100">
                    <div className="font-bold text-slate-700 flex items-center gap-1">
                      Lighting: <span className="text-indigo-600">{analysis.lightingRating}</span>
                    </div>
                    <p className="mt-0.5 text-[11px] text-slate-500">{analysis.lightingTip}</p>
                  </div>
                  <div className="rounded-md bg-slate-50 p-2 border border-slate-100">
                    <div className="font-bold text-slate-700 flex items-center gap-1">
                      Posture/Angle: <span className="text-indigo-600">{analysis.poseRating}</span>
                    </div>
                    <p className="mt-0.5 text-[11px] text-slate-500">{analysis.poseTip}</p>
                  </div>
                </div>
                {analysis.recommendedStyles?.length > 0 && (
                  <div className="text-[11px] text-slate-600 pt-1">
                    <span className="font-semibold text-indigo-700">Recommended Styles: </span>
                    {analysis.recommendedStyles.join(", ")}
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      )}

      {/* Quick Sample Selfie Chips */}
      <div className="mt-4 border-t border-slate-100 pt-3">
        <div className="mb-2 flex items-center justify-between text-xs">
          <span className="font-semibold text-slate-600">Or try a instant test sample photo:</span>
        </div>
        <div className="flex flex-wrap gap-2">
          {SAMPLE_SELFIES.map((sample) => (
            <button
              key={sample.id}
              onClick={() => onSelectSelfie(sample.dataUrl)}
              className="group flex items-center gap-2 rounded-xl border border-slate-200 bg-slate-50 p-1.5 text-left transition hover:border-indigo-300 hover:bg-indigo-50/50"
            >
              <img
                src={sample.dataUrl}
                alt={sample.name}
                referrerPolicy="no-referrer"
                className="h-8 w-8 rounded-lg object-cover ring-1 ring-slate-200"
              />
              <div className="pr-1">
                <div className="text-xs font-semibold text-slate-800 group-hover:text-indigo-600">
                  {sample.name}
                </div>
                <div className="text-[10px] text-slate-500">{sample.tag}</div>
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};
