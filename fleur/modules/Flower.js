import * as THREE from "three";

class Flower {
   constructor() {
      this.canvas = document.querySelector(".js-canvas");
      this.canvasWidth = window.innerWidth;
      this.canvasHeight = window.innerHeight;

      this.init();
   }

   init() {
      this.createScene();
      this.createCamera();
      this.createRender();
      this.createCube();
      this.animate();
   }

   createScene() {
      this.scene = new THREE.Scene();
      this.scene.background = new THREE.Color("skyblue");
   }

   createCamera() {
      const aspectRatio = this.canvasWidth / this.canvasHeight;
      this.camera = new THREE.PerspectiveCamera(
         75,
         aspectRatio,
         0.1,
         1000
      );
      this.camera.position.z = 5;
   }

   createRender() {
      this.renderer = new THREE.WebGLRenderer();
      this.renderer.setSize(this.canvasWidth, this.canvasHeight);
      this.canvas.appendChild(this.renderer.domElement);
   }

   createCube() {
      const geometry = new THREE.BoxGeometry(1, 1, 1);
      const color = new THREE.Color("red");
      const material = new THREE.MeshBasicMaterial({ color: color });
      this.cube = new THREE.Mesh(geometry, material);
      this.cube.rotation.x = Math.PI * 0.25;
      this.cube.rotation.y = Math.PI * 0.25;
      this.scene.add(this.cube);
   }

   animate() {
    requestAnimationFrame(this.animate.bind(this))
    this.cube.rotation.x += 0.01
    this.cube.rotation.y += 0.01
    this.renderer.render(this.scene, this.camera);
   }
}

export { Flower };
