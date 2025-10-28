# GitHub Pages Deployment Instructions

## ✅ Your project is now configured for GitHub Pages!

## Next Steps:

### 1. Create a GitHub Repository

Go to GitHub and create a new repository. **IMPORTANT:** Name it exactly `DT-Project` (or update the `base` in `vite.config.ts` to match your repo name).

### 2. Connect Your Local Repository to GitHub

Run these commands:

```bash
git remote add origin https://github.com/YOUR-USERNAME/DT-Project.git
git branch -M main
git push -u origin main
```

Replace `YOUR-USERNAME` with your GitHub username.

### 3. Deploy to GitHub Pages

Simply run:

```bash
npm run deploy
```

This will:
- Build your project
- Create a `gh-pages` branch
- Push the built files to that branch

### 4. Enable GitHub Pages

1. Go to your repository on GitHub
2. Click **Settings** → **Pages**
3. Under "Source", select branch: **gh-pages**
4. Click **Save**

### 5. Access Your Live Site

Your site will be available at:
```
https://YOUR-USERNAME.github.io/DT-Project/
```

It may take 2-3 minutes for the site to go live after the first deployment.

---

## Future Updates

Whenever you make changes:

1. Commit your changes:
   ```bash
   git add .
   git commit -m "Your commit message"
   git push
   ```

2. Deploy:
   ```bash
   npm run deploy
   ```

---

## Important Notes

⚠️ **Repository Name**: If you named your repository something other than `DT-Project`, you must update the `base` property in `vite.config.ts`:

```typescript
base: '/your-repo-name/',
```

Then rebuild and redeploy:
```bash
npm run build
npm run deploy
```

---

## Troubleshooting

**Blank page?**
- Check that the `base` in `vite.config.ts` matches your repository name
- Make sure GitHub Pages is enabled and pointing to the `gh-pages` branch

**404 errors?**
- The HashRouter in your app should handle routing, but if you see 404s, the `base` URL might be incorrect

---

## Your Project is Ready! 🚀

All configuration is complete. Just follow steps 1-4 above to deploy!
