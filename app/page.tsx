"use client";

import { useState } from "react";
import AircraftSelector from "@/components/aircraft/AircraftSelector";
import AircraftViewer from "@/components/canvas/AircraftViewer";
import WingDesigner from "@/components/designer/WingDesigner";
import { useAircraftStore } from "@/store/aircraftStore";
import { aircraftConfigs } from "@/lib/aircraft-config";
import { Button } from "@/components/ui/button";
import { ArrowLeft, X } from "lucide-react";

export default function Home() {
  const [step, setStep] = useState<"select" | "design" | "view">("select");
  const { selectedAircraft, wingParameters, setWingParameters } = useAircraftStore();

  const handleOpenDesigner = () => {
    // Initialize wing parameters with default if not already set
    if (!wingParameters && selectedAircraft) {
      const config = aircraftConfigs[selectedAircraft];
      setWingParameters(config.defaultWing);
    }
    setStep("design");
  };

  return (
    <main className="h-screen w-screen overflow-hidden bg-black">
      {/* Minimal Header - Only shown on selection and design */}
      {step !== "view" && (
        <header className="absolute top-0 left-0 right-0 z-50 bg-black/40 backdrop-blur-xl border-b border-white/5">
          <div className="px-8 py-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <h1 className="text-xl font-light tracking-tight text-white">
                AI4AeroDesigners
              </h1>
            </div>
            
            {selectedAircraft && step !== "select" && (
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setStep("select")}
                className="text-white/70 hover:text-white hover:bg-white/10"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Change Aircraft
              </Button>
            )}
          </div>
        </header>
      )}

      {/* Close button for design mode */}
      {step === "design" && (
        <button
          onClick={() => setStep("view")}
          className="fixed top-8 right-8 z-50 w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-xl border border-white/10 flex items-center justify-center text-white transition-all"
        >
          <X className="w-5 h-5" />
        </button>
      )}

      {/* Main Content - Full Screen */}
      {step === "select" && (
        <div className="h-screen flex items-center justify-center bg-gradient-to-b from-zinc-950 via-black to-zinc-950">
          <AircraftSelector 
            onSelect={() => setStep("view")} 
          />
        </div>
      )}

      {step === "view" && selectedAircraft && (
        <div className="h-screen w-screen">
          <AircraftViewer 
            onWingClick={handleOpenDesigner}
          />
        </div>
      )}

      {step === "design" && (
        <div className="h-screen w-screen">
          <WingDesigner 
            onApply={() => setStep("view")}
            onCancel={() => setStep("view")}
          />
        </div>
      )}
    </main>
  );
}


