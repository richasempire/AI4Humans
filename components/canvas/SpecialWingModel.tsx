"use client";

import { useMemo } from "react";
import * as THREE from "three";
import { HardcodedWing } from "@/lib/hardcoded-wings";

interface SpecialWingModelProps {
  wing: HardcodedWing;
  position?: [number, number, number];
  scale?: number;
}

export default function SpecialWingModel({ 
  wing, 
  position = [0, 0, 0],
  scale = 0.1 
}: SpecialWingModelProps) {
  
  const { skinGeometry, ribsGroup, sparsGroup } = useMemo(() => {
    const config = wing.config;
    
    // WING SKIN (TRANSPARENT) - HIGH RESOLUTION
    const skinVerts: number[] = [];
    const skinIndices: number[] = [];
    const chordSteps = 60; // Chord-wise detail
    
    // Calculate span based on wing type
    let totalSpan = config.wing_span || config.total_span || 15;
    let rootChord = config.root_chord || config.left_root_chord || 5;
    let tipChord = config.tip_chord || config.left_tip_chord || 1.5;
    const thicknessRatio = config.thickness_ratio || config.thickness_ratio_root || 0.08;
    
    // Create skin at exact rib positions for attachment
    const numRibs = 12;
    const ribPositions: number[] = [];
    
    for (let i = 0; i < numRibs; i++) {
      const t = i / (numRibs - 1);
      const spanPos = (t - 0.5) * totalSpan;
      ribPositions.push(spanPos);
    }
    
    // Generate skin vertices at rib locations + intermediate points
    for (let i = 0; i < numRibs - 1; i++) {
      const t1 = i / (numRibs - 1);
      const t2 = (i + 1) / (numRibs - 1);
      const spanPos1 = ribPositions[i];
      const spanPos2 = ribPositions[i + 1];
      
      // Add skin sections between ribs (multiple for smoothness)
      const subsections = 8;
      for (let sub = 0; sub <= subsections; sub++) {
        const t = THREE.MathUtils.lerp(t1, t2, sub / subsections);
        const spanPos = THREE.MathUtils.lerp(spanPos1, spanPos2, sub / subsections);
        
        let localChord = THREE.MathUtils.lerp(rootChord, tipChord, t);
        let sweepAngle = config.leading_edge_sweep || config.sweep_angle || 0;
        
        // Handle curved wings with variable sweep
        if (config.wing_type?.includes("curved") && config.inner_sweep) {
          if (t < 0.3) {
            sweepAngle = config.inner_sweep;
          } else if (t < 0.7) {
            sweepAngle = THREE.MathUtils.lerp(config.inner_sweep, config.outer_sweep, (t - 0.3) / 0.4);
          } else {
            sweepAngle = config.outer_sweep;
          }
        }
        
        addWingSectionVertices(skinVerts, spanPos, localChord, thicknessRatio, chordSteps, sweepAngle);
      }
    }
    
    // Create indices for skin mesh
    const totalSpanSections = (numRibs - 1) * 8; // subsections between ribs
    for (let i = 0; i < totalSpanSections; i++) {
      for (let j = 0; j < chordSteps; j++) {
        const idx = i * (chordSteps + 1) + j;
        skinIndices.push(idx, idx + chordSteps + 1, idx + 1);
        skinIndices.push(idx + 1, idx + chordSteps + 1, idx + chordSteps + 2);
      }
    }
    
    const skinGeo = new THREE.BufferGeometry();
    skinGeo.setAttribute('position', new THREE.Float32BufferAttribute(skinVerts, 3));
    skinGeo.setIndex(skinIndices);
    skinGeo.computeVertexNormals();
    
    // RIBS (SOLID STRUCTURE) - Returns Group now
    const ribsGrp = createRibsGeometry(config, totalSpan, rootChord, tipChord, thicknessRatio);
    
    // SPARS (BEAMS) - Returns Group now
    const sparsGrp = createSparsGeometry(totalSpan, rootChord);
    
    return {
      skinGeometry: skinGeo,
      ribsGroup: ribsGrp,
      sparsGroup: sparsGrp
    };
  }, [wing]);
  
  return (
    <group position={position} scale={scale}>
      {/* Transparent Skin - Attached to Ribs - VISIBLE */}
      <mesh geometry={skinGeometry}>
        <meshPhysicalMaterial
          color={wing.color}
          transparent
          opacity={0.4}
          side={THREE.DoubleSide}
          roughness={0.3}
          metalness={0.2}
          clearcoat={0.6}
          clearcoatRoughness={0.2}
          transmission={0.5}
          thickness={1.0}
          ior={1.45}
          reflectivity={0.3}
        />
      </mesh>
      
      {/* Solid Ribs with Lightening Holes (visible through skin) */}
      {ribsGroup.children.map((rib, idx) => (
        <primitive key={idx} object={rib}>
          <meshStandardMaterial
            attach="material"
            color="#dc2626"
            metalness={0.7}
            roughness={0.3}
            emissive="#7f1d1d"
            emissiveIntensity={0.1}
          />
        </primitive>
      ))}
      
      {/* Spars */}
      {sparsGroup.children.map((spar, idx) => (
        <primitive key={`spar-${idx}`} object={spar}>
          <meshStandardMaterial
            attach="material"
            color="#f59e0b"
            metalness={0.8}
            roughness={0.2}
            emissive="#92400e"
            emissiveIntensity={0.1}
          />
        </primitive>
      ))}
    </group>
  );
}

