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

## ✨ Complete Features List

### 🎤 Multimodal Input System

#### Voice Input
- **Web Speech API Integration** - Real-time speech recognition
- **Continuous Listening** - Toggle recording on/off
- **Live Transcript Display** - See your voice commands as you speak
- **Multi-language Support** - Configured for English (US)
- **Confidence Scoring** - AI receives confidence levels for better interpretation
- **Example Commands:**
  - "I want a 35 degree sweep angle"
  - "Design a high-performance fighter wing"
  - "Make it pointed like pizza"
  - "Increase wingspan to 3000mm"

#### Text Input
- **Rich Text Area** - Multi-line text input for detailed specifications
- **Keyboard Shortcuts** - Ctrl/Cmd + Enter to submit
- **Multiple Text Entries** - Add multiple text descriptions
- **Timestamp Tracking** - All inputs are timestamped for context
- **Example Inputs:**
  - "Design a high-performance wing with NACA 0012 symmetric airfoil, 35° sweep, suitable for supersonic flight"
  - "Efficient commercial wing with 2400mm span, 25° sweep, NACA 2412 airfoil, 5° dihedral for stability"

#### Sketch Input
- **Interactive Canvas** - Draw wing shapes directly on canvas
- **Text Labeling** - Add text labels directly on sketches for annotations
- **Drawing Mode Toggle** - Switch between drawing and text labeling modes
- **Clear Function** - Reset canvas with one click
- **High-Resolution Export** - Sketches exported as PNG for AI analysis
- **Visual Feedback** - Cursor changes to crosshair when drawing, text cursor when labeling
- **Label Features:**
  - Click anywhere on canvas to add label
  - Inline text input with Enter/Escape shortcuts
  - Multiple labels per sketch
  - Labels saved with sketch image

### 🤖 AI-Powered Generation

#### Google Gemini 2.0 Flash Integration
- **Multimodal Analysis** - AI processes sketch, voice, and text simultaneously
- **Contextual Understanding** - AI understands aircraft type and design intent
- **Parametric Output** - Generates complete wing parameter sets
- **Smart Defaults** - Aircraft-specific parameter suggestions
- **Color Constraints** - Enforces monochrome/pastel palette (no blues)
- **Delta Wing Recognition** - Understands "pizza-shaped" or "pointed" wings
- **Error Handling** - Graceful fallbacks with user-friendly error messages

#### Generated Parameters Include:
- Airfoil type (NACA series)
- Wingspan (1000-5000mm range)
- Root chord and tip chord
- Taper ratio (0.3-1.0)
- Sweep angle (0-45°)
- Dihedral angle (-5 to 15°)
- Number of ribs (4-20)
- Spar count (1-4)
- Lightening hole configuration
- Material and thickness
- Color and opacity

### 🎯 3D Visualization & Rendering

#### Real-Time 3D Preview
- **Three.js Integration** - Hardware-accelerated WebGL rendering
- **Orbit Controls** - Rotate, pan, and zoom with mouse/touch
- **Perspective Camera** - Professional 3D viewing experience
- **Technical Grid** - Visible grid for spatial reference
- **Studio Lighting** - Multiple light sources for realistic shadows
- **Smooth Animations** - 60fps rendering with damping controls

#### COLLADA Model Support
- **3D Aircraft Models** - Load and display .dae format models
- **Fighter Jet Model** - High-detail fighter aircraft visualization
- **Commercial Aircraft Model** - Passenger aircraft representation
- **Cargo Aircraft Model** - Heavy-lift aircraft visualization
- **Model Positioning** - Customizable per-aircraft positioning
- **Click Interaction** - Entire model is clickable to open designer
- **Shadow Casting** - Realistic shadow rendering

#### Wing Model Rendering
- **Parametric Geometry** - Real-time wing generation from parameters
- **NACA Airfoil Profiles** - Mathematically accurate airfoil shapes
- **Transparent Skin** - Glass-like outer surface with transmission
- **Structural Ribs** - Visible internal rib structure with lightening holes
- **Spar Beams** - Cylindrical front and rear spars
- **Material Properties** - Metallic materials with emissive glow
- **Bilateral Symmetry** - Left and right wings rendered automatically

### 🏗️ Structural Detail Features

#### Detailed Rib System
- **Multiple Ribs** - 4-20 ribs configurable per wing
- **NACA Airfoil Shape** - Each rib follows airfoil profile
- **Lightening Holes** - Circular holes in ribs for weight reduction
- **Proportional Sizing** - Holes scale with rib size
- **Beveled Edges** - Smooth edges for realistic appearance
- **Metallic Material** - Red/orange metallic finish with emissive glow
- **Visible Through Skin** - Ribs visible through transparent skin

#### Spar System
- **Front Spar** - Cylindrical beam at 35% chord position
- **Rear Spar** - Cylindrical beam at 65% chord position
- **Spanwise Orientation** - Spans entire wing length
- **Metallic Finish** - Gold/orange metallic material
- **Structural Accuracy** - Realistic aircraft structural representation

#### Transparent Skin
- **Physical Material** - Uses Three.js MeshPhysicalMaterial
- **Glass-like Appearance** - Transmission, IOR, and clearcoat properties
- **Attached to Ribs** - Skin precisely follows rib positions
- **High Resolution** - Smooth curved surfaces
- **Edge Wires** - Subtle wireframe showing attachment points
- **Customizable Opacity** - Adjustable transparency

### 🎨 Special Wing Presets

#### 8 Hardcoded Wing Designs

