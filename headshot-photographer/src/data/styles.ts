import {
  HeadshotStyle,
  AttireOption,
  ExpressionOption,
  LightingOption,
  FramingOption,
  SampleSelfie,
} from "../types";

export const HEADSHOT_STYLES: HeadshotStyle[] = [
  {
    id: "corporate_grey",
    name: "Corporate Grey Studio",
    category: "corporate",
    badge: "Popular for LinkedIn",
    description: "Classic textured dark charcoal studio backdrop with balanced soft studio lighting.",
    stylePrompt: "Professional studio with dark textured charcoal grey backdrop, subtle gradient vignette, sharp focus, 85mm lens portrait bokeh.",
    previewGradient: "from-slate-700 via-slate-800 to-slate-900",
    defaultAttire: "attire_navy_suit",
    defaultLighting: "lighting_butterfly",
  },
  {
    id: "tech_office",
    name: "Modern Tech Office",
    category: "tech",
    badge: "Startup & Tech",
    description: "Contemporary open-plan office interior with warm ambient glass walls and foliage bokeh.",
    stylePrompt: "Bright modern tech company headquarters interior background, warm architectural timber & glass partitions out of focus, soft daylight.",
    previewGradient: "from-sky-800 via-indigo-900 to-slate-900",
    defaultAttire: "attire_blazer_crew",
    defaultLighting: "lighting_diffuse",
  },
  {
    id: "outdoor_natural",
    name: "Outdoor Natural Light",
    category: "outdoor",
    badge: "Warm & Open",
    description: "Golden hour sunlight with blurred natural park trees and architectural stone backdrop.",
    stylePrompt: "Outdoors during golden hour sunset, soft sun lens flare in upper corner, lush greenery and warm sandstone architecture background out of focus.",
    previewGradient: "from-amber-700 via-orange-800 to-slate-900",
    defaultAttire: "attire_cashmere_knit",
    defaultLighting: "lighting_golden_hour",
  },
  {
    id: "executive_skyline",
    name: "Executive Skyline Glass",
    category: "corporate",
    badge: "Executive Bio",
    description: "High-rise office overlooking city skyline behind floor-to-ceiling glass windows.",
    stylePrompt: "Executive boardroom glass window background with blurred metropolitan city skyscrapers skyline, soft natural fill lighting.",
    previewGradient: "from-blue-900 via-slate-800 to-cyan-950",
    defaultAttire: "attire_charcoal_suit",
    defaultLighting: "lighting_butterfly",
  },
  {
    id: "creative_amber",
    name: "Creative Dark Amber Studio",
    category: "creative",
    badge: "Design & Arts",
    description: "Moody designer studio with warm spotlighting, deep shadows, and artistic ambiance.",
    stylePrompt: "Moody artist photo studio, warm warm amber rim light, deep dark chocolate gradient backdrop, dramatic chiaroscuro aesthetic.",
    previewGradient: "from-amber-900 via-neutral-900 to-black",
    defaultAttire: "attire_leather_jacket",
    defaultLighting: "lighting_rembrandt",
  },
  {
    id: "minimalist_white",
    name: "Minimalist Gallery White",
    category: "minimalist",
    badge: "Clean & Crisp",
    description: "Pure off-white architectural gallery wall with soft natural shadow falloff.",
    stylePrompt: "Clean bright off-white studio wall backdrop, soft diffused daylight shadow, high contrast crisp portrait photography.",
    previewGradient: "from-slate-200 via-stone-300 to-slate-400",
    defaultAttire: "attire_white_shirt",
    defaultLighting: "lighting_diffuse",
  },
  {
    id: "monochrome_noir",
    name: "Monochrome Noir Studio",
    category: "creative",
    badge: "Editorial B&W",
    description: "High-contrast dramatic black-and-white executive portrait photography.",
    stylePrompt: "Black and white monochrome professional editorial studio portrait, rich contrast tones, velvety shadows, razor-sharp focus.",
    previewGradient: "from-zinc-900 via-neutral-950 to-black",
    defaultAttire: "attire_navy_suit",
    defaultLighting: "lighting_rembrandt",
  },
  {
    id: "medical_academic",
    name: "Medical & Academic Bright",
    category: "corporate",
    badge: "Healthcare & Higher Ed",
    description: "Crisp bright neutral background with welcoming, highly trustworthy studio lighting.",
    stylePrompt: "Bright clean healthcare clinic or university library background, soft neutral tint, welcoming clear shadowless studio illumination.",
    previewGradient: "from-teal-800 via-cyan-900 to-slate-900",
    defaultAttire: "attire_white_lab_coat",
    defaultLighting: "lighting_diffuse",
  },
];

