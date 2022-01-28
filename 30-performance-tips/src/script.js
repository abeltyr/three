import './style.css'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import { BufferGeometryUtils } from 'three/examples/jsm/utils/BufferGeometryUtils.js'
import Stats from 'stats.js'

const stats = new Stats();
stats.showPanel(0); // 0: fps, 1: ms, 2: mb, 3+: custom
document.body.appendChild(stats.dom);

/**
 * Base
 */
// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()

/**
 * Textures
 */
const textureLoader = new THREE.TextureLoader()
const displacementTexture = textureLoader.load('/textures/displacementMap.png')

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
camera.position.set(2, 2, 6)
scene.add(camera)

// Controls
const controls = new OrbitControls(camera, canvas)
controls.enableDamping = true

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
    canvas: canvas,
    powerPreference: 'high-performance',
    antialias: true
})
renderer.shadowMap.enabled = true
renderer.shadowMap.type = THREE.PCFSoftShadowMap
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(window.devicePixelRatio)

/**
 * Test meshes
 */
// const cube = new THREE.Mesh(
//     new THREE.BoxBufferGeometry(2, 2, 2),
//     new THREE.MeshStandardMaterial()
// )
// cube.castShadow = true
// cube.receiveShadow = true
// cube.position.set(-5, 0, 0)
// scene.add(cube)

// const torusKnot = new THREE.Mesh(
//     new THREE.TorusKnotBufferGeometry(1, 0.4, 128, 32),
//     new THREE.MeshStandardMaterial()
// )
// torusKnot.castShadow = true
// torusKnot.receiveShadow = true
// scene.add(torusKnot)

// const sphere = new THREE.Mesh(
//     new THREE.SphereBufferGeometry(1, 32, 32),
//     new THREE.MeshStandardMaterial()
// )
// sphere.position.set(5, 0, 0)
// sphere.castShadow = true
// sphere.receiveShadow = true
// scene.add(sphere)

// const floor = new THREE.Mesh(
//     new THREE.PlaneBufferGeometry(10, 10),
//     new THREE.MeshStandardMaterial()
// )
// floor.position.set(0, -2, 0)
// floor.rotation.x = -Math.PI * 0.5
// floor.castShadow = true
// floor.receiveShadow = true
// scene.add(floor)

/**
 * Lights
 */
// const directionalLight = new THREE.DirectionalLight('#ffffff', 1)
// directionalLight.castShadow = true
// directionalLight.shadow.mapSize.set(1024, 1024)
// directionalLight.shadow.camera.far = 15
// directionalLight.shadow.normalBias = 0.05
// directionalLight.position.set(0.25, 3, 2.25)
// scene.add(directionalLight)

/**
 * Animate
 */
const clock = new THREE.Clock()

const tick = () => {
    const elapsedTime = clock.getElapsedTime()

    // Update test mesh
    // torusKnot.rotation.y = elapsedTime * 0.1

    // Update controls
    controls.update()

    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)

    //update stats

    stats.begin();
    stats.end();


}

tick()

/**
 * Tips
 */

// Tip 4
// console.log(renderer.info)

// Tip 6  remove the object once it is not needed 
// scene.remove(cube)
// cube.geometry.dispose()
// cube.material.dispose()

// // Tip 10
// directionalLight.shadow.camera.top = 3
// directionalLight.shadow.camera.right = 6
// directionalLight.shadow.camera.left = -6
// directionalLight.shadow.camera.bottom = -3
// directionalLight.shadow.camera.far = 10
// directionalLight.shadow.mapSize.set(1024, 1024)

// const cameraHelper = new THREE.CameraHelper(directionalLight.shadow.camera)
// scene.add(cameraHelper)

/**
 * Tip 11 don't cast or receive shadow if not needed
 * shadow and light are highly performance expense so avoid
 * them if possible if not only give the to the need objects
 *  */
// cube.castShadow = true
// cube.receiveShadow = false

// torusKnot.castShadow = true
// torusKnot.receiveShadow = false

// sphere.castShadow = true
// sphere.receiveShadow = false

