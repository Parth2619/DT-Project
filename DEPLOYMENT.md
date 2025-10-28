# Deployment Guide for Lost & Found + Notes Portal

## Your website is built and ready to deploy! 🚀

The production files are in the `dist` folder.

---

## Option 1: Vercel (Recommended - Easiest)

### Steps:
1. Run this command in your terminal:
   ```bash
   vercel
   ```

2. Follow the prompts:
   - Login/Sign up to Vercel (it will open your browser)
   - Link to existing project or create new one
   - Accept default settings

3. Your site will be deployed and you'll get a URL like:
   `https://your-project.vercel.app`

4. For custom domain or production deployment:
   ```bash
   vercel --prod
   ```

**Pros:**
- ✅ Free
- ✅ Automatic HTTPS
- ✅ Global CDN
- ✅ Auto-deploy on git push
- ✅ Takes ~2 minutes

---

## Option 2: Netlify

### Steps:
1. Install Netlify CLI:
   ```bash
   npm install -g netlify-cli
   ```

2. Deploy:
   ```bash
   netlify deploy
   ```

3. Follow prompts and specify `dist` as your publish directory

4. For production:
   ```bash
   netlify deploy --prod
   ```

**Pros:**
- ✅ Free
- ✅ Automatic HTTPS
- ✅ Form handling
- ✅ Easy rollbacks

---

## Option 3: GitHub Pages

### Steps:
1. Install gh-pages:
   ```bash
   npm install --save-dev gh-pages
   ```

2. Add to package.json scripts:
   ```json
   "deploy": "gh-pages -d dist"
   ```

3. Deploy:
   ```bash
   npm run deploy
   ```

4. Enable GitHub Pages in repository settings

**Pros:**
- ✅ Free
- ✅ Integrated with GitHub

**Note:** Update `vite.config.ts` base URL to your repo name:
```typescript
base: '/your-repo-name/'
```

---

## Option 4: Firebase Hosting

### Steps:
1. Install Firebase CLI:
   ```bash
   npm install -g firebase-tools
   ```

2. Login:
   ```bash
   firebase login
   ```

3. Initialize:
   ```bash
   firebase init hosting
   ```
   - Select existing project or create new one
   - Set public directory to `dist`
   - Configure as single-page app: Yes
   - Don't overwrite index.html

4. Deploy:
   ```bash
   firebase deploy
   ```

**Pros:**
- ✅ Free tier available
- ✅ Google infrastructure
- ✅ Analytics included

---

## Quick Deploy Now (Vercel):

Simply run:
```bash
vercel
```

That's it! Your site will be live in ~2 minutes! 🎉

---

## Environment Variables

If you add a Gemini API key later, set it in your deployment platform:

**Vercel:**
- Go to Project Settings → Environment Variables
- Add: `GEMINI_API_KEY` = your_key

**Netlify:**
- Site Settings → Environment Variables
- Add: `GEMINI_API_KEY` = your_key

---

## Your Built Files:
- Location: `dist/`
- Size: ~969 KB (JavaScript) + ~1 KB (CSS)
- Ready for deployment! ✅