export const ATTIRE_OPTIONS: AttireOption[] = [
  {
    id: "attire_navy_suit",
    name: "Navy Suit & Crisp White Shirt",
    category: "formal",
    description: "Tailored Italian navy blue wool blazer with crisp white collared dress shirt.",
    prompt: "Tailored dark navy blue wool suit jacket, crisp pressed white dress shirt, modern professional collar, executive styling.",
  },
  {
    id: "attire_charcoal_suit",
    name: "Charcoal Grey Suit & Silk Tie",
    category: "formal",
    description: "Classic charcoal grey tailored suit jacket with neat silk tie and pocket square.",
    prompt: "Tailored charcoal grey suit jacket, crisp white shirt, subtle dark silk tie, executive boardroom attire.",
  },
  {
    id: "attire_blazer_crew",
    name: "Modern Black Blazer & Crewneck",
    category: "smart_casual",
    description: "Sleek tailored black blazer over a high-quality matte crewneck shirt.",
    prompt: "Sharp black structured blazer worn over a high-quality fitted dark crewneck shirt, modern tech founder aesthetic.",
  },
  {
    id: "attire_silk_blouse",
    name: "Executive Silk Blouse & Blazer",
    category: "formal",
    description: "Elegant cream silk blouse paired with a tailored dark blazer.",
    prompt: "Tailored dark blazer paired with an elegant ivory cream silk drape blouse, sophisticated executive jewelry accents.",
  },
  {
    id: "attire_cashmere_knit",
    name: "Cashmere Sweater & Shirt",
    category: "smart_casual",
    description: "Refined charcoal cashmere crewneck sweater layered over a collared shirt.",
    prompt: "Refined dark charcoal grey cashmere crewneck sweater layered over a neat collared shirt, warm approachable professional look.",
  },
  {
    id: "attire_white_shirt",
    name: "Crisp Fitted Oxford Shirt",
    category: "smart_casual",
    description: "Immaculately ironed light blue or white oxford button-down shirt.",
    prompt: "Immaculate fitted white cotton oxford dress shirt with buttoned collar, clean minimal professional appearance.",
  },
  {
    id: "attire_white_lab_coat",
    name: "Medical Lab Coat / Scrubs",
    category: "specialized",
    description: "Clean professional medical white coat over medical scrubs or shirt.",
    prompt: "Crisp white medical lab coat worn over clean navy blue medical scrubs, professional healthcare practitioner appearance.",
  },
  {
    id: "attire_leather_jacket",
    name: "Tailored Leather Jacket & Dark Tee",
    category: "creative",
    description: "Premium matte black leather jacket for creative directors and artists.",
    prompt: "Sleek fitted black leather jacket over a clean dark shirt, creative studio director aesthetic.",
  },
];

export const EXPRESSION_OPTIONS: ExpressionOption[] = [
  {
    id: "expr_confident_smile",
    name: "Confident Warm Smile",
    description: "Natural, engaging smile showing teeth, approachable and trustworthy.",
    prompt: "Warm, confident smile with eyes slightly crinkling with genuine friendliness, direct eye contact with camera.",
  },
  {
    id: "expr_approachable",
    name: "Soft Pleasant Smile",
    description: "Gentle closed-mouth smile, relaxed facial muscles, friendly expression.",
    prompt: "Soft relaxed pleasant smile with closed lips, warm intelligent eyes, approachable posture.",
  },
  {
    id: "expr_executive_serious",
    name: "Executive Focus",
    description: "Composed, serious, determined executive look with direct eye contact.",
    prompt: "Composed, serious executive focus, relaxed jawline, direct confident eye contact, authoritative look.",
  },
  {
    id: "expr_thoughtful",
    name: "Thoughtful & Creative",
    description: "Intelligent, slightly angled head turn with an inquisitive light smile.",
    prompt: "Thoughtful, intelligent expression, slight head tilt, gentle engaging smile, visionary presence.",
  },
];

