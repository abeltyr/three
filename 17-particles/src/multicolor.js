import './style.css'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import * as dat from 'dat.gui'

/**
 * Base
 */
// Debug
const gui = new dat.GUI()

// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()

/**
 * Textures
 */
const textureLoader = new THREE.TextureLoader();
const particleTexture = textureLoader.load("/textures/particles/3.png");


/**
 * particles
 */

//Geometry
const particlesGeometry = new THREE.BufferGeometry();
const count = 20000;
// this creat an fatter array with the count * 3 values to be init it is multiplied by 3 because we latter
// are gone be dividing it by a row of 3 since the three values are gone be take as one for x, y, z
const position = new Float32Array(count * 3);
const colors = new Float32Array(count * 3);
for (let i = 0; i < count * 3; i++) {
    position[i] = (Math.random() - 0.5) * 10;
    colors[i] = Math.random();
}

particlesGeometry.setAttribute(
    'position',
    new THREE.BufferAttribute(position, 3)
);

particlesGeometry.setAttribute(
    'color',
    new THREE.BufferAttribute(colors, 3)
);

// const particlesGeometry = new THREE.SphereBufferGeometry(1, 32, 32);

// Material
const particlesMaterial = new THREE.PointsMaterial();
particlesMaterial.vertexColors = true;
particlesMaterial.size = 0.08;
particlesMaterial.sizeAttenuation = true;
// particlesMaterial.color = new THREE.Color("#88ffcc");
particlesMaterial.alphaMap = particleTexture;
particlesMaterial.transparent = true;
// particlesMaterial.alphaTest = 0.0001;
// particlesMaterial.depthTest = false;
particlesMaterial.depthWrite = false;
particlesMaterial.blending = THREE.AdditiveBlending;
//Points
const particles = new THREE.Points(particlesGeometry, particlesMaterial)

scene.add(particles);


// const cube = new THREE.Mesh(
//     new THREE.BoxBufferGeometry(),
//     new THREE.MeshBasicMaterial()
// );

// scene.add(cube);


/**
 * Sizes
 */
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}

window.addEventListener('resize', () => {
    // Update sizes
    sizes.width = window.innerWidth
    sizes.height = window.innerHeight

    // Update camera
    camera.aspect = sizes.width / sizes.height
    camera.updateProjectionMatrix()

    // Update renderer
    renderer.setSize(sizes.width, sizes.height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
})

/**
 * Camera
 */
// Base camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100)
camera.position.z = 3
scene.add(camera)

// Controls
const controls = new OrbitControls(camera, canvas)
controls.enableDamping = true

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
    canvas: canvas
})
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

/**
 * Animate
 */
const clock = new THREE.Clock()

const tick = () => {
    const elapsedTime = clock.getElapsedTime()

    //update Particles

    particles.position.y = -elapsedTime * 0.02;

    // Update controls
    controls.update()

    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()