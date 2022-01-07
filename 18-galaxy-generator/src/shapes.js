import './style.css'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import * as dat from 'dat.gui'

/**
 * Base
 */
// Debug
const gui = new dat.GUI({ width: 400 })

// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()

/**
 * Galaxy
 */
const parameters = {
    counts: 10000,
    size: 0.02,
    radius: 5,
    branches: 3,
    spin: 2.3,
    randomness: 0.25,
    randomnessPower: 3,
};
let particleGeometry = null;
let particles = null;
let particleMaterial = null;
const generateGalaxy = () => {
    /** 
     * destroy old galaxy
     * 
     */
    if (particles !== null) {
        particleGeometry.dispose();
        particleMaterial.dispose();
        scene.remove(particles);
    }
    particleGeometry = new THREE.BufferGeometry();
    let particlePosition = new Float32Array(parameters.counts * 3);
    particleMaterial = new THREE.PointsMaterial({
        size: parameters.size,
        sizeAttenuation: true,
        depthWrite: false,
        blending: THREE.AdditiveBlending,
        color: "#ff88cc",
    });
    for (let i = 0; i < parameters.counts; i++) {
        const i3 = i * 3;

        const radius = Math.random() * parameters.radius;
        const spin = parameters.spin * radius;
        const branchesAngle = ((i % parameters.branches) / parameters.branches) * Math.PI * 2;
        if (i < 20) {
            console.log(branchesAngle);
        }

        // const randomY = (Math.random() - 0.5) * parameters.randomness - ((Math.random() - 0.5) * radius);
        // const randomY = (Math.random() - 0.5) * parameters.randomness * -radius;
        // const randomY = ((Math.random() - 0.5) * parameters.randomness) + (1 - (Math.random() * radius));
        const randomX = (Math.random() - 0.5) * parameters.randomness;
        const randomY = (Math.random() - 0.5) * parameters.randomness;
        const randomZ = (Math.random() - 0.5) * parameters.randomness;

        particlePosition[i3] = (Math.cos(branchesAngle + spin) * radius) + randomX;
        particlePosition[i3 + 1] = 0 + randomY;
        particlePosition[i3 + 2] = (Math.sin(branchesAngle + spin) * radius) + randomZ;
    }
    particleGeometry.setAttribute(
        'position',
        new THREE.BufferAttribute(particlePosition, 3)
    );
    particles = new THREE.Points(particleGeometry, particleMaterial);
    scene.add(particles);
};

generateGalaxy();
gui.add(parameters, "counts").min(100).max(100000).step(10).onFinishChange(() => {
    generateGalaxy();
});
gui.add(parameters, "size").min(0.0001).max(0.1).step(0.001).onFinishChange(() => {
    generateGalaxy();
});
gui.add(parameters, "radius").min(0.01).max(20).step(0.01).onFinishChange(() => {
    generateGalaxy();
});
gui.add(parameters, "branches").min(2).max(20).step(1).onFinishChange(() => {
    generateGalaxy();
});
gui.add(parameters, "spin").min(-5).max(5).step(0.001).onFinishChange(() => {
    generateGalaxy();
});

gui.add(parameters, "randomness").min(0).max(1).step(0.01).onFinishChange(() => {
    generateGalaxy();
});

gui.add(parameters, "randomnessPower").min(1).max(10).step(1).onFinishChange(() => {
    generateGalaxy();
});



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
camera.position.x = 3
camera.position.y = 3
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

    // Update controls
    controls.update()

    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()