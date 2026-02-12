const heartContainer = document.getElementById("heart-canvas");
if (heartContainer) {
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(40, heartContainer.clientWidth / heartContainer.clientHeight, 0.1, 100);
  camera.position.set(0, 1.2, 3);

  const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
  renderer.setSize(heartContainer.clientWidth, heartContainer.clientHeight);
  heartContainer.appendChild(renderer.domElement);

  const light1 = new THREE.DirectionalLight(0xffffff, 1);
  light1.position.set(3, 3, 3);
  scene.add(light1);

  const light2 = new THREE.AmbientLight(0x88aaff, 0.4);
  scene.add(light2);

  const loader = new THREE.GLTFLoader();
  loader.load("assets/heart.glb", (gltf) => {
    const heart = gltf.scene;
    heart.scale.set(1.1, 1.1, 1.1);
    heart.position.set(0, -0.2, 0);
    scene.add(heart);

    const animate = () => {
      requestAnimationFrame(animate);
      heart.rotation.y += 0.005;
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