const ecgContainer = document.getElementById("ecg-canvas");
if (ecgContainer) {
  // Create canvas element
  const canvas = document.createElement('canvas');
  canvas.style.width = '100%';
  canvas.style.height = '100%';
  canvas.style.display = 'block';
  ecgContainer.appendChild(canvas);

  const ctx = canvas.getContext('2d');
  
  // Set canvas resolution
  function resizeCanvas() {
    const rect = ecgContainer.getBoundingClientRect();
    canvas.width = rect.width;
    canvas.height = rect.height;
    return { width: rect.width, height: rect.height };
  }
  
  let { width, height } = resizeCanvas();

  // ECG parameters
  let heartRate = 72; // BPM - will vary realistically
  const baseHeartRate = 72; // Base heart rate
  let cycleDuration = 60 / heartRate; // seconds per beat
  const gridSize = 20; // pixels per grid square
  const waveformColor = '#00ff88';
  const glowColor = 'rgba(0, 255, 136, 0.6)';
  const backgroundColor = '#0a0d12';
  const gridColor = 'rgba(0, 255, 136, 0.12)';
  
  // Heart rate variability parameters
  let hrvTime = 0;
  const hrvFrequency = 0.1; // Slow variation frequency
  const hrvAmplitude = 5; // BPM variation range (±5 BPM)
  
  // Waveform amplitude variation
  let amplitudeVariation = 1.0;
  
  // Waveform history buffer
  let waveformHistory = [];
  let time = 0;
  
  // Initialize history with baseline values
  for (let i = 0; i < width; i++) {
    waveformHistory.push(height / 2);
  }
  
  // Generate medically accurate PQRST waveform
  function generateECGValue(t) {
    // Normalize time to cardiac cycle (0-1)
    const cycleTime = (t % cycleDuration) / cycleDuration;
    const baselineY = height / 2;
    const scale = height * 0.25 * amplitudeVariation; // Apply amplitude variation
    
    // P wave (atrial depolarization) - 0.08-0.18
    if (cycleTime >= 0.08 && cycleTime < 0.18) {
      const pTime = (cycleTime - 0.08) / 0.1;
      const pWave = 0.15 * Math.exp(-Math.pow((pTime - 0.5) * 5, 2));
      return baselineY - pWave * scale;
    }
    
    // PR segment (flat) - 0.18-0.28
    if (cycleTime >= 0.18 && cycleTime < 0.28) {
      return baselineY;
    }
    
    // QRS complex - 0.28-0.38
    if (cycleTime >= 0.28 && cycleTime < 0.38) {
      const qrsTime = (cycleTime - 0.28) / 0.1;
      let qrsValue = 0;
      
      // Q wave (small negative dip)
      if (qrsTime < 0.2) {
        qrsValue = -0.1 * Math.sin(qrsTime * Math.PI / 0.2);
      }
      // R wave (tall positive spike)
      else if (qrsTime >= 0.2 && qrsTime < 0.5) {
        qrsValue = 1.0 * Math.sin((qrsTime - 0.2) * Math.PI / 0.3);
      }
      // S wave (negative dip)
      else if (qrsTime >= 0.5 && qrsTime < 0.8) {
        qrsValue = -0.25 * Math.sin((qrsTime - 0.5) * Math.PI / 0.3);
      }
      
      return baselineY - qrsValue * scale;
    }
    
    // ST segment (slightly elevated) - 0.38-0.50
    if (cycleTime >= 0.38 && cycleTime < 0.50) {
      return baselineY - 0.05 * scale;
    }
    
    // T wave (ventricular repolarization) - 0.50-0.70
    if (cycleTime >= 0.50 && cycleTime < 0.70) {
      const tTime = (cycleTime - 0.50) / 0.2;
      const tWave = 0.3 * Math.exp(-Math.pow((tTime - 0.5) * 3, 2));
      return baselineY - tWave * scale;
    }
    
    // U wave (optional, very small) - 0.70-0.80
    if (cycleTime >= 0.70 && cycleTime < 0.80) {
      const uTime = (cycleTime - 0.70) / 0.1;
      const uWave = 0.05 * Math.sin(uTime * Math.PI);
      return baselineY - uWave * scale;
    }
    
    // Baseline (isoelectric line)
    return baselineY;
  }
  
  // Draw ECG grid (like ECG paper)
  function drawGrid() {
    ctx.strokeStyle = gridColor;
    ctx.lineWidth = 1;
    
    // Vertical lines
    for (let x = 0; x < width; x += gridSize) {
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x, height);
      ctx.stroke();
    }
    
    // Horizontal lines
    for (let y = 0; y < height; y += gridSize) {
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(width, y);
      ctx.stroke();
    }
    
    // Thicker lines every 5 squares (like ECG paper)
    ctx.strokeStyle = 'rgba(0, 255, 136, 0.25)';
    ctx.lineWidth = 2;
    
    for (let x = 0; x < width; x += gridSize * 5) {
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x, height);
      ctx.stroke();
    }
    
    for (let y = 0; y < height; y += gridSize * 5) {
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(width, y);
      ctx.stroke();
    }
  }
  
  // Draw scan lines for CRT monitor effect
  function drawScanLines() {
    ctx.strokeStyle = 'rgba(0, 0, 0, 0.15)';
    ctx.lineWidth = 1;
    for (let y = 0; y < height; y += 4) {
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(width, y);
      ctx.stroke();
    }
  }
  
  // Animation loop
  let lastTime = performance.now();
  let pulseIntensity = 0;
  
  function animate(currentTime) {
    requestAnimationFrame(animate);
    
    const deltaTime = (currentTime - lastTime) / 1000; // seconds
    lastTime = currentTime;
    time += deltaTime;
    hrvTime += deltaTime;
    
    // Update heart rate variability (realistic breathing-related variation)
    // Uses a combination of slow sine waves to simulate natural HRV
    const hrv1 = Math.sin(hrvTime * hrvFrequency * 2 * Math.PI) * hrvAmplitude;
    const hrv2 = Math.sin(hrvTime * hrvFrequency * 0.5 * Math.PI) * (hrvAmplitude * 0.3);
    heartRate = baseHeartRate + hrv1 + hrv2;
    cycleDuration = 60 / heartRate;
    
    // Update amplitude variation (simulate respiratory influence)
    amplitudeVariation = 1.0 + Math.sin(hrvTime * 0.15 * 2 * Math.PI) * 0.08;
    
    // Pulse intensity for cinematic effect
    pulseIntensity = Math.sin(time * 3) * 0.3 + 0.7;
    
    // Generate new waveform value and add to history
    const currentValue = generateECGValue(time);
    waveformHistory.push(currentValue);
    
    // Keep only the width of the canvas
    if (waveformHistory.length > width) {
      waveformHistory.shift();
    }
    
    // Clear canvas with subtle gradient
    const gradient = ctx.createLinearGradient(0, 0, 0, height);
    gradient.addColorStop(0, '#0a0d12');
    gradient.addColorStop(0.5, '#0c0f15');
    gradient.addColorStop(1, '#0a0d12');
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, width, height);
    
    // Draw grid
    drawGrid();
    
    // Draw waveform with enhanced glow effect
    if (waveformHistory.length > 1) {
      // Calculate starting x position to ensure non-negative coordinates
      const startX = Math.max(0, width - waveformHistory.length);
      
      // Draw outer glow (phosphor afterglow effect)
      ctx.strokeStyle = `rgba(0, 255, 136, ${0.15 * pulseIntensity})`;
      ctx.lineWidth = 12;
      ctx.shadowBlur = 20;
      ctx.shadowColor = glowColor;
      ctx.beginPath();
      
      for (let i = 0; i < waveformHistory.length; i++) {
        const x = startX + i;
        const y = waveformHistory[i];
        
        if (i === 0) {
          ctx.moveTo(x, y);
        } else {
          ctx.lineTo(x, y);
        }
      }
      ctx.stroke();
      
      // Draw mid glow
      ctx.strokeStyle = `rgba(0, 255, 136, ${0.4 * pulseIntensity})`;
      ctx.lineWidth = 6;
      ctx.shadowBlur = 15;
      ctx.shadowColor = glowColor;
      ctx.beginPath();
      
      for (let i = 0; i < waveformHistory.length; i++) {
        const x = startX + i;
        const y = waveformHistory[i];
        
        if (i === 0) {
          ctx.moveTo(x, y);
        } else {
          ctx.lineTo(x, y);
        }
      }
      ctx.stroke();
      
      // Draw main waveform line
      ctx.strokeStyle = waveformColor;
      ctx.lineWidth = 2.5;
      ctx.shadowBlur = 20;
      ctx.shadowColor = waveformColor;
      ctx.beginPath();
      
      for (let i = 0; i < waveformHistory.length; i++) {
        const x = startX + i;
        const y = waveformHistory[i];
        
        if (i === 0) {
          ctx.moveTo(x, y);
        } else {
          ctx.lineTo(x, y);
        }
      }
      ctx.stroke();
    }
    
    // Draw scan lines
    drawScanLines();
    
    // Draw heart rate display with glow
    ctx.shadowBlur = 15;
    ctx.shadowColor = waveformColor;
    ctx.fillStyle = waveformColor;
    ctx.font = 'bold 28px monospace';
    ctx.fillText(`${Math.round(heartRate)} BPM`, 20, 45);
    
    // Draw pulsing indicator dot
    ctx.beginPath();
    ctx.arc(width - 30, 30, 5 + pulseIntensity * 3, 0, Math.PI * 2);
    ctx.fillStyle = waveformColor;
    ctx.shadowBlur = 10;
    ctx.fill();
    
    // Draw "ECG MONITOR" label
    ctx.shadowBlur = 5;
    ctx.font = '14px monospace';
    ctx.fillStyle = 'rgba(0, 255, 136, 0.7)';
    ctx.fillText('ECG MONITOR', 20, height - 20);
    
    // Draw timestamp
    ctx.fillText(`T: ${time.toFixed(1)}s`, width - 120, height - 20);
  }
  
  // Start animation
  animate(performance.now());
  
  // Handle resize
  window.addEventListener('resize', () => {
    const size = resizeCanvas();
    width = size.width;
    height = size.height;
    // Reinitialize history buffer with new width
    waveformHistory = [];
    for (let i = 0; i < width; i++) {
      waveformHistory.push(height / 2);
    }
  });
}