import './style.css'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import * as dat from 'dat.gui'
import { Plane, PointLight } from 'three'

/**
 * Base
 */
// Debug
const gui = new dat.GUI()

// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()

//fog
const fog = new THREE.Fog("#262837", 1, 15)
scene.fog = fog;

/**
 * Textures
 */
const textureLoader = new THREE.TextureLoader()
const doorColorTexture = textureLoader.load("/textures/door/color.jpg");
const doorAlphaTexture = textureLoader.load("/textures/door/alpha.jpg");
const doorAmbientOcclusionTexture = textureLoader.load("/textures/door/ambientOcclusion.jpg");
const doorHeightTexture = textureLoader.load("/textures/door/height.jpg");
const doorNormalTexture = textureLoader.load("/textures/door/normal.jpg");
const doorRoughnessTexture = textureLoader.load("/textures/door/roughness.jpg");
const doorMetalnessTexture = textureLoader.load("/textures/door/metalness.jpg");


const brickColorTexture = textureLoader.load("/textures/bricks/color.jpg");
const brickAmbientOcclusionTexture = textureLoader.load("/textures/bricks/ambientOcclusion.jpg");
const brickNormalTexture = textureLoader.load("/textures/bricks/normal.jpg");
const brickRoughnessTexture = textureLoader.load("/textures/bricks/roughness.jpg");


const bushColorTexture = textureLoader.load("/textures/bush/color.jpg");
const bushAmbientOcclusionTexture = textureLoader.load("/textures/bush/ambientOcclusion.jpg");
const bushNormalTexture = textureLoader.load("/textures/bush/normal.jpg");
const bushRoughnessTexture = textureLoader.load("/textures/bush/roughness.jpg");
const bushHeightTexture = textureLoader.load("/textures/bush/height.jpg");

const graveColorTexture = textureLoader.load("/textures/grave/color.jpg");
const graveAmbientOcclusionTexture = textureLoader.load("/textures/grave/ambientOcclusion.jpg");
const graveNormalTexture = textureLoader.load("/textures/grave/normal.jpg");
const graveRoughnessTexture = textureLoader.load("/textures/grave/roughness.jpg");
const graveHeightTexture = textureLoader.load("/textures/grave/height.jpg");

const grassColorTexture = textureLoader.load("/textures/grass/color.jpg");
const grassAmbientOcclusionTexture = textureLoader.load("/textures/grass/ambientOcclusion.jpg");
const grassNormalTexture = textureLoader.load("/textures/grass/normal.jpg");
const grassRoughnessTexture = textureLoader.load("/textures/grass/roughness.jpg");
grassColorTexture.repeat.set(7, 7);
grassAmbientOcclusionTexture.repeat.set(7, 7);
grassNormalTexture.repeat.set(7, 7);
grassRoughnessTexture.repeat.set(7, 7);

grassColorTexture.wrapS = THREE.RepeatWrapping;
grassAmbientOcclusionTexture.wrapS = THREE.RepeatWrapping;
grassNormalTexture.wrapS = THREE.RepeatWrapping;
grassRoughnessTexture.wrapS = THREE.RepeatWrapping;
grassColorTexture.wrapT = THREE.RepeatWrapping;
grassAmbientOcclusionTexture.wrapT = THREE.RepeatWrapping;
grassNormalTexture.wrapT = THREE.RepeatWrapping;
grassRoughnessTexture.wrapT = THREE.RepeatWrapping;
/**
 * House
 */

// group
const house = new THREE.Group();
scene.add(house);

//walls
let wallHeight = 2.5;
let wallDepth = 4;
let wallWidth = 4;
const walls = new THREE.Mesh(
    new THREE.BoxBufferGeometry(wallWidth, wallHeight, wallDepth),
    new THREE.MeshStandardMaterial({
        map: brickColorTexture,
        aoMap: brickAmbientOcclusionTexture,
        normalMap: brickNormalTexture,
        roughnessMap: brickRoughnessTexture,
    }),
);
walls.geometry.setAttribute(
    "uv2",
    new THREE.Float32BufferAttribute(walls.geometry.attributes.uv.array, 2)
);
walls.position.y = wallHeight / 2;

