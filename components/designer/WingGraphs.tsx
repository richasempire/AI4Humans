"use client";

import { useAircraftStore } from "@/store/aircraftStore";
import { TrendingUp, BarChart3, Activity } from "lucide-react";

export default function WingGraphs() {
  const { wingParameters } = useAircraftStore();

  if (!wingParameters) {
    return null;
  }

  return (
    <div className="h-full flex flex-col">
      <div className="flex items-center gap-2 mb-4 flex-shrink-0">
        <BarChart3 className="w-4 h-4 text-white/50" />
        <h4 className="text-xs font-light text-white/50 uppercase tracking-wider">
          Performance Analysis
        </h4>
      </div>

      {/* Graph Placeholders - Fill remaining space */}
      <div className="flex-1 grid grid-cols-3 gap-4 min-h-0">
        {/* Lift Distribution Graph */}
        <div className="flex flex-col space-y-2">
          <div className="flex items-center justify-between flex-shrink-0">
            <span className="text-xs font-light text-white/60">Lift Distribution</span>
            <TrendingUp className="w-3 h-3 text-white/30" />
          </div>
          <div className="flex-1 bg-white/5 border border-white/10 rounded-lg flex items-center justify-center relative overflow-hidden min-h-0">
            {/* Placeholder grid */}
            <div className="absolute inset-0 opacity-10">
              <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
                <defs>
                  <pattern id="grid" width="20" height="20" patternUnits="userSpaceOnUse">
                    <path d="M 20 0 L 0 0 0 20" fill="none" stroke="white" strokeWidth="0.5"/>
                  </pattern>
                </defs>
                <rect width="100%" height="100%" fill="url(#grid)" />
              </svg>
            </div>
            {/* Placeholder curve */}
            <svg className="w-full h-full absolute inset-0" viewBox="0 0 200 100" preserveAspectRatio="none">
              <path
                d="M 0,80 Q 50,40 100,50 T 200,60"
                fill="none"
                stroke="white"
                strokeWidth="2"
                strokeOpacity="0.3"
                strokeDasharray="4 4"
              />
            </svg>
            <span className="text-xs text-white/20 font-light relative z-10">
              Graph logic to be implemented
            </span>
          </div>
        </div>

        {/* Drag Coefficient Graph */}
        <div className="flex flex-col space-y-2">
          <div className="flex items-center justify-between flex-shrink-0">
            <span className="text-xs font-light text-white/60">Drag Coefficient</span>
            <Activity className="w-3 h-3 text-white/30" />
          </div>
          <div className="flex-1 bg-white/5 border border-white/10 rounded-lg flex items-center justify-center relative overflow-hidden min-h-0">
            {/* Placeholder grid */}
            <div className="absolute inset-0 opacity-10">
              <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
                <defs>
                  <pattern id="grid2" width="20" height="20" patternUnits="userSpaceOnUse">
                    <path d="M 20 0 L 0 0 0 20" fill="none" stroke="white" strokeWidth="0.5"/>
                  </pattern>
                </defs>
                <rect width="100%" height="100%" fill="url(#grid2)" />
              </svg>
            </div>
            {/* Placeholder bars */}
            <div className="flex items-end justify-center gap-2 h-full w-full px-4 pb-2">
              {[0.3, 0.5, 0.4, 0.6, 0.45, 0.55].map((height, idx) => (
                <div
                  key={idx}
                  className="flex-1 bg-white/20 rounded-t"
                  style={{ height: `${height * 100}%` }}
                />
              ))}
            </div>
            <span className="text-xs text-white/20 font-light absolute bottom-1 left-1/2 -translate-x-1/2">
              Bar chart placeholder
            </span>
          </div>
        </div>

        {/* Pressure Distribution Graph */}
        <div className="flex flex-col space-y-2">
          <div className="flex items-center justify-between flex-shrink-0">
            <span className="text-xs font-light text-white/60">Pressure Distribution</span>
            <BarChart3 className="w-3 h-3 text-white/30" />
          </div>
          <div className="flex-1 bg-white/5 border border-white/10 rounded-lg flex items-center justify-center relative overflow-hidden min-h-0">
            {/* Placeholder grid */}
            <div className="absolute inset-0 opacity-10">
              <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
                <defs>
                  <pattern id="grid3" width="20" height="20" patternUnits="userSpaceOnUse">
                    <path d="M 20 0 L 0 0 0 20" fill="none" stroke="white" strokeWidth="0.5"/>
                  </pattern>
                </defs>
                <rect width="100%" height="100%" fill="url(#grid3)" />
              </svg>
            </div>
            {/* Placeholder area chart */}
            <svg className="w-full h-full absolute inset-0" viewBox="0 0 200 100" preserveAspectRatio="none">
              <defs>
                <linearGradient id="gradient" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="white" stopOpacity="0.2" />
                  <stop offset="100%" stopColor="white" stopOpacity="0" />
                </linearGradient>
              </defs>
              <path
                d="M 0,70 Q 30,50 60,55 T 120,45 T 180,50 T 200,55 L 200,100 L 0,100 Z"
                fill="url(#gradient)"
                stroke="white"
                strokeWidth="1.5"
                strokeOpacity="0.3"
              />
            </svg>
            <span className="text-xs text-white/20 font-light relative z-10">
              Area chart placeholder
            </span>
          </div>
        </div>
      </div>

    </div>
  );
}
