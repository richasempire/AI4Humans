"use client";

import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Input } from "@/components/ui/input";
import { useAircraftStore } from "@/store/aircraftStore";
import { formatNumber } from "@/lib/utils";

export default function ParameterControls() {
  const { wingParameters, updateWingParameter } = useAircraftStore();

  if (!wingParameters) {
    return (
      <div className="text-center text-white/30 py-8 text-sm font-light">
        No parameters available
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Dimensions */}
      <div className="space-y-4">
        <h4 className="text-xs font-light text-white/50 uppercase tracking-wider mb-4">Dimensions</h4>
        
        <div className="space-y-3">
          <div className="flex justify-between items-center">
            <span className="text-sm font-light text-white/70">Wingspan</span>
            <span className="text-sm font-mono text-white">{wingParameters.wingspan}<span className="text-white/30 text-xs ml-1">mm</span></span>
          </div>
          <Slider
            value={[wingParameters.wingspan]}
            onValueChange={([value]) => updateWingParameter("wingspan", value)}
            min={1000}
            max={5000}
            step={100}
            className="[&_[role=slider]]:bg-white [&_[role=slider]]:border-white/20"
          />
        </div>

        <div className="space-y-3">
          <div className="flex justify-between items-center">
            <span className="text-sm font-light text-white/70">Root Chord</span>
            <span className="text-sm font-mono text-white">{wingParameters.rootChord}<span className="text-white/30 text-xs ml-1">mm</span></span>
          </div>
          <Slider
            value={[wingParameters.rootChord]}
            onValueChange={([value]) => updateWingParameter("rootChord", value)}
            min={200}
            max={1500}
            step={50}
          />
        </div>

        <div className="space-y-3">
          <div className="flex justify-between items-center">
            <span className="text-sm font-light text-white/70">Taper Ratio</span>
            <span className="text-sm font-mono text-white">{formatNumber(wingParameters.taperRatio, 2)}</span>
          </div>
          <Slider
            value={[wingParameters.taperRatio]}
            onValueChange={([value]) => updateWingParameter("taperRatio", value)}
            min={0.3}
            max={1.0}
            step={0.05}
          />
        </div>
      </div>

      {/* Angles */}
      <div className="space-y-4">
        <h4 className="text-xs font-light text-white/50 uppercase tracking-wider mb-4">Angles</h4>
        
        <div className="space-y-3">
          <div className="flex justify-between items-center">
            <span className="text-sm font-light text-white/70">Sweep</span>
            <span className="text-sm font-mono text-white">{wingParameters.sweepAngle}<span className="text-white/30 text-xs ml-1">°</span></span>
          </div>
          <Slider
            value={[wingParameters.sweepAngle]}
            onValueChange={([value]) => updateWingParameter("sweepAngle", value)}
            min={0}
            max={45}
            step={1}
          />
        </div>

        <div className="space-y-3">
          <div className="flex justify-between items-center">
            <span className="text-sm font-light text-white/70">Dihedral</span>
            <span className="text-sm font-mono text-white">{wingParameters.dihedralAngle}<span className="text-white/30 text-xs ml-1">°</span></span>
          </div>
          <Slider
            value={[wingParameters.dihedralAngle]}
            onValueChange={([value]) => updateWingParameter("dihedralAngle", value)}
            min={-5}
            max={15}
            step={0.5}
          />
        </div>
      </div>

      {/* Structure */}
      <div className="space-y-4">
        <h4 className="text-xs font-light text-white/50 uppercase tracking-wider mb-4">Structure</h4>
        
        <div className="space-y-2">
          <div className="flex justify-between">
            <Label>Number of Ribs</Label>
            <span className="text-sm font-mono">{wingParameters.nRibs}</span>
          </div>
          <Slider
            value={[wingParameters.nRibs]}
            onValueChange={([value]) => updateWingParameter("nRibs", value)}
            min={4}
            max={20}
            step={1}
          />
        </div>

        <div className="space-y-2">
          <div className="flex justify-between">
            <Label>Spar Count</Label>
            <span className="text-sm font-mono">{wingParameters.sparCount}</span>
          </div>
          <Slider
            value={[wingParameters.sparCount]}
            onValueChange={([value]) => updateWingParameter("sparCount", value)}
            min={1}
            max={4}
            step={1}
          />
        </div>
      </div>

      {/* Airfoil */}
      <div className="space-y-4">
        <h4 className="text-xs font-light text-white/50 uppercase tracking-wider mb-4">Airfoil</h4>
        
        <div className="space-y-3">
          <span className="text-sm font-light text-white/70">Type</span>
          <Input
            value={wingParameters.airfoilType}
            onChange={(e) => updateWingParameter("airfoilType", e.target.value)}
            placeholder="e.g., NACA 2412"
            className="bg-white/5 border-white/10 text-white font-mono text-sm focus:bg-white/10"
          />
        </div>
      </div>

      {/* Appearance */}
      <div className="space-y-4">
        <h4 className="text-xs font-light text-white/50 uppercase tracking-wider mb-4">Appearance</h4>
        
        <div className="space-y-3">
          <span className="text-sm font-light text-white/70">Color</span>
          <Input
            type="color"
            value={wingParameters.color}
            onChange={(e) => updateWingParameter("color", e.target.value)}
            className="bg-white/5 border-white/10 h-10 cursor-pointer"
          />
        </div>

        <div className="space-y-3">
          <div className="flex justify-between items-center">
            <span className="text-sm font-light text-white/70">Opacity</span>
            <span className="text-sm font-mono text-white">{formatNumber(wingParameters.opacity, 2)}</span>
          </div>
          <Slider
            value={[wingParameters.opacity]}
            onValueChange={([value]) => updateWingParameter("opacity", value)}
            min={0.1}
            max={1.0}
            step={0.05}
          />
        </div>
      </div>
    </div>
  );
}

