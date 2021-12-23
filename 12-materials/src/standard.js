import './style.css'
import * as THREE from 'three'
import * as dat from 'dat.gui'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'

/**
 *  debug dat
 */

const gui = new dat.GUI();



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

// const material = new THREE.MeshDepthMaterial();
// const material = new THREE.MeshPhongMaterial();
// material.side = THREE.DoubleSide
// material.shininess = 100;
// material.specular = new THREE.Color(0x1188ff);
// const material = new THREE.MeshToonMaterial();
// material.gradientMap = gradientTexture;
// gradientTexture.minFilter = THREE.NearestFilter;
// gradientTexture.magFilter = THREE.NearestFilter;
// gradientTexture.generateMipMap = false;


const material = new THREE.MeshStandardMaterial();
material.side = THREE.DoubleSide;
material.alphaMap = doorAlphaTexture;
// need to set this if we want to setup the alpha
material.transparent = true;
material.map = doorColorTexture;
material.aoMap = doorAmbientOcclusionTexture;
material.aoMapIntensity = 3;
material.displacementMap = doorHeightTexture;
material.displacementScale = 0.085;
material.metalnessMap = doorMetalnessTexture;
material.roughnessMap = doorRoughnessTexture;
material.normalMap = doorNormalTexture;
material.normalScale.set(0.5, 0.5);
// material.metalness = 0.45;
// material.roughness = 0.65;
// gui.add(material, "metalness").min(0).max(1).step(0.0001);
// gui.add(material, "roughness").min(0).max(1).step(0.0001);
gui.add(material, "aoMapIntensity").min(0).max(10).step(0.01);
gui.add(material, "displacementScale").min(0).max(1).step(0.001);
gui.add(material, "wireframe");

const sphereGeometry = new THREE.SphereBufferGeometry(0.5, 64, 64);
const sphere = new THREE.Mesh(
    sphereGeometry,
    material,
);

sphere.geometry.setAttribute(
    "uv2",
    new THREE.BufferAttribute(
        sphere.geometry.attributes.uv.array,
        2
    )
);

sphere.position.x = 1.5;

const planeGeometry = new THREE.PlaneBufferGeometry(1, 1, 100, 100);
const plane = new THREE.Mesh(
    planeGeometry,
    material,
);


plane.geometry.setAttribute(
    "uv2",
    new THREE.BufferAttribute(
        plane.geometry.attributes.uv.array,
        2
    )
);


const torusGeometry = new THREE.TorusBufferGeometry(0.3, 0.15, 64, 128);
const torus = new THREE.Mesh(
    torusGeometry,
    material,
);
torus.position.x = -1.5;


torus.geometry.setAttribute(
    "uv2",
    new THREE.BufferAttribute(
        torus.geometry.attributes.uv.array,
        2
    )
);
scene.add(torus, plane, sphere);

/**
 * Lights
 */

const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);

scene.add(ambientLight);
const pointLight = new THREE.PointLight(0xffffff, 0.5);
pointLight.position.x = 2;
pointLight.position.y = 3;
pointLight.position.z = 4;

scene.add(pointLight);
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
    // sphere.rotation.y = 0.1 * elapsedTime;
    // plane.rotation.y = 0.2 * elapsedTime;
    // torus.rotation.y = 0.05 * elapsedTime;

    // sphere.rotation.x = 0.5 * elapsedTime;
    // plane.rotation.x = 0.3 * elapsedTime;
    // torus.rotation.x = 0.5 * elapsedTime;


    // Update controls
    controls.update()

    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()