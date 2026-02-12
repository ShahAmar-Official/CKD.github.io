# Cinematic 3D Effects & Features Documentation

This document provides detailed information about all the cinematic effects and features implemented in the CKD ECG Analysis website.

## 🌟 Particle System

### Overview
An interactive particle system that creates a dynamic, living background across all pages.

### Features
- **Mouse Interaction**: Particles react and move away from cursor
- **Connection Lines**: Particles within proximity are connected with glowing lines
- **Smooth Movement**: Natural physics-based movement with damping
- **Performance Optimized**: Particle count scales with screen size
- **Reduced Motion Support**: Disabled for users who prefer reduced motion

### Technical Details
- Canvas-based rendering
- ~100-150 particles depending on screen size
- Real-time mouse tracking
- 60 FPS animation loop

### Files
- `js/cinematic-effects.js` - ParticleSystem class

---

## 🎯 Cursor Tilt Effect

### Overview
Cards and UI elements tilt in 3D space based on cursor position, creating depth and interactivity.

### Affected Elements
- Feature cards
- Team cards
- Metric cards
- Chart cards

### Behavior
- Tracks mouse position over elements
- Calculates rotation based on cursor distance from center
- Smooth transitions when mouse enters/leaves
- Max rotation: ±10 degrees

### Files
- `js/cinematic-effects.js` - CursorTilt class
- `css/styles.css` - 3D transform styles

---

## 📊 Scroll Progress Indicator

### Overview
A gradient bar at the top of the page that shows reading progress.

### Features
- Fixed position at top of viewport
- Smooth width transition
- Gradient color (cyan to green)
- Glowing effect
- Updates on scroll

### Technical Details
- Calculates scroll percentage
- Updates width dynamically
- Z-index: 9999 (always on top)

### Files
- `js/cinematic-effects.js` - ScrollProgress class
- `css/styles.css` - .scroll-progress-bar

---

## ⬆️ Back to Top Button

### Overview
A floating button that appears after scrolling down, allowing quick return to top.

### Features
- Appears after 300px scroll
- 3D rotation on hover (360° spin)
- Smooth scroll to top
- Scale animations
- Circular design with gradient

### Behavior
- Hidden by default
- Fades in when scrolling down
- Smooth scroll animation when clicked
- Hover: scales up and rotates
- Active: scales down

### Files
- `js/cinematic-effects.js` - BackToTop class
- `css/styles.css` - .back-to-top

---

## ⏳ Loading Screen

### Overview
An animated loading screen that appears when the page first loads.

### Features
- Full-screen overlay
- Rotating spinner
- Pulsing text
- Gradient background
- Fades out after page load

### Timing
- Displays immediately on page load
- Waits 800ms after page load
- Fades out over 500ms
- Total display time: ~1.3 seconds

### Files
- `js/cinematic-effects.js` - LoadingScreen class
- `css/styles.css` - .loading-screen

---

## 🌊 Parallax Scrolling

### Overview
Elements move at different speeds when scrolling, creating depth perception.

### Affected Elements
- Hero section
- Hero visual container
- Canvas containers

### Technical Details
- Scroll-based transform
- Different speeds per element (0.5x to 0.7x)
- Smooth transitions
- Disabled for reduced motion users

### Files
- `js/cinematic-effects.js` - ParallaxEffect class

---

## ❤️ 3D Heart Visualization

### Overview
A realistic 3D heart model with advanced lighting and animation.

### Features
- **Heartbeat Animation**: Pulses at 72 BPM (realistic heart rate)
- **Auto-rotation**: Slowly rotates for all-angle view
- **Interactive Controls**: 
  - Zoom with mouse wheel
  - Rotate by dragging
  - Pan with right-click drag
- **Cinematic Lighting**:
  - Key light (main illumination)
  - Fill light (ambient)
  - Hemisphere light (natural)
  - Rim light (backlight, cyan)
  - Accent light (animated point light)
- **Camera Sway**: Subtle vertical movement for cinematic feel
- **Fog**: Depth fog for atmosphere
- **Shadows**: Real-time shadow mapping

### Animation Details
- Heartbeat cycle: 833ms (72 BPM)
- Scale range: 1.0 to 1.12
- Sine wave interpolation
- Camera sway: ±0.1 units

### Files
- `js/scene-heart.js`
- `assets/realistic_human_heart.glb`

---

## 📈 ECG Waveform Visualization

### Overview
A medically accurate ECG waveform rendered on a canvas with CRT monitor effects.

### Features
- **PQRST Waveform**: Accurate cardiac cycle representation
- **Multi-layer Glow**: Triple-layer glow for phosphor screen effect
- **Scan Lines**: CRT monitor aesthetic
- **Grid Background**: ECG paper-style grid
- **Real-time Animation**: 72 BPM scrolling
- **Heart Rate Display**: Shows BPM with glow effect
- **Pulsing Indicator**: Visual heartbeat indicator
- **Timestamp**: Running time display

### Technical Details
- Canvas 2D rendering
- Frame-based animation
- History buffer for waveform trail
- Gradient background
- Shadow blur effects

### Waveform Components
- P wave: Atrial depolarization (0.08-0.18s)
- PR segment: Flat line (0.18-0.28s)
- QRS complex: Ventricular depolarization (0.28-0.38s)
- ST segment: Slightly elevated (0.38-0.50s)
- T wave: Ventricular repolarization (0.55-0.75s)

### Files
- `js/scene-ecg.js`

---

## 📝 Contact Form

