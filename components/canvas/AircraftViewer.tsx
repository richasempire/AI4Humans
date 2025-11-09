"use client";

import { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, PerspectiveCamera, Grid } from "@react-three/drei";
import AircraftModel from "./AircraftModel";

interface AircraftViewerProps {
  onWingClick: () => void;
}

export default function AircraftViewer({ onWingClick }: AircraftViewerProps) {
  return (
    <div className="relative w-full h-full overflow-hidden bg-black">

      {/* 3D Canvas */}
      <Canvas shadows>
        <PerspectiveCamera makeDefault position={[25, 15, 25]} />
        <OrbitControls
          enableDamping
          dampingFactor={0.05}
          minDistance={5}
          maxDistance={200}
          maxPolarAngle={Math.PI / 2}
        />

        {/* Studio Lighting */}
        <ambientLight intensity={0.3} />
        <directionalLight
          position={[10, 10, 5]}
          intensity={1.2}
          castShadow
          shadow-mapSize-width={2048}
          shadow-mapSize-height={2048}
        />
        <directionalLight position={[-5, 5, -5]} intensity={0.5} />
        <spotLight
          position={[0, 20, 0]}
          angle={0.3}
          penumbra={1}
          intensity={0.5}
          castShadow
        />

        {/* Technical Grid */}
        <Grid
          args={[200, 40]}
          cellSize={5}
          cellThickness={0.4}
          cellColor="#2a2a2a"
          sectionSize={25}
          sectionThickness={0.8}
          sectionColor="#4a4a4a"
          fadeDistance={200}
          fadeStrength={0.5}
          followCamera={false}
          infiniteGrid
          position={[0, -10, 0]}
        />

        {/* Aircraft Model */}
        <Suspense fallback={null}>
          <AircraftModel onWingClick={onWingClick} />
        </Suspense>
      </Canvas>
    </div>
  );
}