// floor.castShadow = false
// floor.receiveShadow = true

// Tip 12 remove shadow update once done if there is no movement of the light and the object
// renderer.shadowMap.autoUpdate = false
// renderer.shadowMap.needsUpdate = true

/**
 * Tip 13 use the right formate of file jpeg is better since
 * it has smaller size but with the down side and also use
 * tinypng.com to reduce the image
 */


/**
 * Tip 14 resize texture. use smaller textures meaning the resolution not the size the pixels it shows
 * if the resolution is big it will be push the gpu to the limit
 */


/**
 * Tip 15 us image in the power of two so that the gpu doesn't do approximation
 * that will cost performance for the metmaping
 */


/**
 * Tip 16 use buffer geometry
 */

/**
 * Tip 17 don't update the vertices of a geometry specially on the tick function
 */

// // Tip 18 don't put const variable that don't change inside loops
//     const geometry = new THREE.BoxBufferGeometry(0.5, 0.5, 0.5)

//     const material = new THREE.MeshNormalMaterial()
// for (let i = 0; i < 50; i++) {

//     const mesh = new THREE.Mesh(geometry, material)
//     mesh.position.x = (Math.random() - 0.5) * 10
//     mesh.position.y = (Math.random() - 0.5) * 10
//     mesh.position.z = (Math.random() - 0.5) * 10
//     mesh.rotation.x = (Math.random() - 0.5) * Math.PI * 2
//     mesh.rotation.y = (Math.random() - 0.5) * Math.PI * 2

//     scene.add(mesh)
// }

// // Tip 19
// const geometries = [];
// for (let i = 0; i < 50; i++) {
//     const geometry = new THREE.BoxBufferGeometry(0.5, 0.5, 0.5)
//     geometry.rotateX = (Math.random() - 0.5) * Math.PI * 2;
//     geometry.rotateZ = (Math.random() - 0.5) * Math.PI * 2;
//     geometry.translate(
//         (Math.random() - 0.5) * 10,
//         (Math.random() - 0.5) * 10,
//         (Math.random() - 0.5) * 10
//     )
//     geometries.push(geometry);
// }

// const mergeGeometry = BufferGeometryUtils.mergeBufferGeometries(geometries);
// const material = new THREE.MeshNormalMaterial()
// const mesh = new THREE.Mesh(mergeGeometry, material)
// mesh.position.x = (Math.random() - 0.5) * 10
// mesh.position.y = (Math.random() - 0.5) * 10
// mesh.position.z = (Math.random() - 0.5) * 10
// mesh.rotation.x = (Math.random() - 0.5) * Math.PI * 2
// mesh.rotation.y = (Math.random() - 0.5) * Math.PI * 2

// scene.add(mesh)

// // Tip 20
// const geometry = new THREE.BoxBufferGeometry(0.5, 0.5, 0.5)
// const material = new THREE.MeshNormalMaterial()

// for (let i = 0; i < 50; i++) {

//     const mesh = new THREE.Mesh(geometry, material)
//     mesh.position.x = (Math.random() - 0.5) * 10
//     mesh.position.y = (Math.random() - 0.5) * 10
//     mesh.position.z = (Math.random() - 0.5) * 10
//     mesh.rotation.x = (Math.random() - 0.5) * Math.PI * 2
//     mesh.rotation.y = (Math.random() - 0.5) * Math.PI * 2

//     scene.add(mesh)
// }

/** Tip 21
 * use chip material that don't cost much on the gpu
 * so for realistic but heave material use meshStandardMaterials
 * and meshPhysicMaterials
 *
 * for lower realist but better performance use  meshLamberMaterial , meshPhongMaterial
 * for just color use meshBasicMaterials
 * */

// // Tip 22
// const geometry = new THREE.BoxBufferGeometry(0.5, 0.5, 0.5)

// const material = new THREE.MeshNormalMaterial()

// const mesh = new THREE.InstancedMesh(geometry, material, 50);
// mesh.instanceMatrix.setUsage(THREE.DynamicDrawUsage);
// scene.add(mesh)
// for (let i = 0; i < 50; i++) {

