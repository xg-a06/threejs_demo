import {
  Scene,
  PerspectiveCamera,
  WebGLRenderer,
  Vector3,
  Mesh,
  MeshLambertMaterial,
  BoxGeometry,
  AxesHelper,
  AmbientLight,
  PointLight,
  DirectionalLight,
  SpotLight,
} from 'three';

import { WEBGL } from 'three/examples/jsm/WebGL';

import Stats from 'stats.js';

let scene: Scene;
let camera: PerspectiveCamera;
let renderer: WebGLRenderer;
let stats: Stats;

function initScene() {
  scene = new Scene();
}

function initLight() {
  // const light1 = new AmbientLight(0xff0000);
  // scene.add(light1);

  // const light2 = new PointLight(0x00ff00, 1, 800);
  // light2.position.set(0, 0, 200);
  // scene.add(light2);

  const light3 = new SpotLight(0x00ff00);
  light3.position.set(0, 0, 200);
  scene.add(light3);

  // const light4 = new DirectionalLight(0x00ff00);
  // light4.position.set(0, 0, 1); // 只代表方向 不在意具体距离
  // scene.add(light4);
}

function initObject() {
  const geometry1 = new BoxGeometry(100, 100, 100);
  const material1 = new MeshLambertMaterial({ color: 0xffffff });
  const mesh1 = new Mesh(geometry1, material1);
  mesh1.position.set(0, 0, 0);
  scene.add(mesh1);

  const geometry2 = new BoxGeometry(100, 100, 100);
  const material2 = new MeshLambertMaterial({ color: 0xffffff });
  const mesh2 = new Mesh(geometry2, material2);
  mesh2.position.set(-200, 0, 0);
  scene.add(mesh2);

  const geometry3 = new BoxGeometry(100, 100, 100);
  const material3 = new MeshLambertMaterial({ color: 0xffffff });
  const mesh3 = new Mesh(geometry3, material3);
  mesh3.position.set(200, 0, 0);
  scene.add(mesh3);

  const geometry4 = new BoxGeometry(100, 100, 100);
  const material4 = new MeshLambertMaterial({ color: 0xffffff });
  const mesh4 = new Mesh(geometry4, material4);
  mesh4.position.set(0, 200, 0);
  scene.add(mesh4);

  const geometry5 = new BoxGeometry(100, 100, 100);
  const material5 = new MeshLambertMaterial({ color: 0xffffff });
  const mesh5 = new Mesh(geometry5, material5);
  mesh5.position.set(0, -200, 0);
  scene.add(mesh5);

  const geometry6 = new BoxGeometry(100, 100, 100);
  const material6 = new MeshLambertMaterial({ color: 0xffffff });
  const mesh6 = new Mesh(geometry6, material6);
  mesh6.position.set(0, 0, -200);
  scene.add(mesh6);

  const axes = new AxesHelper(500);
  scene.add(axes);
}

function initCamera() {
  camera = new PerspectiveCamera(45, window.innerWidth / window.innerHeight, 1, 2000);
  camera.position.x = 500;
  camera.position.y = 500;
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
