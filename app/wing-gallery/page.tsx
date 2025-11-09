"use client";

import { useState } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, PerspectiveCamera, Grid } from "@react-three/drei";
import { hardcodedWings, HardcodedWing } from "@/lib/hardcoded-wings";
import SpecialWingModel from "@/components/canvas/SpecialWingModel";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function WingGallery() {
  const [selectedWing, setSelectedWing] = useState<HardcodedWing>(hardcodedWings[0]);
  const [selectedCategory, setSelectedCategory] = useState<string>("all");

  const filteredWings = selectedCategory === "all" 
    ? hardcodedWings 
    : hardcodedWings.filter(w => w.category === selectedCategory);

  return (
    <div className="h-screen w-screen bg-black flex">
      {/* Sidebar */}
      <div className="w-80 bg-zinc-950 border-r border-white/10 flex flex-col overflow-hidden">
        {/* Header */}
        <div className="p-6 border-b border-white/10">
          <Link 
            href="/"
            className="flex items-center gap-2 text-white/70 hover:text-white mb-4 text-sm"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Designer
          </Link>
          <h1 className="text-2xl font-light text-white tracking-tight mb-2">
            Wing Gallery
          </h1>
          <p className="text-white/50 text-sm font-light">
            Hardcoded special wing designs
          </p>
        </div>

        {/* Category Filter */}
        <div className="p-6 border-b border-white/10">
          <div className="flex flex-wrap gap-2">
            {["all", "oblique", "curved", "high_camber"].map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`
                  px-3 py-1.5 rounded-full text-xs font-light transition-all
                  ${selectedCategory === cat
                    ? "bg-white text-black"
                    : "bg-white/10 text-white/70 hover:bg-white/20"
                  }
                `}
              >
                {cat === "all" ? "All" : cat.replace("_", " ")}
              </button>
            ))}
          </div>
        </div>

        {/* Wing List */}
        <div className="flex-1 overflow-y-auto p-4 space-y-2">
          {filteredWings.map((wing) => (
            <button
              key={wing.id}
              onClick={() => setSelectedWing(wing)}
              className={`
                w-full p-4 rounded-lg text-left transition-all
                ${selectedWing.id === wing.id
                  ? "bg-white/20 border-2 border-white/30"
                  : "bg-white/5 border border-white/10 hover:bg-white/10"
                }
              `}
            >
              <div className="flex items-start gap-3">
                <div 
                  className="w-3 h-3 rounded-full mt-1 flex-shrink-0"
                  style={{ backgroundColor: wing.color }}
                />
                <div className="flex-1">
                  <h3 className="text-white font-light text-sm mb-1">
                    {wing.name}
                  </h3>
                  <p className="text-white/50 text-xs font-light leading-relaxed">
                    {wing.description}
                  </p>
                  <div className="mt-2">
                    <span className="text-xs text-white/30 uppercase tracking-wider">
                      {wing.category.replace("_", " ")}
                    </span>
                  </div>
                </div>
              </div>
            </button>
          ))}
        </div>

        {/* Stats */}
        <div className="p-6 border-t border-white/10">
          <div className="grid grid-cols-3 gap-4 text-center">
            <div>
              <div className="text-2xl font-light text-white">
                {hardcodedWings.length}
              </div>
              <div className="text-xs text-white/50">Total Wings</div>
            </div>
            <div>
              <div className="text-2xl font-light text-white">
                {hardcodedWings.filter(w => w.category === "oblique").length}
              </div>
              <div className="text-xs text-white/50">Oblique</div>
            </div>
            <div>
              <div className="text-2xl font-light text-white">
                {hardcodedWings.filter(w => w.category === "curved").length}
              </div>
              <div className="text-xs text-white/50">Curved</div>
            </div>
          </div>
        </div>
      </div>

      {/* 3D Preview */}
      <div className="flex-1 relative">
        {/* Info Overlay */}
        <div className="absolute top-6 left-6 right-6 z-10 bg-black/40 backdrop-blur-xl border border-white/10 rounded-xl p-6">
          <h2 className="text-2xl font-light text-white mb-2">
            {selectedWing.name}
          </h2>
          <p className="text-white/70 text-sm font-light mb-4">
            {selectedWing.description}
          </p>
          <div className="flex gap-4 text-xs">
            <div>
              <span className="text-white/50">Type: </span>
              <span className="text-white">{selectedWing.config.wing_type}</span>
            </div>
            <div>
              <span className="text-white/50">Airfoil: </span>
              <span className="text-white">
                {selectedWing.config.airfoil || 
                 selectedWing.config.airfoil_root?.designation || 
                 "Custom"}
              </span>
            </div>
            <div>
              <span className="text-white/50">Span: </span>
              <span className="text-white">
                {selectedWing.config.wing_span || 
                 selectedWing.config.total_span || 
                 "15"}m
              </span>
            </div>
          </div>
        </div>

        {/* Instructions */}
        <div className="absolute bottom-6 left-6 z-10 bg-black/40 backdrop-blur-xl border border-white/10 rounded-lg px-4 py-2">
          <p className="text-white/50 text-xs font-light">
            🖱️ Drag to rotate • Scroll to zoom • Right-click to pan
          </p>
        </div>

        {/* Canvas */}
        <Canvas shadows>
          <PerspectiveCamera makeDefault position={[15, 10, 15]} />
          <OrbitControls
            enableDamping
            dampingFactor={0.05}
            minDistance={5}
            maxDistance={50}
          />

          {/* Lighting */}
          <ambientLight intensity={0.3} />
          <directionalLight
            position={[10, 10, 5]}
            intensity={1.2}
            castShadow
          />
          <directionalLight position={[-5, 5, -5]} intensity={0.5} />
          <pointLight position={[0, 5, 0]} intensity={0.5} color="#4a90e2" />

          {/* Grid */}
          <Grid
            args={[100, 50]}
            cellSize={2}
            cellThickness={0.2}
            cellColor="#0a0a0a"
            sectionSize={10}
            sectionThickness={0.3}
            sectionColor="#1a1a1a"
            fadeDistance={50}
            fadeStrength={1}
            position={[0, -5, 0]}
          />

          {/* Selected Wing */}
          <SpecialWingModel 
            wing={selectedWing}
            position={[0, 0, 0]}
            scale={0.15}
          />
        </Canvas>
      </div>
    </div>
  );
}

