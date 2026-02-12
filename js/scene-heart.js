const heartContainer = document.getElementById("heart-canvas");
if (heartContainer) {
  const scene = new THREE.Scene();
  
  // Add fog for cinematic depth
  scene.fog = new THREE.Fog(0x0b0c10, 5, 15);
  
  // Wider FOV (50°) and pulled back camera position for full visibility
  const camera = new THREE.PerspectiveCamera(50, heartContainer.clientWidth / heartContainer.clientHeight, 0.1, 100);
  camera.position.set(0, 1.5, 4.5);

  const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
  renderer.setSize(heartContainer.clientWidth, heartContainer.clientHeight);
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = THREE.PCFSoftShadowMap;
  heartContainer.appendChild(renderer.domElement);

  // Enhanced lighting setup with cinematic rim lighting
  // Key light - main illumination
  const keyLight = new THREE.DirectionalLight(0xffffff, 1.2);
  keyLight.position.set(3, 3, 3);
  keyLight.castShadow = true;
  scene.add(keyLight);

  // Fill light - softer ambient
  const fillLight = new THREE.AmbientLight(0x88aaff, 0.7);
  scene.add(fillLight);

  // Hemisphere light for natural lighting
  const hemiLight = new THREE.HemisphereLight(0xffffff, 0x444444, 0.6);
  hemiLight.position.set(0, 10, 0);
  scene.add(hemiLight);

  // Rim light - cinematic backlight
  const rimLight = new THREE.DirectionalLight(0x00aeff, 0.8);
  rimLight.position.set(-2, 2, -3);
  scene.add(rimLight);
  
  // Accent light - adds depth
  const accentLight = new THREE.PointLight(0x00ff88, 0.5, 10);
  accentLight.position.set(2, -1, 2);
  scene.add(accentLight);

  // Initialize OrbitControls for interactivity
  const controls = new THREE.OrbitControls(camera, renderer.domElement);
  controls.enableDamping = true;
  controls.dampingFactor = 0.05;
  controls.enableZoom = true;
  controls.enablePan = true;
  controls.autoRotate = true;
  controls.autoRotateSpeed = 1.0;
  controls.minDistance = 3;
  controls.maxDistance = 8;

  const loader = new THREE.GLTFLoader();
  loader.load("assets/realistic_human_heart.glb", (gltf) => {
    const heart = gltf.scene;
    heart.scale.set(1.1, 1.1, 1.1);
    heart.position.set(0, -0.2, 0);
    
    // Enable shadows on heart
    heart.traverse((child) => {
      if (child.isMesh) {
        child.castShadow = true;
        child.receiveShadow = true;
      }
    });
    
    scene.add(heart);

    // Heartbeat animation parameters
    const heartRate = 72; // BPM
    const cycleDuration = (60 / heartRate) * 1000; // ~833ms per cycle
    const startTime = Date.now();
    
    // Cinematic camera movement
    let cameraTime = 0;

    const animate = () => {
      requestAnimationFrame(animate);
      
      // Update controls (handles damping and auto-rotation)
      controls.update();
      
      // Cinematic camera sway
      cameraTime += 0.001;
      const cameraOffset = Math.sin(cameraTime) * 0.1;
      camera.position.y = 1.5 + cameraOffset;

      // Realistic heartbeat animation using sine wave
      // Pulses between 1.0 (diastole) and 1.12 (systole)
      const elapsed = Date.now() - startTime;
      const cycleProgress = (elapsed % cycleDuration) / cycleDuration;
      const heartbeatScale = 1.0 + 0.12 * Math.sin(cycleProgress * Math.PI * 2);
      
      heart.scale.set(
        1.1 * heartbeatScale,
        1.1 * heartbeatScale,
        1.1 * heartbeatScale
      );
      
      // Animate accent light
      accentLight.intensity = 0.5 + Math.sin(elapsed * 0.003) * 0.2;

      renderer.render(scene, camera);
    };
    animate();
  });

  window.addEventListener("resize", () => {
    camera.aspect = heartContainer.clientWidth / heartContainer.clientHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(heartContainer.clientWidth, heartContainer.clientHeight);
  });
}