"use client";

import { useState } from "react";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Send, Trash2 } from "lucide-react";
import { useAircraftStore } from "@/store/aircraftStore";

export default function TextInput() {
  const [text, setText] = useState("");
  const { addTextInput, multimodalInput } = useAircraftStore();

  const handleSubmit = () => {
    if (text.trim()) {
      addTextInput({
        text: text.trim(),
        timestamp: Date.now(),
      });
      setText("");
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && (e.ctrlKey || e.metaKey)) {
      handleSubmit();
    }
  };

  return (
    <div className="space-y-4">
      {/* Text Input Area */}
      <div className="space-y-2">
        <Textarea
          placeholder="Describe your wing design in detail..."
          value={text}
          onChange={(e) => setText(e.target.value)}
          onKeyPress={handleKeyPress}
          className="min-h-[200px] resize-none"
        />
        <div className="flex justify-between items-center text-xs text-muted-foreground">
          <span>{text.length} characters</span>
          <span>Press Ctrl+Enter to submit</span>
        </div>
      </div>

      <Button
        onClick={handleSubmit}
        disabled={!text.trim()}
        className="w-full"
      >
        <Send className="w-4 h-4 mr-2" />
        Add to Design Input
      </Button>

      {/* Example Prompts */}
      <div className="text-sm text-muted-foreground p-3 bg-muted/50 rounded-lg">
        <p className="font-semibold mb-2">💡 Example descriptions:</p>
        <div className="space-y-2 text-xs">
          <button
            onClick={() =>
              setText(
                "I need a high-performance wing with 35 degree sweep, low aspect ratio for maneuverability, and NACA 0012 symmetric airfoil suitable for supersonic flight."
              )
            }
            className="w-full text-left p-2 hover:bg-muted rounded border border-transparent hover:border-primary/20 transition-colors"
          >
            • High-performance fighter wing with sweep and symmetric airfoil
          </button>
          <button
            onClick={() =>
              setText(
                "Design an efficient commercial wing with wingspan of 3500mm, 25 degree sweep, NACA 2412 airfoil, taper ratio of 0.5, and 5 degrees of dihedral for stability."
              )
            }
            className="w-full text-left p-2 hover:bg-muted rounded border border-transparent hover:border-primary/20 transition-colors"
          >
            • Efficient commercial airliner wing with dihedral
          </button>
          <button
            onClick={() =>
              setText(
                "Create a cargo wing optimized for heavy lift with thick airfoil NACA 4415, minimal sweep (15 degrees), large chord length, and high structural strength."
              )
            }
            className="w-full text-left p-2 hover:bg-muted rounded border border-transparent hover:border-primary/20 transition-colors"
          >
            • Heavy-lift cargo wing with thick airfoil
          </button>
        </div>
      </div>

      {/* Saved Text Inputs */}
      {multimodalInput.text && multimodalInput.text.length > 0 && (
        <div className="mt-4">
          <h4 className="text-sm font-semibold mb-2">Saved Text Inputs:</h4>
          <div className="space-y-2">
            {multimodalInput.text.map((input, idx) => (
              <div
                key={idx}
                className="p-3 bg-primary/5 border border-primary/20 rounded text-xs"
              >
                <p className="text-foreground">{input.text}</p>
                <p className="text-muted-foreground text-[10px] mt-1">
                  {new Date(input.timestamp).toLocaleTimeString()}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

