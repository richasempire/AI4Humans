"use client";

import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Mic, MicOff, Trash2 } from "lucide-react";
import { useAircraftStore } from "@/store/aircraftStore";
import { useToast } from "@/hooks/use-toast";

export default function VoiceInput() {
  const [isRecording, setIsRecording] = useState(false);
  const [transcript, setTranscript] = useState("");
  const [interimTranscript, setInterimTranscript] = useState("");
  const recognitionRef = useRef<any>(null);
  const { addVoiceInput, multimodalInput } = useAircraftStore();
  const { toast } = useToast();

  useEffect(() => {
    // Check if browser supports speech recognition
    if (typeof window !== "undefined") {
      const SpeechRecognition =
        (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;

      if (SpeechRecognition) {
        recognitionRef.current = new SpeechRecognition();
        recognitionRef.current.continuous = true;
        recognitionRef.current.interimResults = true;
        recognitionRef.current.lang = "en-US";

        recognitionRef.current.onresult = (event: any) => {
          let interim = "";
          let final = "";

          for (let i = event.resultIndex; i < event.results.length; i++) {
            const transcriptPiece = event.results[i][0].transcript;
            if (event.results[i].isFinal) {
              final += transcriptPiece + " ";
            } else {
              interim += transcriptPiece;
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
          setInterimTranscript(interim);
        };

        recognitionRef.current.onerror = (event: any) => {
          console.error("Speech recognition error:", event.error);
          setIsRecording(false);
          toast({
            title: "Voice recognition error",
            description: "Please check your microphone permissions",
            variant: "destructive",
          });
        };

        recognitionRef.current.onend = () => {
          if (isRecording) {
            recognitionRef.current.start();
          }
        };
      }
    }

    return () => {
      if (recognitionRef.current) {
        recognitionRef.current.stop();
      }
    };
  }, [isRecording, addVoiceInput, toast]);

  const toggleRecording = () => {
    if (!recognitionRef.current) {
      toast({
        title: "Not supported",
        description: "Speech recognition is not supported in your browser",
        variant: "destructive",
      });
      return;
    }

    if (isRecording) {
      recognitionRef.current.stop();
      setIsRecording(false);
      setInterimTranscript("");
    } else {
      recognitionRef.current.start();
      setIsRecording(true);
      toast({
        title: "Listening...",
        description: "Start describing your wing design",
      });
    }
  };

  const clearTranscript = () => {
    setTranscript("");
    setInterimTranscript("");
  };

  return (
    <div className="space-y-4">
      {/* Recording Button */}
      <div className="flex flex-col items-center justify-center p-8 border-2 border-dashed rounded-lg bg-muted/20">
        <Button
          size="lg"
          variant={isRecording ? "destructive" : "default"}
          onClick={toggleRecording}
          className={`w-20 h-20 rounded-full ${
            isRecording ? "animate-pulse" : ""
          }`}
        >
          {isRecording ? (
            <MicOff className="w-8 h-8" />
          ) : (
            <Mic className="w-8 h-8" />
          )}
        </Button>
        <p className="mt-4 text-sm font-medium">
          {isRecording ? "Recording... Click to stop" : "Click to start recording"}
        </p>
      </div>

      {/* Transcript Display */}
      <div className="min-h-[200px] p-4 border rounded-lg bg-white">
        <div className="flex justify-between items-center mb-2">
          <h4 className="text-sm font-semibold">Transcript:</h4>
          {transcript && (
            <Button
              variant="ghost"
              size="sm"
              onClick={clearTranscript}
            >
              <Trash2 className="w-4 h-4" />
            </Button>
          )}
        </div>
        <div className="text-sm space-y-2">
          {transcript && (
            <p className="text-foreground">{transcript}</p>
          )}
          {interimTranscript && (
            <p className="text-muted-foreground italic">{interimTranscript}</p>
          )}
          {!transcript && !interimTranscript && (
            <p className="text-muted-foreground italic">
              Your speech will appear here...
            </p>
          )}
        </div>
      </div>

      {/* Example Prompts */}
      <div className="text-sm text-muted-foreground p-3 bg-muted/50 rounded-lg">
        <p className="font-semibold mb-1">💡 Example commands:</p>
        <ul className="space-y-1 text-xs">
          <li>• &quot;I want a wing with 30 degrees sweep and high aspect ratio&quot;</li>
          <li>• &quot;Make it similar to a commercial airliner but smaller&quot;</li>
          <li>• &quot;Add more dihedral angle for stability&quot;</li>
          <li>• &quot;The wingspan should be about 2 meters&quot;</li>
        </ul>
      </div>

      {/* Voice Inputs History */}
      {multimodalInput.voice && multimodalInput.voice.length > 0 && (
        <div className="mt-4">
          <h4 className="text-sm font-semibold mb-2">Saved Voice Inputs:</h4>
          <div className="space-y-2">
            {multimodalInput.voice.map((input, idx) => (
              <div
                key={idx}
                className="p-2 bg-primary/5 border border-primary/20 rounded text-xs"
              >
                <p className="text-foreground">{input.transcript}</p>
                <p className="text-muted-foreground text-[10px] mt-1">
                  Confidence: {(input.confidence * 100).toFixed(0)}%
                </p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

