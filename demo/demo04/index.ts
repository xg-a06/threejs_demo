import {
  Scene,
  AxesHelper,
  PerspectiveCamera,
  WebGLRenderer,
  Vector3,
  BufferGeometry,
  LineBasicMaterial,
  Color,
  Float32BufferAttribute,
  Line,
} from 'three';

import { WEBGL } from 'three/examples/jsm/WebGL';

let scene: Scene;
let camera: PerspectiveCamera;
let renderer: WebGLRenderer;

function initScene() {
  scene = new Scene();
}

function initLight() {
  console.log('init light');
}

function initObject() {
  const geometry = new BufferGeometry();
  geometry.setFromPoints([new Vector3(-100, 0, 0), new Vector3(100, 0, 0)]);
  const materialX = new LineBasicMaterial({ color: 0xff0000, transparent: true, opacity: 0.8 });
  const materialY = new LineBasicMaterial({ color: 0x00ff00, transparent: true, opacity: 0.8 });
  for (let i = 0; i < 11; i += 1) {
    const lineX = new Line(geometry, materialX);
    lineX.position.y = 100 - i * 20;
    scene.add(lineX);

    const lineY = new Line(geometry, materialY);
    lineY.position.x = i * 20 - 100;
    lineY.rotation.z = (90 * Math.PI) / 180;
    scene.add(lineY);
  }

  const axes = new AxesHelper(500);
  scene.add(axes);
}

function initCamera() {
  camera = new PerspectiveCamera(45, window.innerWidth / window.innerHeight, 1, 10000);
  camera.position.x = 0;
  camera.position.y = 0;
  camera.position.z = 2000;
  camera.up.x = 0;
  camera.up.y = 1;
  camera.up.z = 0;
  camera.lookAt(new Vector3(0, 0, 0));
}

function initRenderer() {
  renderer = new WebGLRenderer();
  renderer.setSize(window.innerWidth, window.innerHeight);
  document.body.appendChild(renderer.domElement);
}

function render() {
  requestAnimationFrame(render);
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
