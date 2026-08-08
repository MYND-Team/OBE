# Vercel Deployment Guide — OBÉ Web App

This guide explains how to deploy the **OBÉ Furniture** web application to [Vercel](https://vercel.com).

---

## Deployment Option 1: Vercel Dashboard (Recommended)

1. Push this repository to **GitHub**, **GitLab**, or **Bitbucket**.
2. Log in to [Vercel Dashboard](https://vercel.com/dashboard) and click **"Add New..."** → **"Project"**.
3. Select your repository from the list.
4. Keep the default settings:
   - **Framework Preset**: Other
   - **Root Directory**: `./` (leave default)
   - **Build Command**: `npm run build`
   - **Output Directory**: `OBE/dist`
5. Click **Deploy**.

> **Note**: If you choose to set the **Root Directory** in Vercel settings to `OBE`, Vercel will automatically use `OBE/vercel.json` and output to `dist`. Both approaches work seamlessly.

---

## Deployment Option 2: Vercel CLI

1. Install the Vercel CLI globally (or run with `npx`):
   ```bash
   npm i -g vercel
   ```
2. Run the deployment command from the project root directory:
   ```bash
   vercel
   ```
3. Follow the CLI prompts to link your project.
4. For production deployment, run:
   ```bash
   vercel --prod
   ```

---

## Configuration Details

- **Root `vercel.json`**: Configures the build command (`npm run build`) and points `outputDirectory` to `OBE/dist`.
- **SPA Rewrites**: Redirects all single-page application client routes (`/collection/*`, `/estimate`, etc.) to `/index.html`.
- **Environment Variables**: If needed in the future, add them in **Vercel Project Settings → Environment Variables**.
