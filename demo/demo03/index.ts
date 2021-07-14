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
let geometry: BufferGeometry;
let material: LineBasicMaterial;
let camera: PerspectiveCamera;
let renderer: WebGLRenderer;

function initScene() {
  scene = new Scene();
}

function initLight() {
  console.log('init light');
}

function initObject() {
  geometry = new BufferGeometry();
  material = new LineBasicMaterial({ vertexColors: true });
  const positions = new Float32Array([-10, 0, 10, 10, 0, -10]);
  const color1 = new Color(0x00ff00);
  const color2 = new Color(0xff0000);
  const colors = new Float32Array([color1.r, color1.g, color1.b, color2.r, color2.g, color2.b]);
  geometry.setAttribute('position', new Float32BufferAttribute(positions, 3));
  geometry.setAttribute('color', new Float32BufferAttribute(colors, 3));
  const line = new Line(geometry, material);
  const axes = new AxesHelper(10);
  scene.add(line);
  scene.add(axes);
}

function initCamera() {
  camera = new PerspectiveCamera(45, window.innerWidth / window.innerHeight, 1, 1000);
  camera.position.x = 100;
  camera.position.y = 100;
  camera.position.z = 100;
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
