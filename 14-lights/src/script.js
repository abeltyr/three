import './style.css'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import { RectAreaLightHelper } from 'three/examples/jsm/helpers/RectAreaLightHelper.js'
import * as dat from 'dat.gui'

/**
 * Base
 */
// Debug
const gui = new dat.GUI({ closed: true })

// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()

/**
 * Lights
 */
const parameters = {
    ambientColor: 0x7f5a32,
    directionalColor: 0x614164,
};
/**  
 * we use this to simulate light hitting the back 
 * of the object or part of the
 * object the light doesn't not reach
 */

const ambientLight = new THREE.AmbientLight();
ambientLight.color = new THREE.Color(parameters.ambientColor);
ambientLight.intensity = 0.5;
// scene.add(ambientLight)

const directionalLight = new THREE.DirectionalLight(parameters.directionalColor, 0.3);
scene.add(directionalLight);
gui.add(directionalLight, "intensity").min(0).max(1).step(0.01);
gui.addColor(parameters, 'directionalColor')
    .onChange(() => {
        ambientLight.color.set(parameters.directionalColor);
    });
directionalLight.position.set(1, 0.25, 0)

const hemisphereLight = new THREE.HemisphereLight(0x992130, 0x031266, 1)
scene.add(hemisphereLight);


const pointLight = new THREE.PointLight(0xffffff, 1, 10, 2)
pointLight.position.set(1, -0.5, 1)
scene.add(pointLight);


const rectAreaLight = new THREE.RectAreaLight(0x4e00ff, 2, 1, 1)
rectAreaLight.position.set(-1.5, 0, 1.5)
rectAreaLight.lookAt(new THREE.Vector3());
scene.add(rectAreaLight);

const spotLight = new THREE.SpotLight(0x78ff00, 0.5, 10, Math.PI * 0.1, 0.25, 1)
spotLight.position.set(-2, 5, 5);
scene.add(spotLight);

spotLight.target.position.x = -0.75;
scene.add(spotLight.target);


/**
 * Helpers
 */
// const hemisphereLightHelper = new THREE.HemisphereLightHelper(hemisphereLight, 0.2)
// scene.add(hemisphereLightHelper);

// const directionalLightHelper = new THREE.DirectionalLightHelper(directionalLight, 0.2)
// scene.add(directionalLightHelper);

// const pointLightHelper = new THREE.PointLightHelper(pointLight, 0.2)
// scene.add(pointLightHelper);

// const spotLightHelper = new THREE.SpotLightHelper(spotLight, 0.2)
// scene.add(spotLightHelper);
// window.requestAnimationFrame(() => {
//     spotLightHelper.update();
// });

// const rectAreaLightHelper = new RectAreaLightHelper(rectAreaLight, 0.2)
// scene.add(rectAreaLightHelper);
// window.requestAnimationFrame(() => {
//     rectAreaLightHelper.position.copy(rectAreaLight.position);
//     rectAreaLightHelper.quaternion.copy(rectAreaLight.quaternion);
// });


/**
 * Objects
 */
// Material
const material = new THREE.MeshStandardMaterial()
material.roughness = 0.4

// Objects
const sphere = new THREE.Mesh(
    new THREE.SphereBufferGeometry(0.5, 32, 32),
    material
)
sphere.position.x = -1.5

const cube = new THREE.Mesh(
    new THREE.BoxBufferGeometry(0.75, 0.75, 0.75),
    material
)

const torus = new THREE.Mesh(
    new THREE.TorusBufferGeometry(0.3, 0.2, 32, 64),
    material
)
torus.position.x = 1.5

const plane = new THREE.Mesh(
    new THREE.PlaneBufferGeometry(5, 5),
    material
)
material.side = THREE.DoubleSide;
plane.rotation.x = -Math.PI * 0.5
plane.position.y = -0.65

scene.add(sphere, cube, torus, plane)

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
camera.position.x = 1
camera.position.y = 1
camera.position.z = 2
scene.add(camera)

// Controls
const controls = new OrbitControls(camera, canvas)
    // controls.enableDamping = true

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

    // Update objects
    sphere.rotation.y = 0.1 * elapsedTime
    cube.rotation.y = 0.1 * elapsedTime
    torus.rotation.y = 0.1 * elapsedTime

    sphere.rotation.x = 0.15 * elapsedTime
    cube.rotation.x = 0.15 * elapsedTime
    torus.rotation.x = 0.15 * elapsedTime

    // Update controls
    controls.update()

    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()