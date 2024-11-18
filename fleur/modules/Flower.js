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

      this.createGroupObject();
      this.createStem();
      this.createPistil();
      this.createPetals();
      this.createAxis();
      this.createNorth();

      this.createOrbitControls();
      // this.createHelper();

      this.addGroupToScene();

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
      this.camera.position.z = 250;
      this.camera.position.x = 0;
      this.camera.position.y = 200;
   }

   createOrbitControls() {
      this.controls = new OrbitControls(
         this.camera,
         this.renderer.domElement
      );
   }

   createHelper() {
      const axesHelper = new THREE.AxesHelper(100);
      this.scene.add(axesHelper);
   }

   createRender() {
      this.renderer = new THREE.WebGLRenderer();
      this.renderer.setSize(this.canvasWidth, this.canvasHeight);
      this.canvas.appendChild(this.renderer.domElement);
   }

   createGroupObject() {
      this.group = new THREE.Group();
   }

   createStem() {
      this.stemHeight = 50;
      const geometry = new THREE.CylinderGeometry(
         2,
         2,
         this.stemHeight,
         32
      );
      const color = new THREE.Color("rgb(0, 255, 0)");
      const material = new THREE.MeshBasicMaterial({ color: color });
      const cylinder = new THREE.Mesh(geometry, material);
      cylinder.position.y = this.stemHeight / 2;
      this.group.add(cylinder);
   }

   createPistil() {
      const geometry = new THREE.SphereGeometry(3, 32, 16);
      const material = new THREE.MeshBasicMaterial({
         color: 0xffff00,
      });
      const sphere = new THREE.Mesh(geometry, material);
      sphere.position.y = this.stemHeight;
      this.group.add(sphere);
   }

   createPetals() {
      const geometry = new THREE.TorusGeometry(6, 1, 16, 100);
      const color = new THREE.Color(255, 0, 0);
      const material = new THREE.MeshBasicMaterial({
         color: color,
      });
      const positionsX = [-5, 0, 5, 0];
      const positionsZ = [0, -5, 0, 5];
      const rotationsY = [-30, -5, 30, 0];
      const rotationsX = [90, 120, 90, 60];
      for (let i = 0; i < 4; i++) {
         const torus = new THREE.Mesh(geometry, material);
         torus.position.y = this.stemHeight;
         torus.rotation.x = THREE.MathUtils.degToRad(rotationsX[i]);
         torus.position.x = positionsX[i];
         torus.position.z = positionsZ[i];
         torus.rotation.y = THREE.MathUtils.degToRad(rotationsY[i]);
         this.group.add(torus);
      }
   }

   createAxis() {
      const geometry = new THREE.TorusGeometry(40, 1, 16, 100);
      const color = new THREE.Color(0, 0, 0);
      const material = new THREE.MeshBasicMaterial({
         color: color,
      });
      const torus = new THREE.Mesh(geometry, material);
      torus.rotation.x = THREE.MathUtils.degToRad(90);
      this.scene.add(torus);
   }

   createNorth() {
      const geometry = new THREE.CylinderGeometry(0, 5, 20, 32);
      const material = new THREE.MeshBasicMaterial({
         color: "orange",
      });
      const cylinder = new THREE.Mesh(geometry, material);
      cylinder.position.z = -30;
      cylinder.rotation.x = THREE.MathUtils.degToRad(270);
      this.scene.add(cylinder);
   }

   addGroupToScene() {
      this.scene.add(this.group);
   }

   animate() {
      requestAnimationFrame(this.animate.bind(this));
      this.controls.update();

      if (window.app.city === "") {
         this.group.rotation.y += 0.01;
      } else {
         const windSpeedDeg = THREE.MathUtils.degToRad(
            window.app.windSpeed * 2
         );
         if (this.group.rotation.z < windSpeedDeg)
            this.group.rotation.z += 0.01 * windSpeedDeg;
         this.group.rotation.y = THREE.MathUtils.degToRad(
            270 - window.app.windDirection
         );
      }

      this.renderer.render(this.scene, this.camera);
   }
}

export { Flower };
