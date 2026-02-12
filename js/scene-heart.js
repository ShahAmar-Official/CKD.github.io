const heartContainer = document.getElementById("heart-canvas");
if (heartContainer) {
  const scene = new THREE.Scene();
  
  // Wider FOV (50°) and pulled back camera position for full visibility
  const camera = new THREE.PerspectiveCamera(50, heartContainer.clientWidth / heartContainer.clientHeight, 0.1, 100);
  camera.position.set(0, 1.5, 4.5);

  const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
  renderer.setSize(heartContainer.clientWidth, heartContainer.clientHeight);
  heartContainer.appendChild(renderer.domElement);

  // Enhanced lighting setup
  // Directional light from front-right
  const light1 = new THREE.DirectionalLight(0xffffff, 1.2);
  light1.position.set(3, 3, 3);
  scene.add(light1);

  // Increased ambient light intensity
  const light2 = new THREE.AmbientLight(0x88aaff, 0.7);
  scene.add(light2);

  // Hemisphere light for natural lighting
  const hemiLight = new THREE.HemisphereLight(0xffffff, 0x444444, 0.6);
  hemiLight.position.set(0, 10, 0);
  scene.add(hemiLight);

  // Rim light from behind for depth
  const rimLight = new THREE.DirectionalLight(0xaaccff, 0.5);
  rimLight.position.set(-2, 2, -3);
  scene.add(rimLight);

  // Initialize OrbitControls for interactivity
  const controls = new THREE.OrbitControls(camera, renderer.domElement);
  controls.enableDamping = true;
  controls.dampingFactor = 0.05;
  controls.enableZoom = true;
  controls.enablePan = false;
  controls.autoRotate = true;
  controls.autoRotateSpeed = 1.0;

  const loader = new THREE.GLTFLoader();
  loader.load("assets/realistic_human_heart.glb", (gltf) => {
    const heart = gltf.scene;
    heart.scale.set(1.1, 1.1, 1.1);
    heart.position.set(0, -0.2, 0);
    scene.add(heart);

    // Heartbeat animation parameters
    const heartRate = 72; // BPM
    const cycleDuration = (60 / heartRate) * 1000; // ~833ms per cycle
    const startTime = Date.now();

    const animate = () => {
      requestAnimationFrame(animate);
      
      // Update controls (handles damping and auto-rotation)
      controls.update();

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