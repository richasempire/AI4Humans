// Aircraft Types
export type AircraftType = "fighter" | "commercial" | "cargo";

export interface AircraftConfig {
  id: AircraftType;
  name: string;
  description: string;
  defaultWing: WingParameters;
  fuselageLength: number;
  fuselageRadius: number;
  modelPath: string; // Path to COLLADA model
  wingMeshNames?: string[]; // Names of wing meshes in the model
  scale?: number; // Scale factor for the model
  position?: [number, number, number]; // Position offset [x, y, z]
}

// Wing Parameters
export interface WingParameters {
  // Airfoil
  airfoilType: string; // e.g., "NACA 2412"
  
  // Dimensions
  wingspan: number; // mm
  rootChord: number; // mm
  tipChord: number; // mm
  taperRatio: number; // tip/root
  
  // Sweep and Dihedral
  sweepAngle: number; // degrees
  dihedralAngle: number; // degrees
  
  // Structure
  nRibs: number;
  sparCount: number;
  
  // Lightening holes
  hasLighteningHoles: boolean;
  holeRadius: number; // mm
  holeSpacing: number; // mm
  
  // Material
  material: string;
  thickness: number; // mm
  
  // Appearance
  color: string;
  opacity: number;
}

// Multimodal Input Types
export interface SketchData {
  imageData: string; // base64
  strokes: StrokePoint[][];
}

export interface StrokePoint {
  x: number;
  y: number;
  pressure?: number;
  timestamp: number;
}

export interface VoiceInput {
  transcript: string;
  confidence: number;
  timestamp: number;
}

export interface TextInput {
  text: string;
  timestamp: number;
}

export interface MultimodalInput {
  sketch?: SketchData;
  voice?: VoiceInput[];
  text?: TextInput[];
}

// AI Response
export interface AIWingResponse {
  parameters: WingParameters;
  reasoning: string;
  confidence: number;
}

// 3D Model Types
export interface Vector3D {
  x: number;
  y: number;
  z: number;
}

export interface WingGeometry {
  vertices: Vector3D[];
  faces: number[][];
  normals: Vector3D[];
}