//roof
let roofHeight = 1;
const roof = new THREE.Mesh(
    new THREE.ConeBufferGeometry(3.25, roofHeight, 4),
    new THREE.MeshStandardMaterial({ color: "#b35f45" }),
)
roof.position.y = wallHeight + roofHeight / 2;
roof.rotation.y = Math.PI / 4
house.add(walls, roof);

//door
const door = new THREE.Mesh(
    new THREE.PlaneBufferGeometry(2.2, 2.2, 100, 100),
    new THREE.MeshStandardMaterial({
        map: doorColorTexture,
        transparent: true,
        alphaMap: doorAlphaTexture,
        aoMap: doorAmbientOcclusionTexture,
        displacementMap: doorHeightTexture,
        displacementScale: 0.1,
        normalMap: doorNormalTexture,
        roughnessMap: doorRoughnessTexture,
        metalnessMap: doorMetalnessTexture,

    })
);
// we need to do this for the AmbientOcclusion texture to be added 
door.geometry.setAttribute(
    "uv2",
    new THREE.Float32BufferAttribute(door.geometry.attributes.uv.array, 2)
);
door.position.z = 2 + 0.01;
door.position.y = 1;
house.add(door)

//Buses
const bushMaterial = new THREE.MeshStandardMaterial({
    map: bushColorTexture,
    aoMap: bushAmbientOcclusionTexture,
    normalMap: bushNormalTexture,
    roughnessMap: bushRoughnessTexture,
    displacementMap: bushHeightTexture,
    displacementScale: 0.1,

});
const bushGeometry = new THREE.SphereBufferGeometry(1, 16, 16);


const bush1 = new THREE.Mesh(bushGeometry, bushMaterial);
bush1.scale.set(0.5, 0.5, 0.5);
bush1.position.set(0.8, 0.2, 2.2, );
bush1.geometry.setAttribute(
    "uv2",
    new THREE.Float32BufferAttribute(bush1.geometry.attributes.uv.array, 2)
);

const bush2 = new THREE.Mesh(bushGeometry, bushMaterial);
bush2.scale.set(0.25, 0.25, 0.25);
bush2.position.set(1.4, 0.1, 2.1, );
bush2.geometry.setAttribute(
    "uv2",
    new THREE.Float32BufferAttribute(bush2.geometry.attributes.uv.array, 2)
);

const bush3 = new THREE.Mesh(bushGeometry, bushMaterial);
bush3.scale.set(0.4, 0.4, 0.4);
bush3.position.set(-0.8, 0.1, 2.2, );
bush3.geometry.setAttribute(
    "uv2",
    new THREE.Float32BufferAttribute(bush3.geometry.attributes.uv.array, 2)
);

const bush4 = new THREE.Mesh(bushGeometry, bushMaterial);
bush4.scale.set(0.15, 0.15, 0.15);
bush4.position.set(-1, 0.05, 2.6, );
bush4.geometry.setAttribute(
    "uv2",
    new THREE.Float32BufferAttribute(bush4.geometry.attributes.uv.array, 2)
);

house.add(bush1, bush2, bush3, bush4)

//Grave
const graves = new THREE.Group();

scene.add(graves);

const gravesMaterial = new THREE.MeshStandardMaterial({
    map: graveColorTexture,
    aoMap: graveAmbientOcclusionTexture,
    normalMap: graveNormalTexture,
    roughnessMap: graveRoughnessTexture,
});
const gravesGeometry = new THREE.BoxBufferGeometry(0.6, 0.8, 0.2, );

for (let i = 0; i < 25; i++) {
    const grave = new THREE.Mesh(gravesGeometry, gravesMaterial);
    const angle = Math.random() * Math.PI * 2;
    const radius = 4 + Math.random() * 5;
    const x = Math.sin(angle) * radius;
    const z = Math.cos(angle) * radius;
    grave.position.set(x, 0.3, z);
    grave.rotation.y = (Math.random() - 0.5) * 0.4;
    grave.rotation.z = (Math.random() - 0.5) * 0.4;
    grave.castShadow = true;
    graves.add(grave)
}

