"use client";

import { useState } from "react";
import { hardcodedWings } from "@/lib/hardcoded-wings";
import { Sparkles } from "lucide-react";

interface WingPresetsProps {
  onSelectPreset: (wingConfig: any) => void;
}

export default function WingPresets({ onSelectPreset }: WingPresetsProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>("all");

  const filteredWings = selectedCategory === "all" 
    ? hardcodedWings 
    : hardcodedWings.filter(w => w.category === selectedCategory);

  return (
    <div className="space-y-3">
      <div className="flex items-center gap-2 text-white/70 mb-2">
        <Sparkles className="w-3 h-3" />
        <span className="text-xs font-light">Special Wing Presets</span>
      </div>

      {/* Category Tabs - Smaller */}
      <div className="flex flex-wrap gap-1.5 mb-2">
        {["all", "oblique", "curved", "high_camber"].map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`
              px-2 py-0.5 rounded-full text-[10px] font-light transition-all
              ${selectedCategory === cat
                ? "bg-white/20 text-white"
                : "bg-white/5 text-white/50 hover:bg-white/10"
              }
            `}
          >
            {cat === "all" ? "All" : cat.replace("_", " ")}
          </button>
        ))}
      </div>

      {/* Preset Grid - Compact - No Scroll */}
      <div className="space-y-1.5 pr-2">
        {filteredWings.map((wing) => (
          <button
            key={wing.id}
            onClick={() => onSelectPreset(wing.config)}
            className="w-full p-2 rounded-md bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 transition-all text-left group"
          >
            <div className="flex items-center gap-2">
              <div 
                className="w-1.5 h-1.5 rounded-full flex-shrink-0"
                style={{ backgroundColor: wing.color }}
              />
              <div className="flex-1 min-w-0">
                <h3 className="text-white text-xs font-light truncate">
                  {wing.name}
                </h3>
              </div>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}

