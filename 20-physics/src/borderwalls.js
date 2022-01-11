import './style.css'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import * as dat from 'dat.gui'
import CANNON, { Body } from 'cannon'







/**
 * Debug
 */
const gui = new dat.GUI()
const debugObject = {};

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
const cubeTextureLoader = new THREE.CubeTextureLoader()

const environmentMapTexture = cubeTextureLoader.load([
    '/textures/environmentMaps/0/px.png',
    '/textures/environmentMaps/0/nx.png',
    '/textures/environmentMaps/0/py.png',
    '/textures/environmentMaps/0/ny.png',
    '/textures/environmentMaps/0/pz.png',
    '/textures/environmentMaps/0/nz.png'
]);


/**
 * Physics 
 */

//World
const world = new CANNON.World();
world.gravity.set(0, -9.82, 0);

// Material
const defaultMaterial = new CANNON.Material('default');

const defaultContactMaterial = new CANNON.ContactMaterial(
    defaultMaterial,
    defaultMaterial, {
        friction: 0.1,
        restitution: 0.8,
    }
);
world.defaultContactMaterial = defaultContactMaterial;

//Floor
const floorShape = new CANNON.Plane();
const floorBody = new CANNON.Body();
floorBody.mass = 0;
floorBody.addShape(floorShape);
floorBody.quaternion.setFromAxisAngle(new CANNON.Vec3(-1, 0, 0), Math.PI * 0.5);
world.addBody(floorBody);


//wall
const wallShape = new CANNON.Plane();
const wallBody = new CANNON.Body();
wallBody.mass = 0;
wallBody.addShape(wallShape);
wallBody.position.set(5, 5, 0)
wallBody.quaternion.setFromAxisAngle(new CANNON.Vec3(0, -1, 0), Math.PI * 0.5);

world.addBody(wallBody);
const wallBody1 = new CANNON.Body();
wallBody1.mass = 0;
wallBody1.addShape(wallShape);
wallBody1.position.set(-5, 5, 0)
wallBody1.quaternion.setFromAxisAngle(new CANNON.Vec3(0, -1, 0), Math.PI * 0.5);

const wallBody2 = new CANNON.Body();
wallBody2.mass = 0;
wallBody2.addShape(wallShape);
wallBody2.position.set(0, 5, 5)
wallBody2.quaternion.setFromAxisAngle(new CANNON.Vec3(0, 0, 1), Math.PI * 0.5);

const wallBody3 = new CANNON.Body();
wallBody3.mass = 0;
wallBody3.addShape(wallShape);
wallBody3.position.set(0, 5, -5)
wallBody3.quaternion.setFromAxisAngle(new CANNON.Vec3(0, 0, -1), Math.PI * 0.5);

world.addBody(wallBody3);


/**
 * Floor
 */
const floorGeometry = new THREE.PlaneBufferGeometry(10, 10, 100, 100);
const floorMaterial = new THREE.MeshStandardMaterial({
    color: '#777777',
    metalness: 0.3,
    roughness: 0.4,
    envMap: environmentMapTexture
});
const floor = new THREE.Mesh(
    floorGeometry, floorMaterial
)
floorMaterial.side = THREE.DoubleSide;
floor.receiveShadow = true
floor.rotation.x = -Math.PI * 0.5
scene.add(floor);
// const wall = new THREE.Mesh(
//     floorGeometry, floorMaterial
// )
// wall.position.set(5, 5, 0)
// wall.rotation.y = -Math.PI * 0.5

// const wall1 = new THREE.Mesh(
//     floorGeometry, floorMaterial
// )
// wall1.position.set(-5, 5, 0)
// wall1.rotation.y = -Math.PI * 0.5


// const wall2 = new THREE.Mesh(
//     floorGeometry, floorMaterial
// )
// wall2.position.set(0, 5, 5)
// wall2.rotation.z = -Math.PI * 0.5

// const wall3 = new THREE.Mesh(
//     floorGeometry, floorMaterial
// )
// wall3.position.set(0, 5, -5)
// wall3.rotation.z = -Math.PI * 0.5
// scene.add(floor, wall, wall1, wall2, wall3)

/**
 * Lights
 */
const ambientLight = new THREE.AmbientLight(0xffffff, 0.7)
scene.add(ambientLight)

const directionalLight = new THREE.DirectionalLight(0xffffff, 0.2)
directionalLight.castShadow = true
directionalLight.shadow.mapSize.set(1024, 1024)
directionalLight.shadow.camera.far = 15
directionalLight.shadow.camera.left = -7
directionalLight.shadow.camera.top = 7
directionalLight.shadow.camera.right = 7
directionalLight.shadow.camera.bottom = -7
directionalLight.position.set(5, 5, 5)
scene.add(directionalLight)

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
camera.position.set(-3, 3, 3)
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
renderer.shadowMap.enabled = true
renderer.shadowMap.type = THREE.PCFSoftShadowMap
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))


/**
 * Utils
 */

const objectsToUpdated = [];
const sphereGeometry = new THREE.SphereBufferGeometry(1, 40, 40);
const sphereMaterial = new THREE.MeshStandardMaterial({
    metalness: 0.3,
    roughness: 0.4,
    envMap: environmentMapTexture
})
const createSphere = (radius, position) => {
    // THREE.js Mesh
    const mesh = new THREE.Mesh(
        sphereGeometry,
        sphereMaterial
    );
    mesh.scale.set(radius, radius, radius)
    mesh.castShadow = true;
    mesh.position.copy(position);
    scene.add(mesh);


    //CANNON
    const shape = new CANNON.Sphere(radius);
    const body = new CANNON.Body({
        mass: 1,
        position: new CANNON.Vec3(0, 3, 0),
        shape,
    })
    body.position.copy(position);
    world.addBody(body);
    objectsToUpdated.push({
        mesh,
        body,
    })
}

createSphere(0.5, { x: 0, y: 5, z: 0 });


debugObject.createSphere = () => {
    createSphere(Math.random() + 0.5, { x: (Math.random() - 0.5) * 3, y: 3, z: (Math.random() - 0.5) * 3, });
}

gui.add(debugObject, "createSphere");
/**
 * Animate
 */

let oldElapsedTime = 0;
const clock = new THREE.Clock()

const tick = () => {
    const elapsedTime = clock.getElapsedTime()
    const deltaTime = elapsedTime - oldElapsedTime;
    oldElapsedTime = elapsedTime;

    //Update Physics World
    world.step(
        1 / 60, oldElapsedTime, 3
    );

    for (const object of objectsToUpdated) {
        object.mesh.position.copy(object.body.position)
    }

    // Update controls
    controls.update()

    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()