# Installation Guide

## Prerequisites

- **Node.js** 18 or higher ([Download](https://nodejs.org/))
- **npm** (comes with Node.js)
- **Gemini API Key** ([Get Free Key](https://makersuite.google.com/app/apikey))

## Installation Steps

### Step 1: Navigate to Project Directory

```bash
cd wing-designer-app
```

### Step 2: Install Dependencies

Choose your preferred package manager:

**Using npm (Recommended):**
```bash
npm install
```

**Using yarn:**
```bash
yarn install
```

**Using pnpm:**
```bash
pnpm install
```

This will install:
- Next.js and React
- Three.js and React Three Fiber
- Google Gemini AI SDK
- shadcn/ui components
- All other dependencies (~22 packages)

Installation takes 1-3 minutes depending on your internet speed.

### Step 3: Set Up Environment Variables

**Option A: Copy from template**
```bash
cp .env.local.example .env.local
```

**Option B: Create manually**
```bash
touch .env.local
```

Then edit `.env.local`:
```env
GEMINI_API_KEY=your_actual_api_key_here
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

### Step 4: Get Your Gemini API Key

1. Go to [Google AI Studio](https://makersuite.google.com/app/apikey)
2. Sign in with your Google account
3. Click "Get API Key" or "Create API Key"
4. Copy the API key
5. Paste it into `.env.local` as shown above

**Note**: The API has a free tier with generous limits!

### Step 5: Start Development Server

```bash
npm run dev
```

You should see:
```
  ▲ Next.js 14.2.5
  - Local:        http://localhost:3000
  - Ready in 2.3s
```

### Step 6: Open in Browser

Navigate to [http://localhost:3000](http://localhost:3000)

You should see the Wing Designer landing page!

## Verify Installation

### Test Checklist

- [ ] Page loads without errors
- [ ] Can select aircraft type (Fighter/Commercial/Cargo)
- [ ] 3D aircraft model appears
- [ ] Can rotate/pan/zoom the 3D view
- [ ] Can click wing to open designer
- [ ] Sketch canvas works (draw with mouse)
- [ ] Voice input button appears (may need mic permission)
- [ ] Text input accepts descriptions
- [ ] Can adjust parameter sliders
- [ ] "Generate Wing Design" button works

## Troubleshooting

### Installation Issues

**Problem**: `npm install` fails

**Solution**:
```bash
# Clear npm cache
npm cache clean --force

# Delete package-lock.json
rm package-lock.json

# Try again
npm install
```

**Problem**: Permission errors on macOS/Linux

**Solution**:
```bash
sudo chown -R $USER ~/.npm
sudo chown -R $USER ./node_modules
```

### Runtime Issues

**Problem**: "Module not found" errors

**Solution**:
```bash
# Delete node_modules and reinstall
rm -rf node_modules
npm install
```

**Problem**: Port 3000 already in use

**Solution**:
```bash
# Use different port
npm run dev -- -p 3001

# Or kill process on port 3000
lsof -ti:3000 | xargs kill -9
```

**Problem**: 3D canvas shows black screen

**Solution**:
- Ensure WebGL is enabled in browser
- Try different browser (Chrome/Firefox recommended)
- Update graphics drivers
- Check browser console for Three.js errors

**Problem**: Voice input not working

**Solution**:
- Use Chrome, Edge, or Safari (Firefox not supported)
- Grant microphone permissions
- Ensure using HTTPS or localhost
- Check browser security settings

**Problem**: "Failed to generate wing"

**Solution**:
- Verify `GEMINI_API_KEY` in `.env.local` is correct
- Check API key has not expired
- Verify API quota not exceeded
- Check network connectivity
- Review browser console for detailed error

### Build Issues

**Problem**: `npm run build` fails

**Solution**:
```bash
# Clear Next.js cache
rm -rf .next

# Rebuild
npm run build
```

**Problem**: TypeScript errors

**Solution**:
```bash
# Check TypeScript version
npx tsc --version

# Verify tsconfig.json exists
cat tsconfig.json
```

## Additional Setup (Optional)

### Enable TypeScript Strict Mode

Already enabled in `tsconfig.json`:
```json
{
  "compilerOptions": {
    "strict": true
  }
}
```

### VS Code Extensions (Recommended)

Install these VS Code extensions for better DX:
- ESLint
- Prettier
- Tailwind CSS IntelliSense
- TypeScript Vue Plugin (Volar)

### Git Setup

```bash
# Initialize git (if not already)
git init

# Create .gitignore (already included)
# .env.local is already in .gitignore

# First commit
git add .
git commit -m "Initial commit: Wing Designer App"
```

## Development Scripts

```bash
# Start development server
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Run linter
npm run lint
```

## Production Build

Before deploying:

```bash
# Test production build locally
npm run build
npm start
```

Visit [http://localhost:3000](http://localhost:3000) to test production build.

## Next Steps

1. ✅ Test all features locally
2. ✅ Customize aircraft configurations
3. ✅ Deploy to Vercel (see DEPLOYMENT.md)
4. ✅ Set up custom domain (optional)

## Getting Help

If you encounter issues:

1. **Check Documentation**:
   - `QUICKSTART.md` - Quick start guide
   - `DEPLOYMENT.md` - Deployment help
   - `STRUCTURE.md` - Project architecture

2. **Check Browser Console**:
   - Press F12 to open DevTools
   - Look for red error messages
   - Check Network tab for API failures

3. **Check Server Logs**:
   - Terminal where `npm run dev` is running
   - Look for error stack traces

4. **Verify Environment**:
   ```bash
   node -v    # Should be 18+
   npm -v     # Should be 9+
   ```

## System Requirements

### Minimum
- Node.js 18+
- 2GB RAM
- Modern browser with WebGL support

### Recommended
- Node.js 20+
- 4GB RAM
- Chrome, Edge, or Safari
- Dedicated GPU for better 3D performance

## Success!

You should now have a fully functional wing designer running locally!

🎉 **Congratulations!** You're ready to design aircraft wings with AI!

For deployment instructions, see `DEPLOYMENT.md`.

