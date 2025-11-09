"use client";

import { useAircraftStore } from "@/store/aircraftStore";
import { aircraftConfigs } from "@/lib/aircraft-config";
import { AircraftType } from "@/types";
import { Plane, PackageOpen, Rocket } from "lucide-react";

interface AircraftSelectorProps {
  onSelect: () => void;
}

const icons = {
  fighter: Rocket,
  commercial: Plane,
  cargo: PackageOpen,
};

export default function AircraftSelector({ onSelect }: AircraftSelectorProps) {
  const { setSelectedAircraft } = useAircraftStore();

  const handleSelect = (type: AircraftType) => {
    setSelectedAircraft(type);
    onSelect(); // Automatically proceed to next step
  };

  return (
    <div className="max-w-5xl mx-auto px-8">
      <div className="text-center mb-20">
        <h2 className="text-5xl font-light tracking-tight mb-4 text-white">
          Select Aircraft
        </h2>
        <p className="text-white/50 text-lg font-light">
          Choose your platform
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {Object.entries(aircraftConfigs).map(([key, config]) => {
          const Icon = icons[key as AircraftType];

          return (
            <button
              key={key}
              onClick={() => handleSelect(key as AircraftType)}
              className="
                group relative overflow-hidden rounded-2xl backdrop-blur-xl transition-all duration-500
                bg-white/5 border border-white/10 hover:bg-white/10 hover:border-white/20 hover:scale-105
              "
            >
              <div className="p-8">
                <div className="flex flex-col items-center text-center space-y-4">
                  <div className="
                    w-20 h-20 rounded-full flex items-center justify-center transition-all duration-300
                    bg-white/5 group-hover:bg-white/10
                  ">
                    <Icon className="w-10 h-10 text-white" />
                  </div>
                  
                  <h3 className="text-2xl font-light text-white tracking-tight">
                    {config.name}
                  </h3>
                  
                  <p className="text-white/50 text-sm font-light leading-relaxed">
                    {config.description}
                  </p>
                  
                  <div className="w-full pt-4 border-t border-white/10 space-y-2 text-xs">
                    <div className="flex justify-between text-white/40">
                      <span>Wingspan</span>
                      <span className="text-white/70">{config.defaultWing.wingspan}mm</span>
                    </div>
                    <div className="flex justify-between text-white/40">
                      <span>Airfoil</span>
                      <span className="text-white/70">{config.defaultWing.airfoilType}</span>
                    </div>
                  </div>
                </div>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}

