import "./style.css";
import * as THREE from "three";
import { DragControls } from "three/examples/jsm/controls/DragControls";

/**
 * Base
 */
// Canvas
const canvas = document.querySelector("canvas.webgl");

// Sizes
const sizes = {
  width: 800,
  height: 600,
};

// Scene
const scene = new THREE.Scene();

// Object
const mesh = new THREE.Mesh(
  new THREE.BoxGeometry(1, 1, 1, 5, 5, 5),
  new THREE.MeshBasicMaterial({ color: 0xff0000 }),
);
scene.add(mesh);

// Camera
const camera = new THREE.PerspectiveCamera(
  50,
  sizes.width / sizes.height,
  0.1,
  100,
);
camera.position.z = 3;
camera.lookAt(mesh.position);
scene.add(camera);

//Not working well the event works but the update it part not so much
const controls = new DragControls([mesh], camera, canvas);
controls.addEventListener("dragstart", function (event) {
  console.log(event.object.material);
  event.object.material.color.set(0xaaaaaa);
});

controls.addEventListener("dragend", function (event) {
  event.object.material.color.set(0x000000);
});
// Renderer
const renderer = new THREE.WebGLRenderer({
  canvas: canvas,
});
renderer.setSize(sizes.width, sizes.height);

renderer.render(scene, camera);
// Animate;
const clock = new THREE.Clock();

const tick = () => {
  const elapsedTime = clock.getElapsedTime();

  renderer.render(scene, camera);

  // Call tick again on the next frame
  window.requestAnimationFrame(tick);
};

tick();
