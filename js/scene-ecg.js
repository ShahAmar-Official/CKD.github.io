const ecgContainer = document.getElementById("ecg-canvas");
if (ecgContainer) {
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(45, ecgContainer.clientWidth / ecgContainer.clientHeight, 0.1, 100);
  camera.position.set(0, 2, 6);

  const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
  renderer.setSize(ecgContainer.clientWidth, ecgContainer.clientHeight);
  ecgContainer.appendChild(renderer.domElement);

  const light = new THREE.PointLight(0x00aeff, 1.2);
  light.position.set(3, 3, 3);
  scene.add(light);

  const ambient = new THREE.AmbientLight(0x222222, 1.2);
  scene.add(ambient);

  const points = [];
  const amplitude = 1.2;
  const length = 80;

  for (let i = 0; i < length; i++) {
    const x = (i - length / 2) * 0.08;
    let y = Math.sin(i * 0.25) * 0.2;
    if (i % 15 === 0) y += amplitude;
    points.push(new THREE.Vector3(x, y, 0));
  }

  const curve = new THREE.CatmullRomCurve3(points);
  const geometry = new THREE.TubeGeometry(curve, 200, 0.03, 8, false);
  const material = new THREE.MeshStandardMaterial({ color: 0x00aeff, emissive: 0x006688 });
  const tube = new THREE.Mesh(geometry, material);
  scene.add(tube);

  function animate() {
    requestAnimationFrame(animate);
    tube.rotation.y += 0.002;
    renderer.render(scene, camera);
  }
  animate();

  window.addEventListener("resize", () => {
    camera.aspect = ecgContainer.clientWidth / ecgContainer.clientHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(ecgContainer.clientWidth, ecgContainer.clientHeight);
  });
}