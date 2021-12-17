import "./style.css";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { ArcballControls } from "three/examples/jsm/controls/ArcballControls";

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
  150,
  sizes.width / sizes.height,
  0.1,
  10000,
);
camera.lookAt(mesh.position);
scene.add(camera);

// controls =
const controls = new ArcballControls(camera, canvas, scene);

// Renderer
const renderer = new THREE.WebGLRenderer({
  canvas: canvas,
});
renderer.setSize(sizes.width, sizes.height);

controls.addEventListener("change", function () {
  renderer.render(scene, camera);
});
camera.position.set(0, 0, 3);
controls.update();
