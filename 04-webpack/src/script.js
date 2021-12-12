import "./style.css";

import * as THREE from "three";

// setup the scene
const scene = new THREE.Scene();

// setup mesh which is a box
const geometry = new THREE.BoxGeometry(2, 1, 2);
const material = new THREE.MeshBasicMaterial({ color: 0xff0000 });
const mesh = new THREE.Mesh(geometry, material);

scene.add(mesh);
// setup mesh which is a box
const geometry1 = new THREE.BoxGeometry(1, 3, 1);
const material1 = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
const mesh1 = new THREE.Mesh(geometry1, material1);

scene.add(mesh1);

// setup the camera
const size = {
  width: 800,
  height: 600,
};
const camera = new THREE.PerspectiveCamera(75, size.width / size.height);
camera.position.z = 5;
camera.position.x = 1;
camera.position.y = 1;
scene.add(camera);

// setup the render of the box
const canvas = document.querySelector(".webgl");
const renderer = new THREE.WebGLRenderer({
  canvas,
});

renderer.setSize(size.width, size.height);

renderer.render(scene, camera);
