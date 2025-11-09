import { NextRequest, NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { MultimodalInput, WingParameters } from "@/types";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || "");

export async function POST(request: NextRequest) {
  try {
    const input: MultimodalInput = await request.json();

    // Build the prompt from multimodal input
    let prompt = `You are an expert aerospace engineer specializing in aircraft wing design. 
Based on the following input, generate detailed wing parameters in JSON format.

`;

    // Add text descriptions
    if (input.text && input.text.length > 0) {
      prompt += "\nText descriptions:\n";
      input.text.forEach((t) => {
        prompt += `- ${t.text}\n`;
      });
    }

    // Add voice transcripts
    if (input.voice && input.voice.length > 0) {
      prompt += "\nVoice commands:\n";
      input.voice.forEach((v) => {
        prompt += `- ${v.transcript}\n`;
      });
    }

    prompt += `

Please analyze the requirements and generate wing parameters with the following structure:
{
  "airfoilType": "NACA XXXX",
  "wingspan": number (in mm, range 1000-5000),
  "rootChord": number (in mm, range 200-1500),
  "tipChord": number (calculated based on taper ratio),
  "taperRatio": number (range 0.3-1.0),
  "sweepAngle": number (in degrees, range 0-45),
  "dihedralAngle": number (in degrees, range -5 to 15),
  "nRibs": number (range 4-20),
  "sparCount": number (range 1-4),
  "hasLighteningHoles": boolean,
  "holeRadius": number (in mm, range 10-50),
  "holeSpacing": number (in mm, range 50-200),
  "material": string (e.g., "Aluminum 2mm", "Titanium 3mm", "Composite"),
  "thickness": number (in mm, range 1-5),
  "color": string (hex color - use only greys, whites, or pastel colors like #9ca3af, #d8b4fe, #a7f3d0, #fbbf24, #fca5a5 - NO blues),
  "opacity": number (range 0.1-1.0)
}

Important considerations:
- Fighter jets: High sweep (25-45°), symmetric airfoils (NACA 00XX), lower aspect ratio, grey colors
- Commercial aircraft: Moderate sweep (20-30°), cambered airfoils (NACA 2XXX), higher aspect ratio, positive dihedral (3-7°), pastel lavender
- Cargo aircraft: Low sweep (10-20°), thick airfoils (NACA 4XXX), positive dihedral (2-5°), pastel mint green
- Delta/Triangular wings ("pointed like pizza"): Very low taper ratio (0.2-0.3), high sweep (40-60°), symmetric airfoils
- Taper ratio = tipChord / rootChord (lower = more pointed/triangular)
- "Pointed" or "pizza-shaped" means delta/triangular wing with taper ratio 0.2-0.3
- Calculate tipChord based on wingspan and specified taper ratio
- Use monochrome or pastel colors only - absolutely NO blues

Provide ONLY the JSON object, no additional text or explanation.`;

    const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash-exp" });

    // Build parts for the API
    const parts: any[] = [{ text: prompt }];

    // Add sketch image if available
    if (input.sketch?.imageData) {
      const base64Data = input.sketch.imageData.split(",")[1];
      parts.push({
        inlineData: {
          mimeType: "image/png",
          data: base64Data,
        },
      });
      parts.push({
        text: "\nThe above sketch shows the desired wing shape. Consider the proportions and angles shown.",
      });
    }

    const result = await model.generateContent(parts);
    const response = await result.response;
    const text = response.text();

    // Parse the JSON response
    let wingParameters: WingParameters;
    try {
      // Extract JSON from markdown code blocks if present
      const jsonMatch = text.match(/```json\n([\s\S]*?)\n```/) || text.match(/```\n([\s\S]*?)\n```/);
      const jsonText = jsonMatch ? jsonMatch[1] : text;
      wingParameters = JSON.parse(jsonText);
      
      // Calculate tipChord if not provided
      if (!wingParameters.tipChord) {
        wingParameters.tipChord = wingParameters.rootChord * wingParameters.taperRatio;
      }
    } catch (parseError) {
      console.error("Failed to parse AI response:", text);
      throw new Error("Failed to parse wing parameters from AI response");
    }

    return NextResponse.json({
      success: true,
      parameters: wingParameters,
      rawResponse: text,
    });
  } catch (error) {
    console.error("Wing generation error:", error);
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : "Failed to generate wing",
      },
      { status: 500 }
    );
  }
}

