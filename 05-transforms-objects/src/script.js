import "./style.css";
import * as THREE from "three";

// Canvas
const canvas = document.querySelector("canvas.webgl");

// Scene
const scene = new THREE.Scene();

/**
 * Objects
 */

const group = new THREE.Group();
scene.add(group);

const cube1 = new THREE.Mesh(
  new THREE.BoxGeometry(1, 1, 1),
  new THREE.MeshBasicMaterial({ color: 0xff1239 }),
);

group.add(cube1);

const cube2 = new THREE.Mesh(
  new THREE.BoxGeometry(1, 1, 1),
  new THREE.MeshBasicMaterial({ color: 0x12ff39 }),
);
cube2.position.x = 1.5;
group.add(cube2);

const cube3 = new THREE.Mesh(
  new THREE.BoxGeometry(1, 1, 1),
  new THREE.MeshBasicMaterial({ color: 0x1239ff }),
);
cube3.position.x = -1.5;
group.add(cube3);

group.position.y = 0.5;
group.scale.y = 1;

group.rotation.y = 1;
/**
 * Objects
 */
const geometry = new THREE.BoxGeometry(1, 1, 1);
const material = new THREE.MeshBasicMaterial({ color: 0xff0000 });
const mesh = new THREE.Mesh(geometry, material);
// mesh.position.y = -0.6;
// mesh.position.x = 0.7;
// mesh.position.z = 1;
mesh.position.set(0.7, -0.6, 1);
mesh.scale.set(1.25, 0.5, 0.5);
mesh.rotation.reorder("YXZ");
mesh.rotation.set(Math.PI / 4, Math.PI / 2, Math.PI / 2);

scene.add(mesh);

const axesHelper = new THREE.AxesHelper(2);
scene.add(axesHelper);
// mesh.position.normalize();

// console.log(mesh.position.length());

/**
 * Sizes
 */
const sizes = {
  width: 800,
  height: 600,
};

/**
 * Camera
 */
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height);
camera.position.z = 3;
// camera.lookAt(mesh.position);
scene.add(camera);
// console.log(mesh.position.distanceTo(camera.position));

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
  canvas: canvas,
});
renderer.setSize(sizes.width, sizes.height);
renderer.render(scene, camera);