// Floor
const floor = new THREE.Mesh(
    new THREE.PlaneBufferGeometry(20, 20),
    new THREE.MeshStandardMaterial({
        map: grassColorTexture,
        aoMap: grassAmbientOcclusionTexture,
        normalMap: grassNormalTexture,
        roughnessMap: grassRoughnessTexture,
    })
);
floor.material.side = THREE.DoubleSide;

floor.geometry.setAttribute(
    "uv2",
    new THREE.Float32BufferAttribute(floor.geometry.attributes.uv.array, 2)
);
floor.rotation.x = -Math.PI * 0.5
floor.position.y = 0
scene.add(floor)

/**
 * Lights
 */
// Ambient light
const ambientLight = new THREE.AmbientLight('#b9d5ff', 0.12)
gui.add(ambientLight, 'intensity').min(0).max(1).step(0.001)
scene.add(ambientLight)

// Directional light
const moonLight = new THREE.DirectionalLight('#ffffff', 0.12)
moonLight.position.set(4, 5, -2)
gui.add(moonLight, 'intensity').min(0).max(1).step(0.001)
gui.add(moonLight.position, 'x').min(-5).max(5).step(0.001)
gui.add(moonLight.position, 'y').min(-5).max(5).step(0.001)
gui.add(moonLight.position, 'z').min(-5).max(5).step(0.001)
scene.add(moonLight)

const doorLight = new THREE.PointLight("#ff7d46", 1, 7)
doorLight.position.set(0, 2.2, 2.7)
house.add(doorLight);

const ghost1 = new THREE.PointLight("#ff00ff", 2, 3)
const ghost2 = new THREE.PointLight("#00ffff", 2, 3)
const ghost3 = new THREE.PointLight("#ffff00", 2, 3)
scene.add(ghost1, ghost2, ghost3);

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
camera.position.x = 4
camera.position.y = 2
camera.position.z = 5
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
renderer.setClearColor("#262837")

// Shadows
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;

moonLight.castShadow = true;
doorLight.castShadow = true;
doorLight.shadow.mapSize.width = 256;
doorLight.shadow.mapSize.height = 256;
doorLight.shadow.camera.far = 6;
ghost1.castShadow = true;
ghost1.shadow.mapSize.width = 256;
ghost1.shadow.mapSize.height = 256;
ghost1.shadow.camera.far = 6;
ghost2.castShadow = true;
ghost2.shadow.mapSize.width = 256;
ghost2.shadow.mapSize.height = 256;
ghost2.shadow.camera.far = 6;
ghost3.castShadow = true;
ghost3.shadow.mapSize.width = 256;
ghost3.shadow.mapSize.height = 256;
ghost3.shadow.camera.far = 6;

walls.castShadow = true;
bush1.castShadow = true;
bush2.castShadow = true;
bush3.castShadow = true;
floor.receiveShadow = true;

/**
 * Animate
 */
const clock = new THREE.Clock()

const tick = () => {
    const elapsedTime = clock.getElapsedTime()

    // Update controls
    controls.update()
    const ghostAngle = elapsedTime * 0.5;
    ghost1.position.x = Math.sin(ghostAngle) * 4;
    ghost1.position.z = Math.cos(ghostAngle) * 4;
    ghost1.position.y = Math.sin(elapsedTime * 3);


    const ghostAngle1 = -elapsedTime * 0.32;
    ghost2.position.x = Math.sin(ghostAngle1) * 5;
    ghost2.position.z = Math.cos(ghostAngle1) * 5;
    ghost2.position.y = Math.sin(elapsedTime * 4) + Math.sin(elapsedTime * 2.5);


    const ghostAngle2 = -elapsedTime * 0.17;
    ghost3.position.x = Math.sin(ghostAngle2) * (7 + Math.sin(elapsedTime * 0.32));
    ghost3.position.z = Math.cos(ghostAngle2) * (7 + Math.sin(elapsedTime * 0.5));
    ghost3.position.y = Math.sin(elapsedTime * 4) + Math.sin(elapsedTime * 2.5);

    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()