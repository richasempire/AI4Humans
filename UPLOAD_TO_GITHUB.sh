#!/bin/bash

# 🚀 Quick GitHub Upload Script
# This script helps you upload your project to GitHub

echo "🛩️  Wing Designer - GitHub Upload Helper"
echo "========================================"
echo ""

# Check if in correct directory
if [ ! -f "package.json" ]; then
    echo "❌ Error: Run this script from the wing-designer-app directory"
    exit 1
fi

echo "✅ Found project files"
echo ""

# Check if git is initialized
if [ ! -d ".git" ]; then
    echo "📦 Initializing git repository..."
    git init
    echo "✅ Git initialized"
else
    echo "✅ Git already initialized"
fi

echo ""
echo "📝 Adding files to git..."
git add .

echo ""
echo "💬 Committing files..."
git commit -m "Initial commit: Multimodal Aircraft Wing Designer

Features:
- Multimodal input (voice, text, sketch)
- AI-powered wing generation (Gemini 2.0)
- 3D visualization with Three.js
- 8 hardcoded wing presets
- Real-time parametric controls
- COLLADA model support
- Dark minimal UI"

echo ""
echo "✅ Files committed!"
echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "🌐 NEXT STEPS:"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""
echo "1. Create a new repository on GitHub:"
echo "   👉 https://github.com/new"
echo "   Name: wing-designer-app"
echo ""
echo "2. Run these commands (replace YOUR_USERNAME):"
echo ""
echo "   git remote add origin https://github.com/YOUR_USERNAME/wing-designer-app.git"
echo "   git branch -M main"
echo "   git push -u origin main"
echo ""
echo "3. Then deploy to Vercel:"
echo "   👉 https://vercel.com/new"
echo "   - Import your GitHub repo"
echo "   - Add environment variable: GEMINI_API_KEY"
echo "   - Deploy!"
echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""
echo "📖 Full guide: See DEPLOY_TO_VERCEL.md"
echo ""

