import {
  Scene,
  PerspectiveCamera,
  WebGLRenderer,
  Vector3,
  Mesh,
  CylinderGeometry,
  MeshLambertMaterial,
  AmbientLight,
  PointLight,
} from 'three';

import { WEBGL } from 'three/examples/jsm/WebGL';

import Stats from 'stats.js';

let scene: Scene;
let camera: PerspectiveCamera;
let renderer: WebGLRenderer;
let mesh: Mesh;
let stats: Stats;

function initScene() {
  scene = new Scene();
}

function initLight() {
  const light1 = new AmbientLight(0xff0000);
  light1.position.set(100, 100, 200);
  scene.add(light1);
  const light2 = new PointLight(0x00ff00);
  light2.position.set(0, 0, 300);
  scene.add(light2);
}

function initObject() {
  const geometry = new CylinderGeometry(100, 150, 200);
  const material = new MeshLambertMaterial({ color: 0xffff00 });
  mesh = new Mesh(geometry, material);
  scene.add(mesh);
}

function initCamera() {
  camera = new PerspectiveCamera(45, window.innerWidth / window.innerHeight, 1, 2000);
  camera.position.x = 0;
  camera.position.y = 0;
  camera.position.z = 1000;
  camera.up.x = 0;
  camera.up.y = 1;
  camera.up.z = 0;
  camera.lookAt(new Vector3(0, 0, 0));
}

function initStats() {
  stats = new Stats();
  document.body.appendChild(stats.dom);
}

function initRenderer() {
  renderer = new WebGLRenderer({
    antialias: true, // 抗锯齿
  });
  renderer.setSize(window.innerWidth, window.innerHeight);
  // renderer.setClearColor(0xffffff, 1.0);
  document.body.appendChild(renderer.domElement);

  initStats();
}

function render() {
  requestAnimationFrame(render);
  const txtFov: HTMLInputElement = document.getElementById('txtFov') as HTMLInputElement;
  if (txtFov) {
    camera.fov = Number(txtFov.value);
    camera.updateProjectionMatrix();
  }

  renderer.render(scene, camera);
  stats.update();
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
