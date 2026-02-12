# CKD.github.io
CKD Analysis using ECG signals by Shah Amar

A modern, cinematic research website featuring interactive 3D visualizations, particle effects, and comprehensive animations.

## Features

### 🎬 Cinematic 3D Effects
- **Interactive Particle System** - Background particles that react to mouse movement
- **3D Heart Visualization** - Realistic beating heart with cinematic lighting and camera movements
- **3D ECG Monitor** - Real-time ECG waveform with multi-layer glow effects
- **Cursor Tilt Effects** - Cards and elements that follow cursor with 3D perspective
- **Parallax Scrolling** - Depth-based scrolling for immersive experience

### ✨ Enhanced User Experience
- **Loading Screen** - Animated loading screen with spinner
- **Scroll Progress Indicator** - Visual progress bar at the top
- **Back to Top Button** - Floating button with 3D effects
- **Smooth Animations** - Cinematic transitions and effects throughout
- **Glassmorphism** - Modern frosted glass UI elements
- **Mobile Responsive** - Fully responsive design for all devices

### 📧 Contact Form Integration
- **Web3Forms API** - Email submission without backend server
- **Form Validation** - Client-side validation with helpful error messages
- **Success/Error Notifications** - Beautiful notification system
- **Direct Contact Links** - Email and WhatsApp click-to-contact buttons

### ♿ Accessibility
- **Reduced Motion Support** - Respects `prefers-reduced-motion` preference
- **Keyboard Navigation** - Full keyboard accessibility
- **ARIA Labels** - Proper semantic HTML and ARIA attributes
- **Skip Links** - Quick navigation for screen readers

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

## Contact Form Setup

The contact form requires a Web3Forms API key to function. See [FORM_SETUP.md](FORM_SETUP.md) for detailed setup instructions.

**Quick Setup:**
1. Get a free API key from [Web3Forms](https://web3forms.com/)
2. Replace `YOUR_WEB3FORMS_ACCESS_KEY` in `contact.html`
3. Deploy and test!

## Project Structure

```
CKD.github.io/
├── index.html              # Homepage with 3D heart and ECG
├── research.html           # Research overview
├── results.html            # Results and charts
├── dataset.html            # Dataset information
├── publications.html       # Publications list
├── team.html              # Team members
├── faq.html               # FAQ section
├── contact.html           # Contact form
├── css/
│   └── styles.css         # All styles with 3D effects
├── js/
│   ├── main.js            # Core functionality
│   ├── cinematic-effects.js  # Particle system, animations, UI effects
│   ├── form-handler.js    # Form submission and validation
│   ├── scene-heart.js     # 3D heart visualization
│   ├── scene-ecg.js       # ECG waveform rendering
│   └── vendor/            # Three.js libraries
└── assets/
    └── realistic_human_heart.glb  # 3D heart model
```

## Technologies Used

- **Three.js** - 3D graphics and WebGL rendering
- **Canvas API** - ECG waveform visualization
- **Web3Forms** - Form submission service
- **Vanilla JavaScript** - No framework dependencies
- **Modern CSS** - Grid, Flexbox, Animations, 3D Transforms
- **GitHub Actions** - Automated deployment

## Contact

- **Email:** [itsshahamar@duck.com](mailto:itsshahamar@duck.com)
- **WhatsApp:** [+92 313 9424265](https://wa.me/923139424265)

## License

© 2026 Shah Amar — CKD ECG Research

