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
const textureLoader = new THREE.TextureLoader()
const matCapTexture = textureLoader.load("/textures/matcaps/11.png");

/**
 * Font
 */
const fontLoader = new THREE.FontLoader();
fontLoader.load(
    "/fonts/helvetiker_regular.typeface.json",
    (font) => {
        /**
         * Text geometry
         */
        const textGeometry = new THREE.TextGeometry("Coming Soon", {
            font: font,
            size: 0.5,
            height: 0.1,
            curveSegments: 100,
            bevelEnabled: true,
            bevelThickness: 0.03,
            bevelSize: 0.02,
            bevelSegments: 4,
            bevelOffset: 0
        });
        const material = new THREE.MeshMatcapMaterial({ matcap: matCapTexture });
        // textMaterial.wireframe = true; 5 8
        const text = new THREE.Mesh(textGeometry, material);
        textGeometry.center();
        scene.add(text);
        /**
         * 100 donuts
         */
        console.time("donut")
        const donutGeometry = new THREE.TorusBufferGeometry(0.3, 0.15, 20, 45);
        for (let i = 0; i < 400; i++) {
            const donut = new THREE.Mesh(donutGeometry, material)
            donut.position.x = ((Math.random() - 0.5) * 20);
            donut.position.y = ((Math.random() - 0.5) * 20);
            donut.position.z = ((Math.random() - 0.5) * 20);


            donut.rotation.x = Math.random() * Math.PI;
            donut.rotation.y = Math.random() * Math.PI;

            let scale = Math.random();
            donut.scale.set(scale, scale, scale)
            scene.add(donut)
        }
        console.timeEnd("donut")

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

    }
);

/**
 * Sizes
 */
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
};

/**
 * Camera
 */
// Base camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100)
    // camera.position.x = 1
    // camera.position.y = 1
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