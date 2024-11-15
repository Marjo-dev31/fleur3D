import * as THREE from "three";

const canvas = document.querySelector(".js-canvas");
const canvasWidth = window.innerWidth;
const canvasHeight = window.innerHeight;

// Create scene
const scene = new THREE.Scene();
scene.background = new THREE.Color("skyblue");

//Create camera

const aspectRatio = canvasWidth / canvasHeight;
const camera = new THREE.PerspectiveCamera(
   75,
   aspectRatio,
   0.1,
   1000
);
camera.position.z = 5;

//Create render
const renderer = new THREE.WebGLRenderer();
renderer.setSize(canvasWidth, canvasHeight);
canvas.appendChild(renderer.domElement);

//Add cube

const geometry = new THREE.BoxGeometry(1, 1, 1);
const cubeColor = new THREE.Color("red");
const material = new THREE.MeshBasicMaterial({ color: cubeColor });
const cube = new THREE.Mesh(geometry, material);
cube.rotation.x = Math.PI * 0.25
cube.rotation.y = Math.PI * 0.25
scene.add(cube);

//View by camera
animate()


//Animate cube
function animate() {
    requestAnimationFrame(animate)
    cube.rotation.x += 0.01
    cube.rotation.y += 0.01
    renderer.render(scene, camera);
}