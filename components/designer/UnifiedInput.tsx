"use client";

import { useState, useEffect, useRef } from "react";
import { Mic, MicOff, Pencil, ChevronDown, Type } from "lucide-react";
import { useAircraftStore } from "@/store/aircraftStore";
import { useToast } from "@/hooks/use-toast";
import { Textarea } from "@/components/ui/textarea";
import WingPresets from "./WingPresets";

export default function UnifiedInput() {
  const [isRecording, setIsRecording] = useState(false);
  const [transcript, setTranscript] = useState("");
  const [textInput, setTextInput] = useState("");
  const [showSketch, setShowSketch] = useState(false);
  const recognitionRef = useRef<any>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [isTextMode, setIsTextMode] = useState(false);
  const [textLabels, setTextLabels] = useState<Array<{x: number, y: number, text: string}>>([]);
  const [editingLabel, setEditingLabel] = useState<{x: number, y: number} | null>(null);
  const [labelInput, setLabelInput] = useState("");
  
  const { addVoiceInput, addTextInput, setSketchData } = useAircraftStore();
  const { toast } = useToast();

  // Voice Recognition Setup
  useEffect(() => {
    if (typeof window !== "undefined") {
      const SpeechRecognition =
        (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;

      if (SpeechRecognition) {
        recognitionRef.current = new SpeechRecognition();
        recognitionRef.current.continuous = true;
        recognitionRef.current.interimResults = true;
        recognitionRef.current.lang = "en-US";

        recognitionRef.current.onresult = (event: any) => {
          let final = "";
          for (let i = event.resultIndex; i < event.results.length; i++) {
            if (event.results[i].isFinal) {
              final += event.results[i][0].transcript + " ";
            }
          }

          if (final) {
            setTranscript((prev) => prev + final);
            addVoiceInput({
              transcript: final.trim(),
              confidence: event.results[event.resultIndex][0].confidence || 1,
              timestamp: Date.now(),
            });
          }
        };

        recognitionRef.current.onerror = (event: any) => {
          console.error("Speech recognition error:", event.error);
          setIsRecording(false);
        };
      }
    }

    return () => {
      if (recognitionRef.current) {
        recognitionRef.current.stop();
      }
    };
  }, [addVoiceInput]);

  // Canvas Setup - Only when sketch pad opens
  useEffect(() => {
    if (!showSketch) return;
    
    const canvas = canvasRef.current;
    if (!canvas) return;

    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;

    const ctx = canvas.getContext("2d");
    if (ctx) {
      ctx.fillStyle = "#ffffff";
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      // Redraw text labels
      textLabels.forEach(label => {
        ctx.fillStyle = "#000000";
        ctx.font = "14px Arial";
        ctx.fillText(label.text, label.x, label.y);
      });
    }
  }, [showSketch]);

  // Redraw labels when they change
  useEffect(() => {
    if (!showSketch) return;
    
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (ctx && canvas) {
      // Redraw all labels
      textLabels.forEach(label => {
        ctx.fillStyle = "#000000";
        ctx.font = "14px Arial";
        ctx.fillText(label.text, label.x, label.y);
      });
    }
  }, [textLabels, showSketch]);

  const toggleRecording = () => {
    if (!recognitionRef.current) {
      toast({
        title: "Not supported",
        description: "Voice input requires Chrome, Edge, or Safari",
        variant: "destructive",
      });
      return;
    }

    if (isRecording) {
      recognitionRef.current.stop();
      setIsRecording(false);
    } else {
      recognitionRef.current.start();
      setIsRecording(true);
    }
  };

  const handleTextSubmit = () => {
    if (textInput.trim()) {
      addTextInput({
        text: textInput.trim(),
        timestamp: Date.now(),
      });
      setTextInput("");
    }
  };

  const getCoordinates = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return { x: 0, y: 0 };

    const rect = canvas.getBoundingClientRect();
    return {
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    };
  };

  const handlePresetSelect = (wingConfig: any) => {
    // Store preset config and notify user
    toast({
      title: "Preset loaded!",
      description: "Special wing configuration loaded. Click 'Apply Changes' to use it.",
    });
    console.log("Preset selected:", wingConfig);
  };

  const startDrawing = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (isTextMode) {
      // In text mode, add text label at click position
      const { x, y } = getCoordinates(e);
      setEditingLabel({ x, y });
      setLabelInput("");
      return;
    }
    
    setIsDrawing(true);
    const { x, y } = getCoordinates(e);
    const ctx = canvasRef.current?.getContext("2d");
    if (ctx) {
      ctx.beginPath();
      ctx.moveTo(x, y);
    }
  };

  const draw = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!isDrawing || isTextMode) return;

    const { x, y } = getCoordinates(e);
    const ctx = canvasRef.current?.getContext("2d");
    if (ctx) {
      ctx.strokeStyle = "#000000";
      ctx.lineWidth = 2;
      ctx.lineCap = "round";
      ctx.lineTo(x, y);
      ctx.stroke();
    }
  };

  const stopDrawing = () => {
    if (isDrawing && canvasRef.current) {
      setSketchData({
        imageData: canvasRef.current.toDataURL("image/png"),
        strokes: [],
      });
    }
    setIsDrawing(false);
  };

  const clearCanvas = () => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (ctx && canvas) {
      ctx.fillStyle = "#ffffff";
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      setTextLabels([]);
      setIsTextMode(false);
    }
  };

  const handleAddLabel = () => {
    if (editingLabel && labelInput.trim()) {
      const newLabel = { ...editingLabel, text: labelInput.trim() };
      const updatedLabels = [...textLabels, newLabel];
      setTextLabels(updatedLabels);
      setEditingLabel(null);
      setLabelInput("");
      setIsTextMode(false);
      
      // Redraw canvas with new label
      const canvas = canvasRef.current;
      const ctx = canvas?.getContext("2d");
      if (ctx && canvas) {
        // Redraw all labels
        updatedLabels.forEach(label => {
          ctx.fillStyle = "#000000";
          ctx.font = "14px Arial";
          ctx.fillText(label.text, label.x, label.y);
        });
      }
    }
  };

  const handleCancelLabel = () => {
    setEditingLabel(null);
    setLabelInput("");
    setIsTextMode(false);
  };

  return (
    <div className="space-y-4 p-6">
      {/* Voice Input */}
      <div className="flex flex-col items-center space-y-3">
        <button
          onClick={toggleRecording}
          className={`
            w-16 h-16 rounded-full flex items-center justify-center transition-all
            ${isRecording 
              ? "bg-red-500 hover:bg-red-600 animate-pulse" 
              : "bg-white/10 hover:bg-white/20 border border-white/20"
            }
          `}
        >
          {isRecording ? (
            <MicOff className="w-7 h-7 text-white" />
          ) : (
            <Mic className="w-7 h-7 text-white" />
          )}
        </button>
        <span className="text-white/50 text-sm font-light">
          {isRecording ? "Listening..." : "Click to talk"}
        </span>
      </div>

      {/* Transcript Display */}
      {transcript && (
        <div className="p-3 bg-white/5 border border-white/10 rounded-lg">
          <p className="text-white/70 text-sm">{transcript}</p>
        </div>
      )}

      {/* Divider */}
      <div className="flex items-center gap-3">
        <div className="flex-1 h-px bg-white/10" />
        <span className="text-white/30 text-xs">and/or</span>
        <div className="flex-1 h-px bg-white/10" />
      </div>

      {/* Text Input */}
      <div className="space-y-2">
        <Textarea
          ref={textareaRef}
          placeholder="Type text instead..."
          value={textInput}
          onChange={(e) => setTextInput(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter" && (e.ctrlKey || e.metaKey)) {
              handleTextSubmit();
            }
          }}
          className="bg-white/5 border-white/10 text-white placeholder:text-white/30 font-light resize-none h-24"
        />
        <button
          onClick={handleTextSubmit}
          disabled={!textInput.trim()}
          className="w-full px-4 py-2 rounded-lg bg-white/10 hover:bg-white/20 text-white text-sm font-light transition-all disabled:opacity-30 disabled:cursor-not-allowed"
        >
          Add Text Input
        </button>
      </div>

      {/* Divider */}
      <div className="flex items-center gap-3">
        <div className="flex-1 h-px bg-white/10" />
        <span className="text-white/30 text-xs">and/or</span>
        <div className="flex-1 h-px bg-white/10" />
      </div>

      {/* Sketch Toggle */}
      <button
        onClick={() => setShowSketch(!showSketch)}
        className="w-full px-4 py-3 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 text-white text-sm font-light flex items-center justify-center gap-2 transition-all"
      >
        <Pencil className="w-4 h-4" />
        {showSketch ? "Hide Sketch Pad" : "Show Sketch Pad"}
      </button>

      {/* Sketch Canvas */}
      {showSketch && (
        <div className="space-y-2">
          {/* Sketch Header with Arrow */}
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-light text-white/60">Sketch Pad</span>
            <button
              onClick={() => setShowSketch(false)}
              className="text-white/40 hover:text-white/70 transition-colors"
            >
              <ChevronDown className="w-4 h-4" />
            </button>
          </div>
          
          <div className="border border-white/10 rounded-lg overflow-hidden bg-white relative">
            <canvas
              ref={canvasRef}
              className={`w-full h-64 ${isTextMode ? "cursor-text" : "cursor-crosshair"}`}
              onMouseDown={startDrawing}
              onMouseMove={draw}
              onMouseUp={stopDrawing}
              onMouseLeave={stopDrawing}
            />
            
            {/* Text Input Overlay for Labeling */}
            {editingLabel && (
              <div 
                className="absolute bg-black/90 border border-white/20 rounded-lg p-2 shadow-lg"
                style={{ 
                  left: `${editingLabel.x}px`, 
                  top: `${editingLabel.y}px`,
                  transform: "translate(-50%, -100%)",
                  marginTop: "-8px"
                }}
              >
                <input
                  type="text"
                  value={labelInput}
                  onChange={(e) => setLabelInput(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      handleAddLabel();
                    } else if (e.key === "Escape") {
                      handleCancelLabel();
                    }
                  }}
                  placeholder="Enter label..."
                  autoFocus
                  className="bg-transparent text-white text-sm outline-none border-none w-32"
                />
                <div className="flex gap-1 mt-1">
                  <button
                    onClick={handleAddLabel}
                    className="text-xs px-2 py-0.5 bg-white/20 hover:bg-white/30 text-white rounded"
                  >
                    Add
                  </button>
                  <button
                    onClick={handleCancelLabel}
                    className="text-xs px-2 py-0.5 bg-white/10 hover:bg-white/20 text-white/70 rounded"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            )}
            
            {/* Text Mode Indicator */}
            {isTextMode && !editingLabel && (
              <div className="absolute top-2 left-2 bg-black/70 text-white text-xs px-2 py-1 rounded">
                Click on canvas to add text label
              </div>
            )}
          </div>
          
          <div className="flex gap-2">
            <button
              onClick={clearCanvas}
              className="flex-1 px-4 py-2 rounded-lg bg-white/5 hover:bg-white/10 text-white/50 text-xs font-light transition-all"
            >
              Clear Sketch
            </button>
            
            {/* Text Option Button */}
            <button
              onClick={() => setIsTextMode(!isTextMode)}
              className={`flex-1 px-4 py-2 rounded-lg text-xs font-light transition-all flex items-center justify-center gap-1.5 ${
                isTextMode 
                  ? "bg-white text-black" 
                  : "bg-white/5 hover:bg-white/10 text-white/50"
              }`}
            >
              <Type className="w-3 h-3" />
              {isTextMode ? "Drawing Mode" : "Add Text"}
            </button>
          </div>
        </div>
      )}

      {/* Instructions */}
      <div className="mt-6 p-3 bg-white/5 rounded-lg">
        <p className="text-white/40 text-xs font-light leading-relaxed">
          Combine voice, text, and sketch for best results. The AI will analyze all inputs together.
        </p>
      </div>

      {/* Divider */}
      <div className="flex items-center gap-3 my-6">
        <div className="flex-1 h-px bg-white/10" />
        <span className="text-white/30 text-xs">and/or use presets</span>
        <div className="flex-1 h-px bg-white/10" />
      </div>

      {/* Hardcoded Wing Presets */}
      <WingPresets onSelectPreset={handlePresetSelect} />
    </div>
  );
}

