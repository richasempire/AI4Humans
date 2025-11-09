"use client";

import { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, PerspectiveCamera, Grid } from "@react-three/drei";
import WingModel from "../canvas/WingModel";
import { useAircraftStore } from "@/store/aircraftStore";

export default function WingPreview() {
  const { wingParameters } = useAircraftStore();

  if (!wingParameters) {
    return (
      <div className="h-full flex items-center justify-center text-muted-foreground">
        Configure wing parameters to see preview
      </div>
    );
  }

  return (
    <div className="h-full w-full bg-black">
      <Canvas shadows>
        <PerspectiveCamera makeDefault position={[1500, 1000, 1500]} />
        <OrbitControls
          enableDamping
          dampingFactor={0.05}
          minDistance={300}
          maxDistance={3000}
        />

        {/* Lighting */}
        <ambientLight intensity={0.6} />
        <directionalLight position={[10, 10, 5]} intensity={1} castShadow />
        <directionalLight position={[-10, -10, -5]} intensity={0.3} />
        <hemisphereLight skyColor="#ffffff" groundColor="#0a0a0a" intensity={0.3} />

        {/* Technical Grid - More Visible */}
        <Grid
          args={[5000, 100]}
          cellSize={50}
          cellThickness={0.5}
          cellColor="#2a2a2a"
          sectionSize={500}
          sectionThickness={1}
          sectionColor="#4a4a4a"
          fadeDistance={4000}
          fadeStrength={0.5}
          followCamera={false}
          position={[0, -200, 0]}
        />

        {/* Wing Model */}
        <Suspense fallback={null}>
          <WingModel
            parameters={wingParameters}
            position={[0, 0, 0]}
          />
        </Suspense>
      </Canvas>
    </div>
  );
}

