# 🛩️ AI4AeroDesigners

**AI-Powered Multimodal Aircraft Wing Designer**

A Next.js 14 web application that lets you design parametric aircraft wings using multimodal input (voice, text, and sketches) powered by Google Gemini 2.0 Flash.

![Made with Next.js](https://img.shields.io/badge/Next.js-14-black)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue)
![Three.js](https://img.shields.io/badge/Three.js-3D-green)
![Gemini AI](https://img.shields.io/badge/Gemini-2.0-purple)

## 🚀 Quick Deploy

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new)

**See [DEPLOY_TO_VERCEL.md](./DEPLOY_TO_VERCEL.md) for complete instructions.**

## ✨ Features

### Core Functionality
- 🎤 **Voice Input** - Speak your wing design requirements  
- ✍️ **Text Input** - Type detailed specifications  
- ✏️ **Sketch Input** - Draw wing shapes on canvas with text labels
- 🤖 **AI Generation** - Gemini 2.0 analyzes all inputs and generates parametric wings  
- 🎯 **3D Visualization** - Real-time Three.js preview with COLLADA models  
- 🏗️ **Structural Detail** - Ribs with lightening holes, spars, transparent skin  
- 🎨 **8 Special Presets** - Pizza/oblique, curved, high-camber wings  
- ⚡ **Real-time Parameters** - Adjust wingspan, sweep, taper, airfoil, etc.  

### Aircraft Types
- ✈️ **Fighter Jet** - High sweep, symmetric airfoils
- 🛫 **Commercial** - Efficient, high aspect ratio
- 📦 **Cargo** - Heavy lift, thick airfoils

## 🎬 How It Works

1. **Select Aircraft** - Choose Fighter, Commercial, or Cargo
2. **View Model** - See 3D COLLADA aircraft model
3. **Click Wing** - Opens multimodal designer interface
4. **Provide Input:**
   - 🎤 Say: "I want 35 degree sweep angle"
   - ✍️ Type: "Design a high-performance fighter wing"
   - ✏️ Draw: Sketch your wing shape with labels
5. **Generate** - AI creates parametric wing design
6. **Preview & Edit** - View in 3D with ribs, spars, and skin
7. **Apply** - Wing updates on aircraft model

## 🛠️ Tech Stack

### Frontend
- **Framework:** Next.js 14 (App Router)
- **Language:** TypeScript
- **UI Library:** React 18
- **Styling:** Tailwind CSS + shadcn/ui
- **3D Graphics:** 
  - Three.js
  - @react-three/fiber
  - @react-three/drei
  - ColladaLoader for .dae models

### AI & Input
- **AI Model:** Google Gemini 2.0 Flash (multimodal)
- **Voice:** Web Speech API
- **Sketch:** HTML Canvas API
- **State:** Zustand

### Features
- NACA airfoil generation
- Parametric wing geometry
- Transparent skin with ribs
- Lightening holes in ribs
- Structural spars
- Real-time parameter controls

## 📦 Installation

### Prerequisites
- Node.js 18+
- npm or yarn
- Gemini API Key ([Get here](https://aistudio.google.com/app/apikey))

### Local Development

```bash
# 1. Clone the repository
git clone https://github.com/richasempire/AI4Humans.git
cd AI4Humans

# 2. Install dependencies
npm install

# 3. Create environment file
# Add your Gemini API key:
# GEMINI_API_KEY=your_api_key_here
# (See .env.example)

# 4. Run development server
npm run dev

# 5. Open http://localhost:3000
```

## 🌐 Deployment to Vercel

**Full guide:** [DEPLOY_TO_VERCEL.md](./DEPLOY_TO_VERCEL.md)

**Quick steps:**
1. Push code to GitHub
2. Import project on [Vercel](https://vercel.com/new)
3. Add environment variable: `GEMINI_API_KEY`
4. Deploy!

## 📁 Project Structure

```
wing-designer-app/
├── app/
│   ├── api/
│   │   └── generate-wing/      # Gemini API endpoint
│   │       └── route.ts
│   ├── wing-gallery/           # Special wing presets gallery
│   │   └── page.tsx
│   ├── globals.css             # Dark theme styles
│   ├── layout.tsx              # Root layout
│   └── page.tsx                # Main 3-step workflow
├── components/
│   ├── aircraft/
│   │   └── AircraftSelector.tsx
│   ├── canvas/
│   │   ├── AircraftModel.tsx   # Main aircraft with wings
│   │   ├── AircraftViewer.tsx  # 3D viewer
│   │   ├── ColladaModel.tsx    # .dae loader
│   │   ├── SpecialWingModel.tsx # Hardcoded wings with ribs
│   │   └── WingModel.tsx       # Parametric wing generator
│   ├── designer/
│   │   ├── UnifiedInput.tsx    # Voice/Text/Sketch
│   │   ├── WingPresets.tsx     # Hardcoded presets
│   │   ├── ParameterControls.tsx
│   │   └── WingPreview.tsx
│   └── ui/                     # shadcn/ui components
├── lib/
│   ├── aircraft-config.ts      # Aircraft definitions
│   ├── hardcoded-wings.ts      # 8 special wing configs
│   ├── wing-generator.ts       # NACA airfoil math
│   └── utils.ts
├── public/
│   └── models/                 # COLLADA 3D models
│       ├── fighter.dae
│       ├── commercial.dae
│       └── cargo.dae
├── store/
│   └── aircraftStore.ts        # Zustand state
└── types/
    └── index.ts                # TypeScript types
```

## 🎨 Wing Gallery

Access `/wing-gallery` to view 8 hardcoded special wing designs:

**Oblique Wings:**
- Pizza Wing (asymmetric oblique)
- NASA AD-1 (pivoting oblique)

**Curved Wings:**
- Crescent Wing (compound sweep)
- Scimitar Wing (curved leading edge)
- Boeing 787 Style (elegant bezier curve)

**High-Camber:**
- Supercritical Airfoil
- High-Lift STOL
- Aerobatic Symmetric (NACA 0018)

## 🔧 Configuration

### Environment Variables

```bash
# Required
GEMINI_API_KEY=your_gemini_api_key

# Optional (auto-set by Vercel)
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

### Customize Aircraft

Edit `lib/aircraft-config.ts` to:
- Change default wing parameters
- Modify aircraft models
- Adjust colors and materials

## 📊 API Routes

### POST `/api/generate-wing`

Generate wing parameters from multimodal input.

**Request:**
```json
{
  "text": [{"text": "35 degree sweep", "timestamp": 123}],
  "voice": [{"transcript": "pointed wing", "confidence": 0.9}],
  "sketch": {"imageData": "data:image/png;base64,..."}
}
```

**Response:**
```json
{
  "success": true,
  "parameters": {
    "airfoilType": "NACA 0012",
    "wingspan": 3000,
    "sweepAngle": 35,
    "taperRatio": 0.3,
    ...
  }
}
```

## 🎯 Hackathon Ready

Built for speed with:
- ✅ Hardcoded wing presets (no AI needed for demos)
- ✅ Multimodal input showcases AI capabilities
- ✅ Beautiful minimal UI
- ✅ One-click Vercel deployment
- ✅ Mobile responsive
- ✅ Fast load times

## 📝 License

MIT

## 🙏 Acknowledgments

- Three.js community
- shadcn/ui components
- Google Gemini API
- Next.js team

---

**Built with ❤️ for aerospace innovation**
