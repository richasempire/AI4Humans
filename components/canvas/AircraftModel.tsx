"use client";

import { useRef, Suspense } from "react";
import { useFrame } from "@react-three/fiber";
import { Mesh } from "three";
import { useAircraftStore } from "@/store/aircraftStore";
import { aircraftConfigs } from "@/lib/aircraft-config";
import ColladaModel from "./ColladaModel";
import WingModel from "./WingModel";
import { Html } from "@react-three/drei";

interface AircraftModelProps {
  onWingClick: () => void;
}

export default function AircraftModel({ onWingClick }: AircraftModelProps) {
  const groupRef = useRef<THREE.Group>(null);
  const { selectedAircraft, wingParameters } = useAircraftStore();

  // Gentle rotation animation - must be called before any early returns
  useFrame((state) => {
    if (groupRef.current && selectedAircraft) {
      groupRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.2) * 0.1;
    }
  });

  if (!selectedAircraft) return null;

  const config = aircraftConfigs[selectedAircraft];
  const wing = wingParameters || config.defaultWing;

  return (
    <group ref={groupRef}>
      <Suspense fallback={null}>
        <ColladaModel
          modelPath={config.modelPath}
          scale={config.scale || 1}
          position={config.position || [0, 0, 0]}
          wingMeshNames={config.wingMeshNames}
          onWingClick={onWingClick}
        />
      </Suspense>

      {/* Show parametric wings when available */}
      {wingParameters && (
        <Suspense fallback={null}>
          {/* Left Wing */}
          <WingModel
            parameters={wingParameters}
            position={[0, 0, 0]}
            mirrored={false}
            onClick={onWingClick}
          />
          {/* Right Wing */}
          <WingModel
            parameters={wingParameters}
            position={[0, 0, 0]}
            mirrored={true}
            onClick={onWingClick}
          />
        </Suspense>
      )}
    </group>
  );
}

