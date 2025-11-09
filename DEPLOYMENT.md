# Deployment Guide

## Prerequisites

1. **Vercel Account**: Sign up at [vercel.com](https://vercel.com)
2. **Gemini API Key**: Get your API key from [Google AI Studio](https://makersuite.google.com/app/apikey)

## Local Development

### 1. Install Dependencies

```bash
npm install
```

### 2. Set Up Environment Variables

Create a `.env.local` file in the root directory:

```bash
GEMINI_API_KEY=your_actual_api_key_here
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

### 3. Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Deploy to Vercel

### Method 1: Vercel CLI (Recommended)

1. **Install Vercel CLI**

```bash
npm install -g vercel
```

2. **Login to Vercel**

```bash
vercel login
```

3. **Deploy**

```bash
vercel
```

4. **Set Environment Variables**

```bash
vercel env add GEMINI_API_KEY
```

Enter your Gemini API key when prompted.

5. **Deploy to Production**

```bash
vercel --prod
```

### Method 2: GitHub Integration

1. **Push to GitHub**

```bash
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin YOUR_GITHUB_REPO_URL
git push -u origin main
```

2. **Import to Vercel**

- Go to [vercel.com/new](https://vercel.com/new)
- Import your GitHub repository
- Configure environment variables:
  - `GEMINI_API_KEY`: Your Gemini API key

3. **Deploy**

- Click "Deploy"
- Vercel will automatically deploy on every push to main

## Environment Variables

Set these in Vercel Dashboard (Settings → Environment Variables):

| Variable | Description | Required |
|----------|-------------|----------|
| `GEMINI_API_KEY` | Google Gemini API key for AI wing generation | Yes |
| `NEXT_PUBLIC_APP_URL` | Your app's public URL | Optional |

## Post-Deployment

### 1. Test Your Deployment

Visit your deployed URL and test:
- Aircraft selection
- 3D visualization
- Multimodal input (sketch, voice, text)
- AI wing generation
- Parameter adjustments

### 2. Monitor Performance

- Check Vercel Analytics dashboard
- Monitor API usage in Google AI Studio
- Set up error tracking (optional: Sentry, LogRocket)

### 3. Custom Domain (Optional)

1. Go to Vercel Dashboard → Your Project → Settings → Domains
2. Add your custom domain
3. Follow DNS configuration instructions

## Troubleshooting

### API Key Issues

If you see "Failed to generate wing":
- Verify `GEMINI_API_KEY` is set correctly in Vercel
- Check API key is valid in Google AI Studio
- Ensure API key has proper permissions

### Build Errors

```bash
# Clear cache and rebuild
rm -rf .next
npm run build
```

### 3D Rendering Issues

- Ensure Three.js is properly transpiled (check `next.config.mjs`)
- Test in different browsers
- Check browser console for WebGL errors

### Voice Input Not Working

- Voice recognition requires HTTPS (works on Vercel)
- Check browser microphone permissions
- Voice API only works in Chrome, Edge, Safari

## Performance Optimization

### 1. Enable Edge Runtime (Optional)

Add to API routes:

```typescript
export const runtime = 'edge';
```

### 2. Optimize Images

Use Next.js Image component for any static images.

### 3. Monitor Bundle Size

```bash
npm run build
# Check bundle analyzer output
```

## Security

1. **Never commit `.env.local`** - It's in `.gitignore`
2. **Rotate API keys** regularly
3. **Set up rate limiting** if needed
4. **Enable Vercel Firewall** for production

## Cost Considerations

- **Vercel**: Free tier includes 100GB bandwidth/month
- **Gemini API**: Check current pricing at [ai.google.dev/pricing](https://ai.google.dev/pricing)
- Monitor usage to avoid unexpected costs

## Support

For issues:
1. Check Vercel deployment logs
2. Check browser console for errors
3. Review Gemini API quotas and limits
4. Open an issue on GitHub (if applicable)

