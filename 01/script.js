
// setup the scene
const scene = new THREE.Scene();

// setup mesh which is a box
const geometry = new THREE.BoxGeometry(1,1,1);
const material = new THREE.MeshBasicMaterial({color:0xFF0000})
const mesh = new THREE.Mesh(geometry, material);

scene.add(mesh);


// setup the camera
const size= {
    width: 800,
    height: 600,
}
const camera = new THREE.PerspectiveCamera(75, size.width/size.height );
camera.position.z = 3;
scene.add(camera);

// setup the render of the box
const canvas = document.querySelector(".webgl")
const renderer =new THREE.WebGLRenderer({
    canvas
})

renderer.setSize(size.width,size.height);

renderer.render(scene, camera)