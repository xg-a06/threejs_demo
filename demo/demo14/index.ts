import {
  Scene,
  PerspectiveCamera,
  WebGLRenderer,
  Vector3,
  Mesh,
  BoxGeometry,
  TextureLoader,
  MeshBasicMaterial,
  DoubleSide,
  Texture,
} from 'three';

import { WEBGL } from 'three/examples/jsm/WebGL';

import Stats from 'stats.js';

import clock from './js/clock.js';

let scene: Scene;
let camera: PerspectiveCamera;
let renderer: WebGLRenderer;
let stats: Stats;
let texture: Texture;
let mesh: Mesh;
function initScene() {
  scene = new Scene();
}

function initLight() {
  console.log('init light');
}

function initObject() {
  const geometry = new BoxGeometry(150, 150, 150);

  const canvas = clock();

  texture = new Texture(canvas);
  const material = new MeshBasicMaterial({ map: texture });
  mesh = new Mesh(geometry, material);

  scene.add(mesh);
}

function initCamera() {
  camera = new PerspectiveCamera(45, window.innerWidth / window.innerHeight, 1, 2000);
  camera.position.x = 0;
  camera.position.y = 0;
  camera.position.z = 500;
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
  renderer.setClearColor(0xffffff, 1.0);
  document.body.appendChild(renderer.domElement);

  initStats();
}

function render() {
  requestAnimationFrame(render);
  texture.needsUpdate = true;
  mesh.rotation.y -= 0.01;
  mesh.rotation.x -= 0.01;
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

window.addEventListener(
  'resize',
  () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
  },
  false
);
