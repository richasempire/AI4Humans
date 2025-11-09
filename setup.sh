#!/bin/bash

echo "🛩️  Wing Designer App - Setup Script"
echo "======================================"
echo ""

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install Node.js 18 or higher."
    echo "   Download from: https://nodejs.org/"
    exit 1
fi

echo "✅ Node.js version: $(node -v)"
echo ""

# Check if npm is installed
if ! command -v npm &> /dev/null; then
    echo "❌ npm is not installed."
    exit 1
fi

echo "✅ npm version: $(npm -v)"
echo ""

# Install dependencies
echo "📦 Installing dependencies..."
npm install

if [ $? -ne 0 ]; then
    echo "❌ Failed to install dependencies"
    exit 1
fi

echo ""
echo "✅ Dependencies installed successfully!"
echo ""

# Check for .env.local
if [ ! -f .env.local ]; then
    echo "⚠️  .env.local file not found"
    echo "📝 Creating .env.local from template..."
    
    if [ -f .env.local.example ]; then
        cp .env.local.example .env.local
        echo "✅ Created .env.local file"
        echo ""
        echo "⚠️  IMPORTANT: Edit .env.local and add your Gemini API key!"
        echo "   Get your API key from: https://makersuite.google.com/app/apikey"
        echo ""
    else
        echo "❌ .env.local.example not found"
    fi
else
    echo "✅ .env.local file exists"
fi

echo ""
echo "🎉 Setup complete!"
echo ""
echo "Next steps:"
echo "1. Edit .env.local and add your GEMINI_API_KEY"
echo "2. Run: npm run dev"
echo "3. Open: http://localhost:3000"
echo ""
echo "For deployment instructions, see DEPLOYMENT.md"
echo ""

