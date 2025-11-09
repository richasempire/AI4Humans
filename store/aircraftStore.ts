import { create } from "zustand";
import { AircraftType, WingParameters, MultimodalInput } from "@/types";

interface AircraftStore {
  // Selected Aircraft
  selectedAircraft: AircraftType | null;
  setSelectedAircraft: (type: AircraftType) => void;

  // Wing Parameters
  wingParameters: WingParameters | null;
  setWingParameters: (params: WingParameters) => void;
  updateWingParameter: <K extends keyof WingParameters>(
    key: K,
    value: WingParameters[K]
  ) => void;

  // Multimodal Input
  multimodalInput: MultimodalInput;
  setSketchData: (sketch: MultimodalInput["sketch"]) => void;
  addVoiceInput: (voice: MultimodalInput["voice"][0]) => void;
  addTextInput: (text: MultimodalInput["text"][0]) => void;
  clearMultimodalInput: () => void;

  // UI State
  isGenerating: boolean;
  setIsGenerating: (value: boolean) => void;
  
  showWingControls: boolean;
  setShowWingControls: (value: boolean) => void;
}

const defaultWingParameters: WingParameters = {
  airfoilType: "NACA 2412",
  wingspan: 2000,
  rootChord: 800,
  tipChord: 480,
  taperRatio: 0.6,
  sweepAngle: 0,
  dihedralAngle: 0,
  nRibs: 8,
  sparCount: 2,
  hasLighteningHoles: true,
  holeRadius: 25,
  holeSpacing: 150,
  material: "Aluminum 2mm",
  thickness: 2,
  color: "#88ddff",
  opacity: 0.9,
};

export const useAircraftStore = create<AircraftStore>((set) => ({
  selectedAircraft: null,
  setSelectedAircraft: (type) =>
    set({ 
      selectedAircraft: type,
      wingParameters: null, // Don't set default parameters, let user design from scratch
    }),

  wingParameters: null,
  setWingParameters: (params) => set({ wingParameters: params }),
  updateWingParameter: (key, value) =>
    set((state) => ({
      wingParameters: state.wingParameters
        ? { ...state.wingParameters, [key]: value }
        : null,
    })),

  multimodalInput: {
    sketch: undefined,
    voice: [],
    text: [],
  },
  setSketchData: (sketch) =>
    set((state) => ({
      multimodalInput: { ...state.multimodalInput, sketch },
    })),
  addVoiceInput: (voice) =>
    set((state) => ({
      multimodalInput: {
        ...state.multimodalInput,
        voice: [...(state.multimodalInput.voice || []), voice],
      },
    })),
  addTextInput: (text) =>
    set((state) => ({
      multimodalInput: {
        ...state.multimodalInput,
        text: [...(state.multimodalInput.text || []), text],
      },
    })),
  clearMultimodalInput: () =>
    set({
      multimodalInput: {
        sketch: undefined,
        voice: [],
        text: [],
      },
    }),

  isGenerating: false,
  setIsGenerating: (value) => set({ isGenerating: value }),

  showWingControls: true,
  setShowWingControls: (value) => set({ showWingControls: value }),
}));

