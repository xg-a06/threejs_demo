import {
  Scene,
  BoxGeometry,
  MeshBasicMaterial,
  Mesh,
  PerspectiveCamera,
  WebGLRenderer,
} from 'three';

import { WEBGL } from 'three/examples/jsm/WebGL';

let scene: THREE.Scene;
let geometry: THREE.BoxGeometry;
let material: THREE.MeshBasicMaterial;
let obj: THREE.Mesh;
let camera: THREE.PerspectiveCamera;
let renderer: THREE.WebGLRenderer;

function initScene() {
  scene = new Scene();
}

function initLight() {
  console.log('init light');
}

function initObject() {
  geometry = new BoxGeometry(1, 1, 1);
  material = new MeshBasicMaterial({ color: 0xff0000 });
  obj = new Mesh(geometry, material);
  scene.add(obj);
}

function initCamera() {
  camera = new PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
  camera.position.z = 5;
}

function initRenderer() {
  renderer = new WebGLRenderer();
  renderer.setSize(window.innerWidth, window.innerHeight);
  document.body.appendChild(renderer.domElement);
}

function render() {
  requestAnimationFrame(render);
  obj.rotation.y += 0.05;
  renderer.render(scene, camera);
}

function work() {
  if (WEBGL.isWebGLAvailable()) {
    initScene();
    initLight();
    initObject();
    initCamera();
    initRenderer();
    render();
  } else {
    console.log(WEBGL.getWebGLErrorMessage());
  }
}

window.addEventListener('DOMContentLoaded', () => {
  work();
});
