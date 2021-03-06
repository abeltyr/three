import './style.css'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import * as dat from 'dat.gui'
import waterVertexShader from "./shaders/water/vertex.glsl"
import waterFragmentShader from "./shaders/water/fragment.glsl"
import { Vector2 } from 'three'

/**
 * Base
 */
// Debug
const gui = new dat.GUI({ width: 340 })
const debugObject = {};

// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()

/**
 * Water
 */
// Geometry
const waterGeometry = new THREE.PlaneBufferGeometry(5, 5, 1024, 1024)

debugObject.depthColor = '#186691';
debugObject.surfaceColor = '#9bd8ff';

// Material
const waterMaterial = new THREE.ShaderMaterial({
    vertexShader: waterVertexShader,
    fragmentShader: waterFragmentShader,
    side: THREE.DoubleSide,
    uniforms: {
        uBigWavesElevation: {
            value: 0.2
        },
        uBigWavesFrequency: {
            value: new THREE.Vector2(4, 1.5)
        },
        uBigWaveSpeed: {
            value: new THREE.Vector2(0.75, 0.75)
        },
        uSmallWaveElevation: {
            value: 0.16
        },
        uSmallWaveFrequency: {
            value: 3.0
        },
        uSmallWaveSpeed: {
            value: 0.2
        },
        uSmallWaveIteration: {
            value: 4.0
        },
        uTime: {
            value: 0.0
        },
        uDepthColor: {
            value: new THREE.Color(debugObject.depthColor)
        },
        uSurfaceColor: {
            value: new THREE.Color(debugObject.surfaceColor)
        },
        uColorOffset: {
            value: 0.08
        },
        uColorMultiplier: {
            value: 5.0
        }
    }
})

//Debug
gui.add(waterMaterial.uniforms.uBigWavesElevation, "value").min(0).max(1).step(0.0001).name("uBigWavesElevation");
gui.add(waterMaterial.uniforms.uBigWavesFrequency.value, "x").min(0).max(10).step(0.0001).name("uBigWavesFrequencyX");
gui.add(waterMaterial.uniforms.uBigWavesFrequency.value, "y").min(0).max(10).step(0.0001).name("uBigWavesFrequencyY");
gui.add(waterMaterial.uniforms.uBigWaveSpeed.value, "x").min(0).max(10).step(0.0001).name("uBigWaveSpeedX");
gui.add(waterMaterial.uniforms.uBigWaveSpeed.value, "y").min(0).max(10).step(0.0001).name("uBigWaveSpeedY");


gui.add(waterMaterial.uniforms.uSmallWaveElevation, "value").min(0).max(1).step(0.0001).name("uSmallWaveElevation");
gui.add(waterMaterial.uniforms.uSmallWaveFrequency, "value").min(0).max(10).step(0.0001).name("uSmallWaveFrequency");
gui.add(waterMaterial.uniforms.uSmallWaveSpeed, "value").min(0).max(1).step(0.0001).name("uSmallWaveSpeed");
gui.add(waterMaterial.uniforms.uSmallWaveIteration, "value").min(0).max(10).step(0.0001).name("uSmallWaveIteration");

gui.addColor(debugObject, "depthColor").name("depthColor").onChange(() => {
    waterMaterial.uniforms.uDepthColor.value = new THREE.Color(debugObject.depthColor)
});
gui.addColor(debugObject, "surfaceColor").name("surfaceColor").onChange(() => {
    waterMaterial.uniforms.uSurfaceColor.value = new THREE.Color(debugObject.surfaceColor)
});

gui.add(waterMaterial.uniforms.uColorOffset, "value").min(0).max(1).step(0.0001).name("uColorOffset");
gui.add(waterMaterial.uniforms.uColorMultiplier, "value").min(1).max(10).step(0.1).name("uColorMultiplier");


// Mesh
const water = new THREE.Mesh(waterGeometry, waterMaterial)
water.rotation.x = -Math.PI * 0.5
scene.add(water)

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
camera.position.set(1, 1, 1)
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

    //update Water
    waterMaterial.uniforms.uTime.value = elapsedTime;

    // Update controls
    controls.update()

    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()