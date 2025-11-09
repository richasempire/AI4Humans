# 🚀 Deploy to Vercel - Complete Guide

## 📋 Prerequisites

1. ✅ GitHub account
2. ✅ Vercel account (sign up with GitHub at [vercel.com](https://vercel.com))
3. ✅ Gemini API Key: `AIzaSyCussjJFgEL5xkeU8R5Tx-x43TWqexgObA`

---

## 📁 Step 1: Upload to GitHub

### Option A: Using GitHub Desktop (Easiest)
1. Download [GitHub Desktop](https://desktop.github.com/)
2. Click "File" → "Add Local Repository"
3. Select folder: `/Users/richagupta/Downloads/files/wing-designer-app`
4. Click "Create New Repository"
5. Name: `wing-designer-app`
6. Click "Publish Repository"
7. ✅ Uncheck "Keep this code private" (or keep private, both work)
8. Click "Publish Repository"

### Option B: Using Command Line
```bash
cd /Users/richagupta/Downloads/files/wing-designer-app

# Initialize git (if not already done)
git init

# Add all files
git add .

# Commit
git commit -m "Initial commit: Multimodal Aircraft Wing Designer"

# Create repo on GitHub, then:
git remote add origin https://github.com/YOUR_USERNAME/wing-designer-app.git
git branch -M main
git push -u origin main
```

---

## 🌐 Step 2: Deploy to Vercel

### Quick Deploy (Recommended)

1. **Go to Vercel**
   - Visit: https://vercel.com/new
   - Sign in with GitHub

2. **Import Repository**
   - Click "Import Git Repository"
   - Select `wing-designer-app`
   - Click "Import"

3. **Configure Project**
   - **Framework Preset:** Next.js (auto-detected)
   - **Root Directory:** `./` (leave as is)
   - **Build Command:** `npm run build` (auto-filled)
   - **Output Directory:** `.next` (auto-filled)

4. **Add Environment Variables** ⚠️ CRITICAL
   - Click "Environment Variables"
   - Add variable:
     ```
     Name:  GEMINI_API_KEY
     Value: AIzaSyCussjJFgEL5xkeU8R5Tx-x43TWqexgObA
     ```
   - Click "Add"

5. **Deploy**
   - Click "Deploy"
   - ⏳ Wait 2-3 minutes for build
   - ✅ Done!

---

## 🎯 Step 3: Access Your App

Once deployed, you'll get a URL like:
```
https://wing-designer-app-xxx.vercel.app
```

### What Works:
- ✅ Aircraft selection (Fighter/Commercial/Cargo)
- ✅ 3D COLLADA model viewing
- ✅ Wing designer with multimodal input
- ✅ Voice/Text/Sketch input
- ✅ AI wing generation (Gemini 2.0)
- ✅ Wing gallery with 8 special presets
- ✅ Parametric wing preview
- ✅ Real-time parameter controls

---

## 🔧 Troubleshooting

### Issue: "Generation failed"
**Solution:** Make sure `GEMINI_API_KEY` is set in Vercel
1. Go to project settings
2. Navigate to "Environment Variables"
3. Add: `GEMINI_API_KEY = AIzaSyCussjJFgEL5xkeU8R5Tx-x43TWqexgObA`
4. Redeploy

### Issue: 3D models not loading
**Solution:** Models are in `/public/models/` - they should work automatically
- Check browser console for errors
- Ensure files are committed to GitHub:
  - `public/models/fighter.dae`
  - `public/models/commercial.dae`
  - `public/models/cargo.dae`

### Issue: Build fails
**Solution:** Check build logs in Vercel dashboard
- Usually missing dependencies
- Run locally first: `npm install && npm run build`

---

## 🔄 Future Updates

After initial deployment, updates are automatic:

1. Make changes locally
2. Commit to GitHub:
   ```bash
   git add .
   git commit -m "Your update message"
   git push
   ```
3. Vercel auto-deploys! ✨

---

## 📱 Share Your App

Your deployed app URLs:
- **Main App:** `https://your-app.vercel.app`
- **Wing Gallery:** `https://your-app.vercel.app/wing-gallery`

Share with:
- Hackathon judges
- Team members
- Portfolio

---

## 🎨 Custom Domain (Optional)

1. Go to Vercel project settings
2. Click "Domains"
3. Add your custom domain
4. Follow DNS setup instructions

---

## 📊 Project Stats

- **Framework:** Next.js 14 (App Router)
- **Language:** TypeScript
- **3D:** Three.js + React Three Fiber
- **AI:** Google Gemini 2.0 Flash
- **UI:** Tailwind CSS + shadcn/ui
- **Features:** 
  - Multimodal input (voice/text/sketch)
  - 8 hardcoded wing presets
  - Real-time 3D visualization
  - Parametric wing generation
  - COLLADA model support

---

## ✅ Deployment Checklist

- [ ] Code pushed to GitHub
- [ ] Vercel project created
- [ ] `GEMINI_API_KEY` environment variable set
- [ ] First deployment successful
- [ ] Main page loads correctly
- [ ] 3D models visible
- [ ] Wing designer opens
- [ ] AI generation works
- [ ] Wing gallery accessible

---

## 🆘 Need Help?

**Vercel Support:**
- Docs: https://vercel.com/docs
- Discord: https://vercel.com/discord

**Next.js:**
- Docs: https://nextjs.org/docs

---

## 🎉 You're Done!

Your multimodal aircraft wing designer is now live on the internet! 🚀

**Demo Flow:**
1. Select Aircraft → Fighter/Commercial/Cargo
2. Click model → Opens designer
3. Use voice/text/sketch input
4. Generate AI wing design
5. Preview in 3D
6. Apply to aircraft
7. View in Wing Gallery

**Built for hackathon speed with production-ready code!** 💪