export const LIGHTING_OPTIONS: LightingOption[] = [
  {
    id: "lighting_butterfly",
    name: "Soft Studio Butterfly",
    description: "Classic key light directly above camera for beautiful cheekbone highlights.",
    prompt: "Classic studio 3-point butterfly lighting, soft key light overhead casting soft shadow beneath nose, rim lighting separating subject from background.",
  },
  {
    id: "lighting_golden_hour",
    name: "Warm Golden Hour",
    description: "Warm sunlit glow on face with gentle rim light.",
    prompt: "Warm golden hour natural light, soft amber glow on skin, gentle rim sunlight on hair.",
  },
  {
    id: "lighting_rembrandt",
    name: "Dramatic Rembrandt",
    description: "Atmospheric side key light casting a subtle triangle shadow on cheek.",
    prompt: "Dramatic Rembrandt studio lighting, subtle light triangle on shadowed cheek, rich moody depth.",
  },
  {
    id: "lighting_diffuse",
    name: "Soft Diffused Softbox",
    description: "Even, shadow-free illumination that flatters skin textures.",
    prompt: "Large octabox diffused soft lighting, smooth skin texture highlights, even flattering illumination.",
  },
];

export const FRAMING_OPTIONS: FramingOption[] = [
  {
    id: "framing_1_1",
    name: "Square Portrait (1:1)",
    ratio: "1:1",
    description: "Ideal for LinkedIn, Slack, Zoom, and social media avatars.",
    prompt: "Centered bust and shoulder professional headshot portrait cropped to square 1:1 ratio.",
  },
  {
    id: "framing_3_4",
    name: "Vertical Portrait (3:4)",
    ratio: "3:4",
    description: "Best for Resumes, company team bios, and press kits.",
    prompt: "Vertical chest-up corporate bio portrait, generous head clearance, cropped in 3:4 aspect ratio.",
  },
  {
    id: "framing_4_3",
    name: "Landscape Banner (4:3)",
    ratio: "4:3",
    description: "Great for website headers, keynote speaker slides, and banners.",
    prompt: "Horizontal wide chest-up portrait with subject offset slightly according to rule of thirds in 4:3 aspect ratio.",
  },
];

// Sample Selfies for immediate testing (Data URLs using SVG canvases)
export const SAMPLE_SELFIES: SampleSelfie[] = [
  {
    id: "sample_alex",
    name: "Alex (Casual Indoor)",
    tag: "Male / Indoor Casual",
    dataUrl: createSampleSelfieDataUrl("Alex", "bg-amber-100", "👨‍💼", "Casual hoodie, home lighting"),
  },
  {
    id: "sample_morgan",
    name: "Morgan (Outdoor Casual)",
    tag: "Female / Outdoor Light",
    dataUrl: createSampleSelfieDataUrl("Morgan", "bg-sky-100", "👩‍💻", "Outdoor phone selfie"),
  },
  {
    id: "sample_sam",
    name: "Sam (Studio Neutral)",
    tag: "Unisex / Neutral Selfie",
    dataUrl: createSampleSelfieDataUrl("Sam", "bg-emerald-100", "🧑‍🎨", "Front-facing phone shot"),
  },
];

function createSampleSelfieDataUrl(name: string, bgClass: string, emoji: string, subtitle: string): string {
  // SVG representation converted to base64 so it can be sent to Gemini API or displayed directly
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="600" height="600" viewBox="0 0 600 600">
    <defs>
      <linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="#3b82f6" stop-opacity="0.15"/>
        <stop offset="100%" stop-color="#8b5cf6" stop-opacity="0.25"/>
      </linearGradient>
      <filter id="shadow">
        <feDropShadow dx="0" dy="4" stdDeviation="12" flood-opacity="0.15"/>
      </filter>
    </defs>
    <rect width="600" height="600" fill="#f8fafc"/>
    <rect width="600" height="600" fill="url(#bg)"/>
    <circle cx="300" cy="250" r="140" fill="#e2e8f0" stroke="#cbd5e1" stroke-width="4" filter="url(#shadow)"/>
    <text x="300" y="270" font-family="system-ui, sans-serif" font-size="110" text-anchor="middle">${emoji}</text>
    <rect x="80" y="440" width="440" height="110" rx="20" fill="#ffffff" filter="url(#shadow)"/>
    <text x="300" y="480" font-family="system-ui, sans-serif" font-size="24" font-weight="700" fill="#0f172a" text-anchor="middle">${name}</text>
    <text x="300" y="515" font-family="system-ui, sans-serif" font-size="16" font-weight="500" fill="#64748b" text-anchor="middle">${subtitle} • Sample Selfie</text>
  </svg>`;
  return `data:image/svg+xml;base64,${btoa(svg)}`;
}