//     const position = new THREE.Vector3(
//         (Math.random() - 0.5) * 10,
//         (Math.random() - 0.5) * 10,
//         (Math.random() - 0.5) * 10
//     );

//     const quaternion = new THREE.Quaternion()
//     quaternion.setFromEuler(
//         new THREE.Euler(
//             (Math.random() - 0.5) * Math.PI * 2,
//             (Math.random() - 0.5) * Math.PI * 2,
//             0
//         )
//     );
//     const matrix = new THREE.Matrix4()
//     matrix.makeRotationFromQuaternion(quaternion);
//     matrix.setPosition(position);
//     mesh.setMatrixAt(i, matrix);
//     // mesh.rotation.x = (Math.random() - 0.5) * Math.PI * 2
//     // mesh.rotation.y = (Math.random() - 0.5) * Math.PI * 2

// }


/**
 * Tip 23 use low poly render models
 */


/**
 * Tip 24 use draco compression format file if the model has a lot detail
 * it will cost initial delay but is better for the model rendering
 */


/**
 * Tip 25 GZip compress the glsl and other file
 * from the server side this needs an activation
 */


/**
 * Tip 26 reduce the field of vies
 */



/**
 * Tip 27 reduce the near and far to not render material from a distance
 */



// Tip 29 limit the device ration to 2
// renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

// TIP 30 make use of the best gpu by adding powerPreference: 'high-performance

// Tip 31 the default antialias is performant but less performant than no antialias so add antialias when only needed

// Tip 32 on post processing limit the number of passes

// Tip 33
const shaderGeometry = new THREE.PlaneBufferGeometry(10, 10, 256, 256)


// avoid using if statement they have performance 
const shaderMaterial = new THREE.ShaderMaterial({
    //check if the is a huge change if not just use lowp
    precision: 'lowp',
    uniforms: {
        uDisplacementTexture: { value: displacementTexture },
        Displacement_Strength: { value: 1.5 }
    },
    defines: {
        uDisplacementStrength: 1.5
    },
    // use short line of code so if a function exist use it
    // use define for not changing variable DON'T CHANGE THE DEFINES HERE
    // avoid doing calculation in the fragment shader do them in the vertex shader 
    vertexShader: `
        // #define uDisplacementStrength 1.5
        uniform sampler2D uDisplacementTexture;
        // uniform float uDisplacementStrength; 

        varying vec3 vColor;

        void main()
        {
            vec4 modelPosition = modelMatrix * vec4(position, 1.0);

            float elevation = texture2D(uDisplacementTexture, uv).r;
            elevation = clamp(elevation, 0.5,1.0);

            modelPosition.y += elevation * uDisplacementStrength;

            gl_Position = projectionMatrix * viewMatrix * modelPosition;
            
            float colorElevation = max(elevation,0.25);
            vec3 color =mix(vec3(1.0, 0.1, 0.1),vec3(0.1, 0.0, 0.5),colorElevation);
            vColor = color;
            
        }
    `,
    fragmentShader: `
        varying vec3 vColor;

        void main()
        {
            // vec3 depthColor = vec3(1.0, 0.1, 0.1);
            // vec3 surfaceColor = vec3(0.1, 0.0, 0.5);
            // vec3 finalColor = vec3(0.0);
            // finalColor.r += depthColor.r + (surfaceColor.r - depthColor.r) * vElevation;
            // finalColor.g += depthColor.g + (surfaceColor.g - depthColor.g) * vElevation;
            // finalColor.b += depthColor.b + (surfaceColor.b - depthColor.b) * vElevation;
            // vec3 finalColor = mix(vec3(1.0, 0.1, 0.1),vec3(0.1, 0.0, 0.5),vElevation);
            gl_FragColor = vec4(vColor, 1.0);
        }
    `
})

const shaderMesh = new THREE.Mesh(shaderGeometry, shaderMaterial)
shaderMesh.rotation.x = -Math.PI * 0.5
scene.add(shaderMesh)