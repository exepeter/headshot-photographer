import React, { useState } from "react";
import { HeadshotResult } from "../types";
import {
  Heart,
  Download,
  Trash2,
  Sparkles,
  Columns,
  Eye,
  X,
  CheckCircle2,
  Image as ImageIcon,
} from "lucide-react";

interface HistoryGalleryProps {
  results: HeadshotResult[];
  onToggleFavorite: (id: string) => void;
  onDeleteResult: (id: string) => void;
  onSelectResultToView: (result: HeadshotResult) => void;
}

export const HistoryGallery: React.FC<HistoryGalleryProps> = ({
  results,
  onToggleFavorite,
  onDeleteResult,
  onSelectResultToView,
}) => {
  const [filter, setFilter] = useState<"all" | "favorites">("all");
  const [compareIds, setCompareIds] = useState<string[]>([]);
  const [isCompareOpen, setIsCompareOpen] = useState(false);

  const filteredResults =
    filter === "favorites" ? results.filter((r) => r.isFavorite) : results;

  const toggleCompareSelect = (id: string) => {
    if (compareIds.includes(id)) {
      setCompareIds(compareIds.filter((item) => item !== id));
    } else {
      if (compareIds.length >= 2) {
        setCompareIds([compareIds[1], id]); // Keep last + new
      } else {
        setCompareIds([...compareIds, id]);
      }
    }
  };

  const handleDownload = (result: HeadshotResult) => {
    const link = document.createElement("a");
    link.href = result.generatedImageUrl;
    link.download = `Headshot-${result.styleName.replace(/\s+/g, "-")}-${Date.now()}.png`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const compareItems = results.filter((r) => compareIds.includes(r.id));

  return (
    <div className="space-y-6">
      {/* Header & Controls */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
        <div>
          <h2 className="text-lg font-bold text-slate-900 sm:text-xl flex items-center gap-2">
            <ImageIcon className="h-5 w-5 text-indigo-600" /> Saved Headshots Collection
          </h2>
          <p className="text-xs text-slate-500">
            {results.length} headshots generated in this session
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          {/* Compare Trigger */}
          {compareIds.length === 2 && (
            <button
              onClick={() => setIsCompareOpen(true)}
              className="flex items-center gap-1.5 rounded-xl bg-indigo-600 px-3.5 py-1.5 text-xs font-bold text-white shadow hover:bg-indigo-500 transition"
            >
              <Columns className="h-4 w-4" />
              <span>Compare Selected (2)</span>
            </button>
          )}

          {/* Filter Pills */}
          <div className="flex items-center rounded-xl bg-slate-100 p-1 text-xs font-semibold text-slate-600">
            <button
              onClick={() => setFilter("all")}
              className={`rounded-lg px-3 py-1 ${
                filter === "all" ? "bg-white text-slate-900 shadow-2xs" : "hover:text-slate-900"
              }`}
            >
              All ({results.length})
            </button>
            <button
              onClick={() => setFilter("favorites")}
              className={`flex items-center gap-1 rounded-lg px-3 py-1 ${
                filter === "favorites" ? "bg-white text-slate-900 shadow-2xs" : "hover:text-slate-900"
              }`}
            >
              <Heart className="h-3.5 w-3.5 text-rose-500 fill-rose-500" />
              <span>Favorites ({results.filter((r) => r.isFavorite).length})</span>
            </button>
          </div>
        </div>
      </div>

      {/* Empty State */}
      {filteredResults.length === 0 && (
        <div className="rounded-2xl border border-dashed border-slate-300 bg-slate-50/50 p-12 text-center">
          <ImageIcon className="mx-auto h-12 w-12 text-slate-400 mb-3" />
          <h3 className="text-base font-bold text-slate-800">
            {filter === "favorites" ? "No Favorites Saved Yet" : "No Headshots Generated Yet"}
          </h3>
          <p className="mt-1 text-xs text-slate-500 max-w-sm mx-auto">
            {filter === "favorites"
              ? "Click the heart icon on any generated headshot to save it to your favorites gallery."
              : "Upload a casual selfie in the Studio tab and generate your first professional AI headshot!"}
          </p>
        </div>
      )}

      {/* Grid of Results */}
      {filteredResults.length > 0 && (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {filteredResults.map((item) => {
            const isSelectedForCompare = compareIds.includes(item.id);
            return (
              <div
                key={item.id}
                className={`group relative overflow-hidden rounded-2xl border bg-white p-3 transition-all hover:shadow-md ${
                  isSelectedForCompare
                    ? "border-indigo-600 ring-2 ring-indigo-600/20"
                    : "border-slate-200"
                }`}
              >
                {/* Image Container */}
                <div
                  onClick={() => onSelectResultToView(item)}
                  className="relative aspect-square w-full cursor-pointer overflow-hidden rounded-xl bg-slate-950 shadow-inner"
                >
                  <img
                    src={item.generatedImageUrl}
                    alt={item.styleName}
                    referrerPolicy="no-referrer"
                    className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                  />

                  {/* Badges Overlay */}
                  <div className="absolute top-2 left-2 flex items-center gap-1.5">
                    <span className="rounded-full bg-slate-900/80 px-2.5 py-0.5 text-[10px] font-bold text-white backdrop-blur">
                      {item.styleName}
                    </span>
                  </div>

                  {/* Favorite Button */}
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onToggleFavorite(item.id);
                    }}
                    className="absolute top-2 right-2 rounded-full bg-slate-900/70 p-1.5 text-white backdrop-blur hover:bg-slate-900"
                  >
                    <Heart
                      className={`h-4 w-4 ${
                        item.isFavorite ? "fill-rose-500 text-rose-500" : "text-white"
                      }`}
                    />
                  </button>

                  <div className="absolute inset-0 bg-slate-900/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <span className="inline-flex items-center gap-1 rounded-full bg-white px-3 py-1.5 text-xs font-bold text-slate-900 shadow">
                      <Eye className="h-3.5 w-3.5 text-indigo-600" /> Open Studio Inspector
                    </span>
                  </div>
                </div>

                {/* Footer Info & Actions */}
                <div className="mt-3 flex items-center justify-between text-xs">
                  <div>
                    <div className="font-bold text-slate-900">{item.attireName}</div>
                    <div className="text-[10px] text-slate-500">
                      {item.expressionName} • {item.framingRatio}
                    </div>
                  </div>

                  <div className="flex items-center gap-1">
                    {/* Compare Selector Checkbox */}
                    <button
                      onClick={() => toggleCompareSelect(item.id)}
                      title="Select for 2-way comparison"
                      className={`rounded-lg p-1.5 text-xs font-medium border transition ${
                        isSelectedForCompare
                          ? "border-indigo-600 bg-indigo-50 text-indigo-700"
                          : "border-slate-200 text-slate-600 hover:bg-slate-50"
                      }`}
                    >
                      <Columns className="h-3.5 w-3.5" />
                    </button>

                    <button
                      onClick={() => handleDownload(item)}
                      title="Download PNG"
                      className="rounded-lg border border-slate-200 p-1.5 text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                    >
                      <Download className="h-3.5 w-3.5" />
                    </button>

                    <button
                      onClick={() => onDeleteResult(item.id)}
                      title="Delete"
                      className="rounded-lg border border-slate-200 p-1.5 text-slate-400 hover:bg-rose-50 hover:text-rose-600"
                    >
                      <Trash2 className="h-3.5 w-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Compare Side-by-Side Modal */}
      {isCompareOpen && compareItems.length === 2 && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 backdrop-blur-md animate-fadeIn">
          <div className="relative w-full max-w-5xl rounded-2xl bg-slate-900 p-6 text-white shadow-2xl">
            <button
              onClick={() => setIsCompareOpen(false)}
              className="absolute top-4 right-4 rounded-full bg-slate-800 p-2 text-slate-400 hover:text-white"
            >
              <X className="h-5 w-5" />
            </button>

            <h3 className="text-lg font-bold flex items-center gap-2 mb-4">
              <Columns className="h-5 w-5 text-indigo-400" /> Side-by-Side Headshot Comparison
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {compareItems.map((item, idx) => (
                <div key={item.id} className="rounded-xl bg-slate-950 p-4 border border-slate-800 space-y-3">
                  <div className="relative aspect-square w-full overflow-hidden rounded-lg bg-black">
                    <img
                      src={item.generatedImageUrl}
                      alt={item.styleName}
                      referrerPolicy="no-referrer"
                      className="h-full w-full object-cover"
                    />
                    <span className="absolute top-2 left-2 rounded-full bg-indigo-600 px-2.5 py-0.5 text-[10px] font-bold text-white">
                      Option {idx + 1}: {item.styleName}
                    </span>
                  </div>

                  <div className="text-xs space-y-1">
                    <div className="font-bold text-slate-200">{item.attireName}</div>
                    <div className="text-slate-400">{item.expressionName} • {item.lightingName}</div>
                    <div className="text-slate-500 text-[10px]">Ratio: {item.framingRatio}</div>
                  </div>

                  <button
                    onClick={() => handleDownload(item)}
                    className="w-full flex items-center justify-center gap-1.5 rounded-lg bg-indigo-600 py-2 text-xs font-bold text-white shadow hover:bg-indigo-500"
                  >
                    <Download className="h-3.5 w-3.5" />
                    <span>Download Option {idx + 1}</span>
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
