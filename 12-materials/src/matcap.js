import './style.css'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'





/**
 * load Materials
 */
const loadingManager = new THREE.LoadingManager();

const textureLoader = new THREE.TextureLoader(loadingManager)

const doorAlphaTexture = new textureLoader.load("/textures/door/alpha.jpg")
const doorAmbientOcclusionTexture = new textureLoader.load("/textures/door/ambientOcclusion.jpg")
const doorColorTexture = new textureLoader.load("/textures/door/color.jpg")
const doorHeightTexture = new textureLoader.load("/textures/door/height.jpg")
const doorMetalnessTexture = new textureLoader.load("/textures/door/metalness.jpg")
const doorNormalTexture = new textureLoader.load("/textures/door/normal.jpg")
const doorRoughnessTexture = new textureLoader.load("/textures/door/roughness.jpg")


const gradientTexture = new textureLoader.load("/textures/gradients/3.jpg")

const matcapTexture = new textureLoader.load("/textures/matcaps/8.png")


/**
 * Base
 */
// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()

const material = new THREE.MeshMatcapMaterial();
material.matcap = matcapTexture;
material.side = THREE.DoubleSide;

const sphereGeometry = new THREE.SphereBufferGeometry(0.5, 100, 100);
const sphere = new THREE.Mesh(
    sphereGeometry,
    material,
);

sphere.position.x = 1.5;

const planeGeometry = new THREE.PlaneBufferGeometry(1, 1);
const plane = new THREE.Mesh(
    planeGeometry,
    material,
);

const torusGeometry = new THREE.TorusBufferGeometry(0.3, 0.15, 16, 100);
const torus = new THREE.Mesh(
    torusGeometry,
    material,
);
torus.position.x = -1.5;
scene.add(torus, plane, sphere);



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
    // camera.position.x = 3
    // camera.position.y = 3
camera.position.z = 3;
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
    const elapsedTime = clock.getElapsedTime();
    /**
     * object animation
     */
    sphere.rotation.y = 0.1 * elapsedTime;
    plane.rotation.y = 0.2 * elapsedTime;
    torus.rotation.y = 0.05 * elapsedTime;

    sphere.rotation.x = 0.5 * elapsedTime;
    plane.rotation.x = 0.3 * elapsedTime;
    torus.rotation.x = 0.5 * elapsedTime;


    // Update controls
    controls.update()

    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()