**Oblique Wings (2 presets):**
1. **Pizza Wing (Oblique)** - Asymmetric oblique wing with 18m left span, 6m right span
2. **NASA AD-1 Oblique** - Pivoting oblique wing, can rotate 0-60°

**Curved Wings (3 presets):**
3. **Crescent Wing** - Compound sweep (50° inner, 35° mid, 20° outer)
4. **Scimitar Wing** - Parabolic curved leading edge
5. **Boeing 787 Style** - Elegant bezier curve with raked wingtips

**High-Camber Wings (3 presets):**
6. **Supercritical Airfoil** - 14% thick, 6% camber, flat-top design
7. **High-Lift STOL** - NACA 4415, 15% thick, 4% camber
8. **Aerobatic Symmetric** - NACA 0018, 18% thick, symmetric profile

#### Preset Features
- **Category Filtering** - Filter by oblique, curved, or high-camber
- **Visual Preview** - Color-coded preset cards
- **One-Click Loading** - Instant preset application
- **Gallery View** - Dedicated `/wing-gallery` page for all presets
- **3D Interactive** - Rotate and inspect each preset in 3D

### ⚙️ Parameter Controls

#### Real-Time Adjustment
- **Wingspan Slider** - Adjust from 1000mm to 5000mm
- **Root Chord Control** - Set root chord dimension
- **Tip Chord Control** - Set tip chord dimension
- **Taper Ratio** - Automatic calculation or manual override
- **Sweep Angle** - Adjust leading edge sweep (0-45°)
- **Dihedral Angle** - Wing upward angle (-5 to 15°)
- **Airfoil Selection** - Choose from NACA series (0012, 2412, 4412, etc.)
- **Rib Count** - Number of structural ribs (4-20)
- **Spar Count** - Number of spars (1-4)
- **Lightening Holes** - Toggle and configure hole properties
- **Material Selection** - Choose material type and thickness
- **Color Picker** - Select from monochrome/pastel palette
- **Opacity Control** - Adjust skin transparency

#### Live Preview
- **Instant Updates** - Changes reflect immediately in 3D
- **No Regeneration Needed** - Direct parameter manipulation
- **Smooth Transitions** - Animated parameter changes

### 📊 Performance Analysis

#### Graph Placeholders (Ready for Implementation)
- **Lift Distribution Graph** - Line chart showing lift across wing span
- **Drag Coefficient Graph** - Bar chart displaying drag values
- **Pressure Distribution Graph** - Area chart for pressure visualization
- **Technical Grid Background** - Professional graph styling
- **Responsive Layout** - Three-column grid layout
- **Future Integration** - Ready for CFD or analytical data

### 🎨 User Interface Features

#### Minimal Apple-Style Design
- **Dark Theme** - Black background with white/grey accents
- **No Blue Colors** - Monochrome and pastel palette only
- **Full-Screen 3D** - Immersive viewing experience
- **Clean Typography** - Light font weights, tight tracking
- **Subtle Animations** - Smooth transitions and hover effects
- **Backdrop Blur** - Glass-morphism effects on panels
- **Technical Aesthetics** - Grid patterns, minimal UI elements

#### Layout Features
- **Three-Panel Design** - Input, Preview, Parameters
- **Responsive Panels** - Flexible sizing with proper overflow handling
- **No Scroll on Presets** - Compact preset section
- **Graphs at Bottom** - Performance analysis below 3D preview
- **Collapsible Sections** - Sketch pad with arrow collapse
- **Side-by-Side Buttons** - Generate and Apply buttons aligned

#### Navigation
- **Aircraft Selection** - One-click selection, auto-proceed
- **Change Aircraft** - Easy switching between aircraft types
- **Close Designer** - X button to return to model view
- **Back Navigation** - Arrow button to return to selection

### ✈️ Aircraft Types

#### Fighter Jet
- **High Sweep Angle** - 25-45° typical sweep
- **Symmetric Airfoils** - NACA 00XX series
- **Lower Aspect Ratio** - Compact design
- **Grey Color Scheme** - Military aesthetic
- **Supersonic Optimized** - Designed for high-speed flight

#### Commercial Aircraft
- **Moderate Sweep** - 20-30° sweep angle
- **Cambered Airfoils** - NACA 2XXX series
- **Higher Aspect Ratio** - Efficient long-range design
- **Positive Dihedral** - 3-7° for stability
- **Pastel Lavender** - Soft color palette

#### Cargo Aircraft
- **Low Sweep** - 10-20° sweep angle
- **Thick Airfoils** - NACA 4XXX series
- **Positive Dihedral** - 2-5° for stability
- **Heavy Lift Design** - Optimized for payload
- **Pastel Mint Green** - Distinctive color scheme

### 🔧 Technical Features

#### State Management
- **Zustand Store** - Lightweight state management
- **Centralized State** - All app state in one store
- **Type-Safe** - Full TypeScript support
- **Reactive Updates** - Components update automatically

#### Type Safety
- **Full TypeScript** - 100% type coverage
- **Strict Mode** - No implicit any
- **Interface Definitions** - Comprehensive type definitions
- **Type Inference** - Smart type inference throughout

#### Performance
- **Code Splitting** - Automatic route-based splitting
- **Lazy Loading** - Components load on demand
- **Optimized Rendering** - React 18 concurrent features
- **Efficient 3D** - Optimized Three.js rendering

#### Developer Experience
- **Hot Reload** - Instant development feedback
- **Error Boundaries** - Graceful error handling
- **Console Logging** - Helpful debug information
- **Clean Code** - Well-organized, documented codebase

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