// Helper function to add wing section vertices
function addWingSectionVertices(
  vertices: number[], 
  spanPos: number, 
  chord: number, 
  thickness: number,
  chordSteps: number,
  sweepAngle: number
) {
  const sweepOffset = Math.abs(spanPos) * Math.tan((sweepAngle * Math.PI) / 180);
  
  for (let j = 0; j <= chordSteps; j++) {
    const chordPos = (j / chordSteps) * chord;
    const x = chordPos / chord;
    
    // NACA-like airfoil shape
    const t = thickness * chord;
    const yt = 5 * t * (0.2969 * Math.sqrt(x) - 0.1260 * x - 0.3516 * x * x + 0.2843 * x * x * x - 0.1015 * x * x * x * x);
    
    // Add camber for high-lift wings
    const camber = 0.02 * chord * (x * (1 - x));
    
    const y = yt + camber;
    
    vertices.push(spanPos, y, chordPos + sweepOffset);
  }
}

// Create detailed ribs with lightening holes - HIGH DETAIL
function createRibsGeometry(config: any, span: number, rootChord: number, tipChord: number, thickness: number) {
  const ribsGroup = new THREE.Group();
  const numRibs = 12; // More ribs for detail
  
  for (let i = 0; i < numRibs; i++) {
    const t = i / (numRibs - 1);
    const spanPos = (t - 0.5) * span;
    const localChord = THREE.MathUtils.lerp(rootChord, tipChord, t);
    const localThickness = thickness * localChord;
    
    // Create airfoil shape for rib using Shape with holes
    const ribShape = new THREE.Shape();
    const airfoilPoints: THREE.Vector2[] = [];
    const steps = 60; // Higher resolution
    
    // Upper surface
    for (let j = 0; j <= steps; j++) {
      const x = j / steps;
      const chordPos = x * localChord;
      
      // NACA airfoil equation - more accurate
      const yt = 5 * localThickness * (
        0.2969 * Math.sqrt(x) - 
        0.1260 * x - 
        0.3516 * x * x + 
        0.2843 * x * x * x - 
        0.1015 * x * x * x * x
      );
      
      airfoilPoints.push(new THREE.Vector2(chordPos, yt));
    }
    
    // Lower surface (reverse direction)
    for (let j = steps; j >= 0; j--) {
      const x = j / steps;
      const chordPos = x * localChord;
      
      const yt = 5 * localThickness * (
        0.2969 * Math.sqrt(x) - 
        0.1260 * x - 
        0.3516 * x * x + 
        0.2843 * x * x * x - 
        0.1015 * x * x * x * x
      );
      
      airfoilPoints.push(new THREE.Vector2(chordPos, -yt * 0.6));
    }
    
    ribShape.setFromPoints(airfoilPoints);
    
    // Add multiple lightening holes (like your image)
    const numHoles = Math.floor(localChord / 1.5); // More holes for longer chords
    const holeRadius = localChord * 0.12; // Proportional holes
    const holeStartX = localChord * 0.25;
    const holeEndX = localChord * 0.75;
    const holeSpacing = (holeEndX - holeStartX) / Math.max(numHoles - 1, 1);
    
    for (let h = 0; h < numHoles; h++) {
      const holeX = holeStartX + h * holeSpacing;
      const holeY = localThickness * 0.05; // Slightly offset
      
      const holePath = new THREE.Path();
      holePath.absarc(holeX, holeY, holeRadius, 0, Math.PI * 2, false);
      ribShape.holes.push(holePath);
    }
    
    // Extrude rib with thin thickness
    const extrudeSettings = {
      depth: 0.08, // Thin rib plate
      bevelEnabled: true,
      bevelThickness: 0.01,
      bevelSize: 0.01,
      bevelSegments: 2
    };
    
    const ribGeometry = new THREE.ExtrudeGeometry(ribShape, extrudeSettings);
    const rib = new THREE.Mesh(ribGeometry);
    rib.position.set(spanPos, 0, 0);
    rib.rotation.y = Math.PI / 2;
    
    ribsGroup.add(rib);
  }
  
  return ribsGroup;
}

// Create cylindrical spar beams
function createSparsGeometry(span: number, chord: number) {
  const sparsGroup = new THREE.Group();
  
  // Front spar (cylindrical)
  const frontSparGeometry = new THREE.CylinderGeometry(
    0.15, // radiusTop
    0.15, // radiusBottom  
    span,  // height
    16,    // radialSegments
    1,     // heightSegments
    false  // openEnded
  );
  
  const frontSpar = new THREE.Mesh(frontSparGeometry);
  frontSpar.rotation.z = Math.PI / 2;
  frontSpar.position.set(0, 0, chord * 0.35);
  
  // Rear spar
  const rearSpar = frontSpar.clone();
  rearSpar.position.z = chord * 0.65;
  
  sparsGroup.add(frontSpar);
  sparsGroup.add(rearSpar);
  
  return sparsGroup;
}

