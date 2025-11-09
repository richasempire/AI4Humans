"use client";

import { useState } from "react";
import { Loader2 } from "lucide-react";
import UnifiedInput from "./UnifiedInput";
import ParameterControls from "./ParameterControls";
import WingGraphs from "./WingGraphs";
import WingPreview from "./WingPreview";
import { useAircraftStore } from "@/store/aircraftStore";
import { useToast } from "@/hooks/use-toast";

interface WingDesignerProps {
  onApply: () => void;
  onCancel: () => void;
}

export default function WingDesigner({ onApply, onCancel }: WingDesignerProps) {
  const { isGenerating, setIsGenerating, multimodalInput, clearMultimodalInput } = useAircraftStore();
  const { toast } = useToast();

  const handleGenerate = async () => {
    if (!multimodalInput.sketch && !multimodalInput.voice?.length && !multimodalInput.text?.length) {
      toast({
        title: "No input provided",
        description: "Please provide at least one type of input (sketch, voice, or text)",
        variant: "destructive",
      });
      return;
    }

    setIsGenerating(true);
    
    try {
      const response = await fetch("/api/generate-wing", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(multimodalInput),
      });

      if (!response.ok) throw new Error("Failed to generate wing");

      const data = await response.json();
      
      if (data.success && data.parameters) {
        // Apply AI-generated parameters to the wing
        useAircraftStore.getState().setWingParameters(data.parameters);
        
        toast({
          title: "Wing generated successfully!",
          description: "AI has generated your wing design. Adjust parameters as needed.",
        });
      } else {
        throw new Error(data.error || "Failed to generate wing parameters");
      }

      clearMultimodalInput();
    } catch (error) {
      toast({
        title: "Generation failed",
        description: error instanceof Error ? error.message : "Please try again",
        variant: "destructive",
      });
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="h-screen flex bg-black">
      {/* Left Sidebar - Unified Input */}
      <div className="w-96 bg-zinc-950/50 backdrop-blur-xl border-r border-white/5 flex flex-col h-full">
        <div className="p-6 border-b border-white/5 flex-shrink-0">
          <h2 className="text-lg font-light text-white tracking-tight mb-1">AI4AeroDesigners</h2>
          <p className="text-xs text-white/40 font-light">
            Voice • Text • Sketch
          </p>
        </div>

        {/* Unified Input - Scrollable */}
        <div className="flex-1 overflow-y-auto min-h-0">
          <UnifiedInput />
        </div>

        {/* Action Buttons - Side by Side */}
        <div className="p-6 border-t border-white/5 flex-shrink-0">
          <div className="grid grid-cols-2 gap-3">
            <button
              onClick={handleGenerate}
              disabled={isGenerating}
              className="px-4 py-3 rounded-lg bg-white/10 text-white font-light text-sm hover:bg-white/20 active:bg-white active:text-black transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 border border-white/10"
            >
              {isGenerating && <Loader2 className="w-4 h-4 animate-spin" />}
              {isGenerating ? "Generating..." : "Generate Design"}
            </button>

            <button
              onClick={onApply}
              className="px-4 py-3 rounded-lg bg-white/10 text-white font-light text-sm hover:bg-white/20 active:bg-white active:text-black transition-all border border-white/10"
            >
              Apply Changes
            </button>
          </div>
        </div>
      </div>

      {/* Center - 3D Preview + Graphs */}
      <div className="flex-1 flex flex-col relative h-full">
        {/* 3D Preview - Takes 3/4 of screen */}
        <div className="flex-[3] min-h-0">
          <WingPreview />
        </div>
        
        {/* Graphs at Bottom - Takes 1/4 of screen */}
        <div className="flex-[1] min-h-0 border-t border-white/10 bg-zinc-950/30 backdrop-blur-xl overflow-y-auto">
          <div className="h-full p-4">
            <WingGraphs />
          </div>
        </div>
      </div>

      {/* Right Sidebar - Parameters Only */}
      <div className="w-80 bg-zinc-950/50 backdrop-blur-xl border-l border-white/5 flex flex-col h-full">
        <div className="p-6 flex-shrink-0">
          <h3 className="text-lg font-light text-white tracking-tight mb-6">Parameters</h3>
        </div>
        <div className="flex-1 overflow-y-auto min-h-0 px-6 pb-6">
          <ParameterControls />
        </div>
      </div>
    </div>
  );
}

