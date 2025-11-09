"use client";

import { useMemo, useState } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { WingParameters } from "@/types";
import { generateNACA4Digit } from "@/lib/wing-generator";

interface WingModelProps {
  parameters: WingParameters;
  position: [number, number, number];
  mirrored?: boolean;
  onClick?: () => void;
}

export default function WingModel({
  parameters,
  position,
  mirrored = false,
  onClick,
}: WingModelProps) {
  const [hovered, setHovered] = useState(false);

  // Generate wing geometry
  const geometry = useMemo(() => {
    const airfoil = generateNACA4Digit(parameters.airfoilType, 50);
    const ribPositions: number[] = [];
    
    for (let i = 0; i < parameters.nRibs; i++) {
      ribPositions.push((i * parameters.wingspan) / (parameters.nRibs - 1));
    }

    const vertices: number[] = [];
    const indices: number[] = [];

    const allRibs: Array<{ spanPos: number; x: number[]; y: number[] }> = [];

    ribPositions.forEach((spanPos) => {
      const taperFactor = 1.0 - (1 - parameters.taperRatio) * (spanPos / parameters.wingspan);
      const localChord = parameters.rootChord * taperFactor;
      
      const sweepOffset = (spanPos / parameters.wingspan) * 
        parameters.rootChord * Math.tan((parameters.sweepAngle * Math.PI) / 180);
      const dihedralOffset = (spanPos / parameters.wingspan) * 
        parameters.wingspan * Math.tan((parameters.dihedralAngle * Math.PI) / 180);

      const xScaled = airfoil.x.map((x) => x * localChord + sweepOffset);
      const yScaled = airfoil.y.map((y) => y * localChord + dihedralOffset);

      allRibs.push({ spanPos, x: xScaled, y: yScaled });
    });

    // Create mesh between ribs
    for (let i = 0; i < allRibs.length - 1; i++) {
      const rib1 = allRibs[i];
      const rib2 = allRibs[i + 1];

      for (let j = 0; j < rib1.x.length - 1; j++) {
        const idx = vertices.length / 3;

        const z1 = mirrored ? -rib1.spanPos : rib1.spanPos;
        const z2 = mirrored ? -rib2.spanPos : rib2.spanPos;

        // Quad vertices
        vertices.push(
          rib1.x[j], rib1.y[j], z1,
          rib1.x[j + 1], rib1.y[j + 1], z1,
          rib2.x[j + 1], rib2.y[j + 1], z2,
          rib2.x[j], rib2.y[j], z2
        );

        // Two triangles
        indices.push(
          idx, idx + 1, idx + 2,
          idx, idx + 2, idx + 3
        );
      }
    }

    const geo = new THREE.BufferGeometry();
    geo.setAttribute("position", new THREE.Float32BufferAttribute(vertices, 3));
    geo.setIndex(indices);
    geo.computeVertexNormals();

    return geo;
  }, [parameters, mirrored]);

  return (
    <mesh
      geometry={geometry}
      position={position}
      castShadow
      receiveShadow
      onClick={(e) => {
        e.stopPropagation();
        onClick?.();
      }}
      onPointerOver={(e) => {
        e.stopPropagation();
        setHovered(true);
        document.body.style.cursor = "pointer";
      }}
      onPointerOut={() => {
        setHovered(false);
        document.body.style.cursor = "default";
      }}
    >
      <meshStandardMaterial
        color={hovered ? "#60a5fa" : parameters.color}
        transparent
        opacity={parameters.opacity}
        metalness={0.6}
        roughness={0.3}
        side={THREE.DoubleSide}
      />
    </mesh>
  );
}

