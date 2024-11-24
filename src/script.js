import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";

// initialize the scene
const scene = new THREE.Scene();
// add objects to the scene

// Create a custom geometry
const vertices = new Float32Array([
  0, 0, 0, // 0
  0, 1, 0, // 1
  1, 0, 0, // 2
])

// const geometry = new THREE.SphereGeometry(1, 32, 32);
// const geometry = new IcosahedronGeometry(1, 3)
// const geometry = new THREE.TorusGeometry(1, 0.3, 16, 100);
// const geometry = new THREE.PlaneGeometry(1, 1, 4, 4);

// const geometry = new THREE.BufferGeometry()
// const bufferAttribute = new THREE.BufferAttribute(vertices, 3)
// console.log(bufferAttribute)
// geometry.setAttribute('position', bufferAttribute)

const geometry = new THREE.TorusKnotGeometry(0.5, 0.2, 100, 16);
const material = new THREE.MeshPhysicalMaterial({color: "yellow"}); // Green color
material.roughness = 0.1;
material.metalness = 0.2;
material.reflectivity = 0.1;
material.clearcoat = 1;
const cube = new THREE.Mesh(geometry, material);
scene.add(cube);


const light = new THREE.PointLight(0xffffff, 1); // White light with intensity 1
light.position.set(5, 0, 0); // Position the light so it illuminates the scene
scene.add(light);

const ambientLight = new THREE.AmbientLight("white", 1); // Soft white light
scene.add(ambientLight);

const axisHelper = new THREE.AxesHelper(2);
scene.add(axisHelper)

const cubeMesh = new THREE.Mesh(geometry, material);
scene.add(cubeMesh);

// initialize the camera
const camera = new THREE.PerspectiveCamera(
  55,
  window.innerWidth / window.innerHeight,
  0.1,
  200
);
camera.position.z = 5;

// initialize the renderer
const canvas = document.querySelector("canvas.threejs");
const renderer = new THREE.WebGLRenderer({
  canvas: canvas,
  antialias: true,
});
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

// instantiate the controls
const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true;
controls.autoRotate = true;

window.addEventListener("resize", () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});

// render the scene
const renderloop = () => {
  controls.update();
  renderer.render(scene, camera);
  window.requestAnimationFrame(renderloop);
};

renderloop();
