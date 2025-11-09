"use client";

import { useRef, useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Eraser, Trash2, Download } from "lucide-react";
import { useAircraftStore } from "@/store/aircraftStore";

export default function SketchInput() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [strokes, setStrokes] = useState<Array<Array<{ x: number; y: number; timestamp: number }>>>([]);
  const [currentStroke, setCurrentStroke] = useState<Array<{ x: number; y: number; timestamp: number }>>([]);
  const { setSketchData } = useAircraftStore();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Set canvas size
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;

    // Clear canvas
    ctx.fillStyle = "#ffffff";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Redraw all strokes
    ctx.strokeStyle = "#2563eb";
    ctx.lineWidth = 3;
    ctx.lineCap = "round";
    ctx.lineJoin = "round";

    strokes.forEach((stroke) => {
      if (stroke.length < 2) return;
      ctx.beginPath();
      ctx.moveTo(stroke[0].x, stroke[0].y);
      stroke.forEach((point) => {
        ctx.lineTo(point.x, point.y);
      });
      ctx.stroke();
    });
  }, [strokes]);

  const getCoordinates = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return { x: 0, y: 0 };

    const rect = canvas.getBoundingClientRect();
    
    if ('touches' in e) {
      return {
        x: e.touches[0].clientX - rect.left,
        y: e.touches[0].clientY - rect.top,
      };
    }
    
    return {
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    };
  };

  const startDrawing = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    setIsDrawing(true);
    const { x, y } = getCoordinates(e);
    setCurrentStroke([{ x, y, timestamp: Date.now() }]);
  };

  const draw = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    if (!isDrawing) return;

    const { x, y } = getCoordinates(e);
    const newPoint = { x, y, timestamp: Date.now() };
    setCurrentStroke((prev) => [...prev, newPoint]);

    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!ctx || !canvas) return;

    const lastStroke = currentStroke[currentStroke.length - 1];
    if (lastStroke) {
      ctx.strokeStyle = "#2563eb";
      ctx.lineWidth = 3;
      ctx.lineCap = "round";
      ctx.lineJoin = "round";
      ctx.beginPath();
      ctx.moveTo(lastStroke.x, lastStroke.y);
      ctx.lineTo(x, y);
      ctx.stroke();
    }
  };

  const stopDrawing = () => {
    if (isDrawing && currentStroke.length > 0) {
      setStrokes((prev) => [...prev, currentStroke]);
      setCurrentStroke([]);
      
      // Save to store
      const canvas = canvasRef.current;
      if (canvas) {
        setSketchData({
          imageData: canvas.toDataURL("image/png"),
          strokes: [...strokes, currentStroke],
        });
      }
    }
    setIsDrawing(false);
  };

  const clearCanvas = () => {
    setStrokes([]);
    setCurrentStroke([]);
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (ctx && canvas) {
      ctx.fillStyle = "#ffffff";
      ctx.fillRect(0, 0, canvas.width, canvas.height);
    }
    setSketchData(undefined);
  };

  const downloadSketch = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const link = document.createElement("a");
    link.download = "wing-sketch.png";
    link.href = canvas.toDataURL();
    link.click();
  };

  return (
    <div className="space-y-4">
      <div className="border-2 border-dashed border-primary/30 rounded-lg overflow-hidden bg-white">
        <canvas
          ref={canvasRef}
          className="sketch-canvas w-full h-[400px] cursor-crosshair"
          onMouseDown={startDrawing}
          onMouseMove={draw}
          onMouseUp={stopDrawing}
          onMouseLeave={stopDrawing}
          onTouchStart={startDrawing}
          onTouchMove={draw}
          onTouchEnd={stopDrawing}
        />
      </div>

      <div className="flex gap-2">
        <Button
          variant="outline"
          size="sm"
          onClick={clearCanvas}
          className="flex-1"
        >
          <Trash2 className="w-4 h-4 mr-2" />
          Clear
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={downloadSketch}
          className="flex-1"
          disabled={strokes.length === 0}
        >
          <Download className="w-4 h-4 mr-2" />
          Download
        </Button>
      </div>

      <div className="text-sm text-muted-foreground p-3 bg-muted/50 rounded-lg">
        <p className="font-semibold mb-1">💡 Tips:</p>
        <ul className="space-y-1 text-xs">
          <li>• Draw the wing shape from the side view</li>
          <li>• Show sweep angle and taper</li>
          <li>• Indicate approximate proportions</li>
        </ul>
      </div>
    </div>
  );
}

