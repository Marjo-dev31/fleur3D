import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";

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
      this.createOrbitControls();

      this.createStem();
      this.createPistil();
      this.createPetals();

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
      this.camera.position.z = 100;
   }

   createOrbitControls() {
      this.controls = new OrbitControls(
         this.camera,
         this.renderer.domElement
      );
   }

   createRender() {
      this.renderer = new THREE.WebGLRenderer();
      this.renderer.setSize(this.canvasWidth, this.canvasHeight);
      this.canvas.appendChild(this.renderer.domElement);
   }

   createStem() {
      const geometry = new THREE.CylinderGeometry(2, 2, 20, 32);
      const color = new THREE.Color("rgb(0, 255, 0)");
      const material = new THREE.MeshBasicMaterial({ color: color });
      const cylinder = new THREE.Mesh(geometry, material);
      this.scene.add(cylinder);
   }

   createPistil() {}

   createPetals() {}

   animate() {
      requestAnimationFrame(this.animate.bind(this));
      this.controls.update();
      this.renderer.render(this.scene, this.camera);
   }
}

export { Flower };
