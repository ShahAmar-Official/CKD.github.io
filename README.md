# CKD.github.io
CKD Analysis using ECG signals by Shah Amar

## GitHub Pages Deployment

This repository is configured to automatically deploy to GitHub Pages when changes are pushed to the `main` branch.

### Setup Instructions

1. Go to your repository **Settings** → **Pages**
2. Under **Source**, select **GitHub Actions**
3. The site will automatically deploy when you merge this PR to the `main` branch
4. Your site will be available at: `https://shahamar-official.github.io/CKD.github.io/`

### Manual Deployment

You can also trigger a manual deployment:
1. Go to **Actions** tab
2. Select the **Deploy to GitHub Pages** workflow
3. Click **Run workflow**

## Local Development

To test the site locally, simply open `index.html` in a web browser or use a local web server:

```bash
# Using Python
python -m http.server 8000

# Using Node.js
npx http-server
```

Then visit `http://localhost:8000` in your browser.
