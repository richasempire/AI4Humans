"use client";

import { useEffect, useRef } from "react";
import { useLoader } from "@react-three/fiber";
import { ColladaLoader } from "three/examples/jsm/loaders/ColladaLoader.js";
import * as THREE from "three";

interface ColladaModelProps {
  modelPath: string;
  scale?: number;
  position?: [number, number, number];
  rotation?: [number, number, number];
  onWingClick?: () => void;
  wingMeshNames?: string[];
}

export default function ColladaModel({
  modelPath,
  scale = 1,
  position = [0, 0, 0],
  rotation = [0, 0, 0],
  onWingClick,
}: ColladaModelProps) {
  const groupRef = useRef<THREE.Group>(null);
  
  // Load COLLADA model
  const collada = useLoader(ColladaLoader, modelPath);
  
  // Clone the scene to avoid modifying the cached version
  const scene = collada.scene.clone();

  useEffect(() => {
    if (!scene) return;

    // Enable shadows for all meshes
    scene.traverse((child) => {
      if (child instanceof THREE.Mesh) {
        child.castShadow = true;
        child.receiveShadow = true;
      }
    });
  }, [scene]);

  // Handle hover - entire model
  const handlePointerOver = () => {
    document.body.style.cursor = "pointer";
  };

  const handlePointerOut = () => {
    document.body.style.cursor = "default";
  };

  // Handle click - entire model opens designer
  const handleClick = (event: THREE.Event) => {
    event.stopPropagation();
    if (onWingClick) {
      onWingClick();
    }
  };

  return (
    <group ref={groupRef} position={position} rotation={rotation} scale={scale}>
      <primitive
        object={scene}
        onPointerOver={handlePointerOver}
        onPointerOut={handlePointerOut}
        onClick={handleClick}
      />
    </group>
  );
}

