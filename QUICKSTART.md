# Quick Start Guide

Get your multimodal aircraft wing designer running in 5 minutes!

## Prerequisites

- Node.js 18+ ([Download](https://nodejs.org/))
- A Gemini API key ([Get one free](https://makersuite.google.com/app/apikey))

## Setup

### Option 1: Automated Setup (Recommended)

```bash
# Make setup script executable
chmod +x setup.sh

# Run setup
./setup.sh
```

### Option 2: Manual Setup

```bash
# 1. Install dependencies
npm install

# 2. Create environment file
cp .env.local.example .env.local

# 3. Edit .env.local and add your API key
# GEMINI_API_KEY=your_actual_api_key_here
```

## Run Locally

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Usage Workflow

### Step 1: Select Aircraft Type

Choose from:
- **Fighter Jet**: High-performance, swept wings, symmetric airfoil
- **Commercial Airliner**: Efficient, moderate sweep, cambered airfoil
- **Cargo Aircraft**: Heavy-lift, thick airfoil, high wing area

### Step 2: View 3D Model

- **Rotate**: Left-click + drag
- **Pan**: Right-click + drag  
- **Zoom**: Scroll wheel
- **Click wing** to open designer

### Step 3: Design Wing

#### Input Methods (Use Any or All)

**✏️ Sketch**
- Draw wing shape on canvas
- Show sweep angle and taper
- Indicate proportions

**🎤 Voice** (Chrome/Edge/Safari)
- Click microphone button
- Describe wing characteristics
- Example: *"I want a swept wing with 30 degrees sweep angle and high aspect ratio"*

**💬 Text**
- Type detailed description
- Use example prompts provided
- Be specific about parameters

#### Generate & Preview

1. Click **"Generate Wing Design"**
2. AI processes your multimodal input
3. Wing parameters appear in real-time
4. Preview updates in 3D viewer

#### Adjust Parameters

Fine-tune using sliders:
- Wingspan, chord lengths
- Sweep and dihedral angles
- Number of ribs and spars
- Airfoil type
- Color and opacity

#### Apply Design

Click **"Apply to Aircraft"** to see final result

## Example Use Cases

### Fighter Jet Wing

**Voice**: *"Create a fighter wing with 35 degree sweep, NACA 0012 symmetric airfoil, 1200mm wingspan"*

**Text**: *"High-performance wing for supersonic flight with low aspect ratio and aggressive sweep"*

**Sketch**: Draw a swept delta-like wing shape

### Commercial Wing

**Voice**: *"Design a commercial wing with 2500mm wingspan, 25 degree sweep, and 5 degrees dihedral"*

**Text**: *"Efficient high-altitude cruising wing with NACA 2412 airfoil and taper ratio of 0.5"*

**Sketch**: Draw a long, tapered wing with slight upward angle

### Cargo Wing

**Voice**: *"I need a cargo wing, thick airfoil, minimal sweep, 3500mm span"*

**Text**: *"Heavy-lift wing with NACA 4415 airfoil optimized for low-speed, high-weight operations"*

**Sketch**: Draw a wide, rectangular wing with minimal taper

## Keyboard Shortcuts

- **Ctrl/Cmd + Enter** in text input: Submit
- **ESC**: Close designer (return to aircraft view)

## Tips for Best Results

### Sketching
- Use side view perspective
- Draw clear wing outline
- Show sweep angle clearly
- Indicate taper direction

### Voice Input
- Speak clearly and at normal pace
- Mention specific numbers when possible
- Use technical terms (sweep, taper, aspect ratio)
- Grant microphone permissions

### Text Input
- Be specific about dimensions
- Mention aircraft type context
- Include airfoil preferences
- Specify design priorities (speed/efficiency/lift)

### Combining Inputs
- Sketch general shape
- Voice command for specific angles
- Text for detailed requirements
- AI synthesizes all inputs

## Troubleshooting

### Voice Not Working
- ✅ Use Chrome, Edge, or Safari
- ✅ Grant microphone permissions
- ✅ Ensure HTTPS (works on Vercel, localhost)

### AI Generation Fails
- ✅ Check GEMINI_API_KEY in .env.local
- ✅ Verify API key is valid
- ✅ Check API quota/limits
- ✅ Provide at least one input type

### 3D Model Not Showing
- ✅ Ensure WebGL is enabled in browser
- ✅ Update graphics drivers
- ✅ Try different browser
- ✅ Check browser console for errors

### Slow Performance
- ✅ Reduce number of ribs (use 4-8 instead of 16+)
- ✅ Close other browser tabs
- ✅ Disable browser extensions temporarily

## Next Steps

- ✨ Experiment with different aircraft types
- 🎨 Try multimodal combinations
- 📊 Compare parameter effects
- 🚀 Deploy to Vercel (see DEPLOYMENT.md)
- 🔧 Customize aircraft configs
- 🎯 Add custom airfoil profiles

## Resources

- **Project Structure**: See `STRUCTURE.md`
- **Deployment Guide**: See `DEPLOYMENT.md`
- **API Docs**: [Gemini API](https://ai.google.dev/docs)
- **Three.js Docs**: [threejs.org](https://threejs.org/docs/)
- **Next.js Docs**: [nextjs.org/docs](https://nextjs.org/docs)

## Support

For issues or questions:
1. Check browser console for errors
2. Verify environment variables
3. Review DEPLOYMENT.md troubleshooting
4. Check API key permissions

Happy designing! 🛩️✨

