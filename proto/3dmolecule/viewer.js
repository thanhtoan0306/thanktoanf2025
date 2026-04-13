import * as THREE from "three";

export function startViewer({
  title = "",
  createSceneObject,
  cameraPosition = new THREE.Vector3(1.8, 1.2, 2.2),
  onFrame
}) {
  const hud = document.querySelector("[data-hud]");
  if (hud) hud.textContent = title;

  const renderer = new THREE.WebGLRenderer({ antialias: true });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  document.body.appendChild(renderer.domElement);

  const scene = new THREE.Scene();

  const camera = new THREE.PerspectiveCamera(60, 1, 0.1, 100);
  camera.position.copy(cameraPosition);
  camera.lookAt(0, 0, 0);

  scene.add(new THREE.AmbientLight(0xffffff, 0.5));
  const key = new THREE.DirectionalLight(0xffffff, 1.25);
  key.position.set(2, 3, 4);
  scene.add(key);

  const root = createSceneObject({ THREE });
  scene.add(root);

  function resize() {
    const w = window.innerWidth;
    const h = window.innerHeight;
    renderer.setSize(w, h, false);
    camera.aspect = w / h;
    camera.updateProjectionMatrix();
    camera.lookAt(0, 0, 0);
  }
  window.addEventListener("resize", resize, { passive: true });
  resize();

  const clock = new THREE.Clock();
  function animate() {
    const t = clock.getElapsedTime();
    if (onFrame) onFrame({ t, THREE, root, scene, camera, renderer });
    renderer.render(scene, camera);
    requestAnimationFrame(animate);
  }
  animate();
}