### Overview
A fully functional contact form with validation and email submission.

### Features
- **Web3Forms Integration**: Server-less email delivery
- **Client-side Validation**:
  - Name: minimum 2 characters
  - Email: valid email format
  - Message: minimum 10 characters
- **Visual Feedback**:
  - Success notification (green)
  - Error notification (red)
  - Loading state on submit button
  - Form reset on success
- **Accessibility**:
  - ARIA labels
  - Required field indicators
  - Focus states with 3D effects

### Validation Rules
```javascript
- Name: required, min 2 chars
- Email: required, valid format
- Message: required, min 10 chars
```

### Files
- `contact.html`
- `js/form-handler.js`
- `css/styles.css` - form notification styles

---

## 🎨 CSS Animations

### Gradient Shift
- Applied to: Hero titles
- Duration: 8 seconds
- Effect: Animated gradient background
- Colors: White → Cyan → Green

### Float
- Applied to: Hero text
- Duration: 6 seconds
- Effect: Gentle up/down floating motion
- Range: ±10px + 10px depth

### Rotate Border
- Applied to: Hero visual
- Duration: 4 seconds
- Effect: Rotating gradient border
- Colors: Cyan → Green → Cyan

### Spin
- Applied to: Loading spinner
- Duration: 1 second
- Effect: Continuous rotation

### Section Shine
- Applied to: All sections
- Duration: 8 seconds
- Effect: Sweeping light effect

### Hero Glow
- Applied to: Hero section
- Duration: 4 seconds
- Effect: Pulsing radial glow

### Title Glow
- Applied to: Page titles
- Duration: 3 seconds
- Effect: Pulsing drop shadow

### Logo Pulse 3D
- Applied to: Logo
- Duration: 3 seconds
- Effect: Scale pulse with depth

---

## ♿ Accessibility Features

### Reduced Motion Support
All animations respect the `prefers-reduced-motion` CSS media query:

```css
@media (prefers-reduced-motion: reduce) {
  /* All animations disabled */
}
```

**Affected Features:**
- Particle system (disabled)
- Parallax scrolling (disabled)
- Loading screen animations (disabled)
- All CSS keyframe animations (disabled)
- 3D transform effects (simplified)

### Keyboard Navigation
- Tab through all interactive elements
- Enter/Space to activate buttons
- Skip link to main content
- Mobile menu keyboard accessible

### Screen Reader Support
- ARIA labels on all interactive elements
- Semantic HTML structure
- Alt text on images
- Form labels properly associated

---

## 🎯 Performance Optimizations

### Particle System
- Particle count scales with screen size
- RequestAnimationFrame for smooth animation
- Canvas rendering (GPU accelerated)

### 3D Rendering
- Three.js WebGL renderer
- Shadow map optimization
- Fog for performance/atmosphere balance
- Auto-pause when tab not visible

### CSS Animations
- GPU-accelerated transforms
- Will-change hints for browsers
- Efficient selectors

### JavaScript
- Modular architecture
- Event delegation where possible
- Debounced resize handlers
- Lazy initialization

---

## 🔧 Configuration

### Customizing Effects

**Particle Count:**
```javascript
// In js/cinematic-effects.js, line ~26
const particleCount = Math.floor((width * height) / 15000);
// Increase divisor for fewer particles
```

**Heart Beat Rate:**
```javascript
// In js/scene-heart.js, line ~50
const heartRate = 72; // Change to desired BPM
```

**ECG Heart Rate:**
```javascript
// In js/scene-ecg.js, line ~23
const heartRate = 72; // Change to desired BPM
```

**Parallax Speed:**
```javascript
// In js/cinematic-effects.js, ParallaxEffect.update()
const speed = 0.5 + (index * 0.1); // Adjust multipliers
```

---

## 📱 Mobile Responsiveness

All cinematic effects are mobile-responsive:

- Particle system scales to screen size
- Touch-friendly controls on 3D scenes
- Mobile menu with hamburger button
- Responsive grid layouts
- Optimized animations for mobile performance
- Reduced particle count on smaller screens
- Touch gestures for 3D model interaction

---

## 🌐 Browser Compatibility

**Fully Supported:**
- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

**Partial Support:**
- Older browsers may not show all effects
- Graceful degradation implemented
- Core functionality works everywhere

**Required Features:**
- CSS Grid
- CSS 3D Transforms
- Canvas API
- WebGL (for 3D models)
- ES6 JavaScript
- Fetch API

---

## 📊 Features Summary

| Feature | Type | Performance Impact | Mobile |
|---------|------|-------------------|--------|
| Particle System | Canvas | Low | ✓ |
| Cursor Tilt | CSS 3D | Minimal | N/A |
| Scroll Progress | DOM | Minimal | ✓ |
| Back to Top | DOM | Minimal | ✓ |
| Loading Screen | DOM | None (temporary) | ✓ |
| Parallax | CSS Transform | Low | ✓ |
| 3D Heart | WebGL | Medium | ✓ |
| ECG Waveform | Canvas | Low | ✓ |
| Form Handler | JavaScript | Minimal | ✓ |

---

## 🎓 Learning Resources

- [Three.js Documentation](https://threejs.org/docs/)
- [Canvas API Guide](https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API)
- [CSS 3D Transforms](https://developer.mozilla.org/en-US/docs/Web/CSS/transform)
- [Web3Forms Documentation](https://docs.web3forms.com/)
- [Reduced Motion Query](https://developer.mozilla.org/en-US/docs/Web/CSS/@media/prefers-reduced-motion)
