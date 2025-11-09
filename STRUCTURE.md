# Project Structure

```
wing-designer-app/
├── app/                          # Next.js App Router
│   ├── api/                     # API Routes
│   │   └── generate-wing/      # Gemini API integration
│   │       └── route.ts        # Wing generation endpoint
│   ├── globals.css             # Global styles
│   ├── layout.tsx              # Root layout with providers
│   └── page.tsx                # Main page (3-step workflow)
│
├── components/                  # React Components
│   ├── ui/                     # shadcn/ui components
│   │   ├── button.tsx
│   │   ├── card.tsx
│   │   ├── input.tsx
│   │   ├── label.tsx
│   │   ├── slider.tsx
│   │   ├── tabs.tsx
│   │   ├── textarea.tsx
│   │   ├── toast.tsx
│   │   └── toaster.tsx
│   │
│   ├── aircraft/               # Aircraft Selection Components
│   │   └── AircraftSelector.tsx
│   │
│   ├── canvas/                 # 3D Visualization Components
│   │   ├── AircraftViewer.tsx  # Main 3D viewer container
│   │   ├── AircraftModel.tsx   # Complete aircraft model
│   │   └── WingModel.tsx       # Wing geometry and rendering
│   │
│   └── designer/               # Wing Designer Components
│       ├── WingDesigner.tsx    # Main designer container
│       ├── SketchInput.tsx     # Canvas-based sketch input
│       ├── VoiceInput.tsx      # Web Speech API integration
│       ├── TextInput.tsx       # Text description input
│       ├── ParameterControls.tsx  # Manual parameter adjustments
│       └── WingPreview.tsx     # Real-time 3D preview
│
├── lib/                        # Utility Libraries
│   ├── utils.ts               # Common utilities (cn, formatters)
│   ├── aircraft-config.ts     # Aircraft type configurations
│   └── wing-generator.ts      # Wing geometry generation (NACA airfoils)
│
├── store/                      # State Management
│   └── aircraftStore.ts       # Zustand store (aircraft, wing params, multimodal input)
│
├── types/                      # TypeScript Types
│   └── index.ts               # All type definitions
│
├── hooks/                      # Custom React Hooks
│   └── use-toast.ts           # Toast notification hook
│
├── public/                     # Static Assets
│   └── (none yet)
│
├── .env.local.example         # Environment variables template
├── .env.example               # Alternative env template
├── .gitignore                 # Git ignore rules
├── .eslintrc.json            # ESLint configuration
├── next.config.mjs           # Next.js configuration
├── package.json              # Dependencies and scripts
├── postcss.config.mjs        # PostCSS configuration
├── tailwind.config.ts        # Tailwind CSS configuration
├── tsconfig.json             # TypeScript configuration
├── vercel.json               # Vercel deployment configuration
├── README.md                 # Project documentation
├── DEPLOYMENT.md             # Deployment guide
└── STRUCTURE.md              # This file
```

## Key Files Explained

### Configuration Files

- **`package.json`**: All dependencies including Three.js, React Three Fiber, Gemini AI, and UI libraries
- **`tsconfig.json`**: TypeScript configuration with path aliases (`@/*`)
- **`tailwind.config.ts`**: Tailwind CSS with shadcn/ui theming
- **`next.config.mjs`**: Next.js config with Three.js transpilation
- **`vercel.json`**: Vercel deployment settings and API configurations

### Core Application

- **`app/page.tsx`**: Main entry point with 3-step workflow orchestration
- **`app/layout.tsx`**: Root layout with global styles and toast provider
- **`app/globals.css`**: Global CSS with Tailwind and custom styles

### State Management

- **`store/aircraftStore.ts`**: Centralized Zustand store managing:
  - Selected aircraft type
  - Wing parameters
  - Multimodal input (sketch, voice, text)
  - UI state (loading, controls visibility)

### Type Definitions

- **`types/index.ts`**: Comprehensive TypeScript types for:
  - Aircraft configurations
  - Wing parameters
  - Multimodal input structures
  - 3D geometry data
  - AI responses

### Components Architecture

#### Aircraft Selection
- `AircraftSelector.tsx`: Card-based selection of fighter/commercial/cargo

#### 3D Visualization
- `AircraftViewer.tsx`: Canvas container with camera and controls
- `AircraftModel.tsx`: Complete aircraft with fuselage and wings
- `WingModel.tsx`: Parametric wing generation with NACA airfoils

#### Wing Designer
- `WingDesigner.tsx`: Main designer with tabs and preview
- `SketchInput.tsx`: HTML5 Canvas for sketching wing shapes
- `VoiceInput.tsx`: Web Speech API for voice commands
- `TextInput.tsx`: Textarea for detailed text descriptions
- `ParameterControls.tsx`: Sliders for manual parameter adjustment
- `WingPreview.tsx`: Real-time 3D preview of wing design

### API Routes

- **`app/api/generate-wing/route.ts`**: 
  - Accepts multimodal input (sketch, voice, text)
  - Sends to Gemini 1.5 Pro API
  - Parses and returns wing parameters

### Utilities

- **`lib/utils.ts`**: Helper functions (cn, formatNumber, debounce)
- **`lib/aircraft-config.ts`**: Default configurations for each aircraft type
- **`lib/wing-generator.ts`**: NACA 4-digit airfoil generation and wing geometry

## Data Flow

1. **User selects aircraft** → Updates `aircraftStore.selectedAircraft`
2. **User views 3D model** → `AircraftModel` renders with default wing
3. **User clicks wing** → Opens `WingDesigner`
4. **User provides input** (sketch/voice/text) → Stored in `aircraftStore.multimodalInput`
5. **User clicks "Generate"** → POST to `/api/generate-wing`
6. **Gemini API processes** → Returns wing parameters
7. **Parameters update store** → `WingModel` re-renders in real-time
8. **User adjusts sliders** → Direct updates to wing parameters
9. **User clicks "Apply"** → Returns to aircraft view with new wing

## Technology Stack

### Frontend
- **Next.js 14**: React framework with App Router
- **TypeScript**: Type-safe development
- **Tailwind CSS**: Utility-first styling
- **shadcn/ui**: Accessible UI components
- **Three.js**: 3D graphics engine
- **@react-three/fiber**: React renderer for Three.js
- **@react-three/drei**: Three.js helpers
- **Framer Motion**: Animations

### State & Data
- **Zustand**: Lightweight state management
- **Web Speech API**: Voice recognition
- **HTML5 Canvas**: Sketch input

### AI & Backend
- **Google Gemini 1.5 Pro**: Multimodal AI
- **Next.js API Routes**: Serverless functions

### Deployment
- **Vercel**: Hosting and deployment
- **Edge Runtime**: Fast API responses

## Development Workflow

1. Start dev server: `npm run dev`
2. Make changes to components
3. Hot reload updates automatically
4. Test multimodal inputs
5. Verify 3D rendering
6. Build for production: `npm run build`
7. Deploy: `vercel --prod`

## Extension Points

### Adding New Aircraft Types
1. Add config to `lib/aircraft-config.ts`
2. Update `AircraftType` in `types/index.ts`
3. Add icon to `components/aircraft/AircraftSelector.tsx`

### Adding New Input Methods
1. Create component in `components/designer/`
2. Add tab to `WingDesigner.tsx`
3. Update `MultimodalInput` type

### Custom Airfoils
1. Extend `wing-generator.ts` with new airfoil functions
2. Update parameter controls
3. Modify API prompt to include new options

### Advanced 3D Features
1. Add to `WingModel.tsx` or create new model components
2. Use drei helpers for effects
3. Update shader materials for custom rendering

