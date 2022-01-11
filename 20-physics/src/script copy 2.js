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
world.broadphase = new CANNON.SAPBroadphase(world);
// world.allowSleep = true;
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



//sound


const hitSound = new Audio("/sounds/hit.mp3");
const hitSound1 = new Audio("/sounds/hit1.mp3");
const hitSound2 = new Audio("/sounds/hit2.mp3");
const hitSound3 = new Audio("/sounds/hit3.mp3");

let maxVolume = 0;
const playHitSound = (collision) => {
    const impactStrength = collision.contact.getImpactVelocityAlongNormal();
    if (impactStrength > maxVolume) maxVolume = impactStrength;
    let random = (Math.random() - 0.5);
    let vol = impactStrength / maxVolume;
    if (random > 0 && Math.abs((random * 10000).toFixed(0)) % 2 === 0 && impactStrength > 1.5) {
        console.log(1)
        hitSound.volume = vol;
        hitSound.currentTime = 0;
        hitSound.play();
    } else if (random > 0 && impactStrength > 1.5) {
        console.log(2)
        hitSound1.volume = vol;
        hitSound1.currentTime = 0;
        hitSound1.play();
    } else if (random < 0 && Math.abs((random * 10000).toFixed(0)) % 2 === 0 && impactStrength > 1.5) {
        console.log(3)
        hitSound2.volume = vol;
        hitSound2.currentTime = 0;
        hitSound2.play();
    } else if (random < 0 && impactStrength > 1.5) {
        console.log(4)
        hitSound3.volume = vol;
        hitSound3.currentTime = 0;
        hitSound3.play();
    }

};
//Floor
const floorShape = new CANNON.Plane();
const floorBody = new CANNON.Body();
floorBody.mass = 0;
floorBody.addShape(floorShape);
floorBody.quaternion.setFromAxisAngle(new CANNON.Vec3(-1, 0, 0), Math.PI * 0.5);
world.addBody(floorBody);

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
const material = new THREE.MeshStandardMaterial({
    metalness: 0.3,
    roughness: 0.4,
    envMap: environmentMapTexture
})
const createSphere = (radius, position) => {
    // THREE.js Mesh
    const mesh = new THREE.Mesh(
        sphereGeometry,
        material
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
    body.addEventListener('collide', playHitSound);
    objectsToUpdated.push({
        mesh,
        body,
    })
}
const boxGeometry = new THREE.BoxBufferGeometry(1, 1, 1, );
const createBox = (width, height, depth, position) => {
    // THREE.js Mesh
    const mesh = new THREE.Mesh(
        boxGeometry,
        material
    );
    mesh.scale.set(width, height, depth)
    mesh.castShadow = true;
    mesh.position.copy(position);
    scene.add(mesh);


    //CANNON
    const shape = new CANNON.Box(
        new CANNON.Vec3(
            width * 0.5,
            height * 0.5,
            depth * 0.5
        )
    );
    const body = new CANNON.Body({
        mass: 1,
        position: new CANNON.Vec3(0, 3, 0),
        shape,
    })
    body.position.copy(position);
    body.addEventListener('collide', playHitSound);
    world.addBody(body);
    objectsToUpdated.push({
        mesh,
        body,
    })
}

createSphere(0.5, { x: 0, y: 5, z: 0 });

createBox(0.5, 1, 1, { x: 3, y: 5, z: 0 });


debugObject.createSphere = () => {
    createSphere(Math.random() + 0.5, { x: (Math.random() - 0.5) * 3, y: 3, z: (Math.random() - 0.5) * 3, });
}



debugObject.createBox = () => {
    createBox(
        Math.random() + 0.5,
        Math.random() + 0.5,
        Math.random() + 0.5, {
            x: (Math.random() - 0.5) * 3,
            y: 5,
            z: (Math.random() - 0.5) * 3,
        }
    );
}

debugObject.reset = () => {
    for (const object of objectsToUpdated) {
        //remove body
        object.body.removeEventListener('collide', playHitSound);
        world.remove(object.body);

        scene.remove(object.mesh);
    }
}

gui.add(debugObject, "createSphere");
gui.add(debugObject, "createBox");
gui.add(debugObject, "reset");
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
        object.mesh.quaternion.copy(object.body.quaternion);
    }

    // Update controls
    controls.update()

    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()