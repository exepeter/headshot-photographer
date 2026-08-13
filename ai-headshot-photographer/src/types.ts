export type StyleCategory = "all" | "corporate" | "tech" | "outdoor" | "creative" | "minimalist";

export interface HeadshotStyle {
  id: string;
  name: string;
  category: StyleCategory;
  badge?: string;
  description: string;
  stylePrompt: string;
  previewGradient: string;
  previewImage?: string;
  defaultAttire: string;
  defaultLighting: string;
}

export interface AttireOption {
  id: string;
  name: string;
  category: "formal" | "smart_casual" | "creative" | "specialized";
  description: string;
  prompt: string;
}

export interface ExpressionOption {
  id: string;
  name: string;
  description: string;
  prompt: string;
}

export interface LightingOption {
  id: string;
  name: string;
  description: string;
  prompt: string;
}

export interface FramingOption {
  id: string;
  name: string;
  ratio: "1:1" | "3:4" | "4:3";
  description: string;
  prompt: string;
}

export interface HeadshotResult {
  id: string;
  originalSelfieUrl: string;
  generatedImageUrl: string;
  styleName: string;
  attireName: string;
  expressionName: string;
  lightingName: string;
  framingRatio: "1:1" | "3:4" | "4:3";
  createdAt: string;
  isFavorite: boolean;
  touchUpHistory?: string[];
  promptDetails?: string;
}

export interface SelfieAnalysis {
  lightingRating: "Excellent" | "Good" | "Needs Improvement";
  lightingTip: string;
  poseRating: "Excellent" | "Good" | "Needs Improvement";
  poseTip: string;
  recommendedStyles: string[];
  summary: string;
}

export interface SampleSelfie {
  id: string;
  name: string;
  tag: string;
  dataUrl: string;
}
