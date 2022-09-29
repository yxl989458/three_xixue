import * as THREE from "three";
import { DoubleSide, Mesh } from "three";

import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import * as dat from "dat.gui";
// 目标 点光源

//创建场景
const scene = new THREE.Scene();

//创建相机
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);

//设置相机位置
camera.position.set(0, 0, 100);

scene.add(camera);

const lights = new THREE.AmbientLight(0x404040, 0.5); // soft white light
scene.add(lights);

//Create a sphere that cast shadows (but does not receive them)
const sphereGeometry = new THREE.SphereGeometry(5, 32, 32);
const sphereMaterial = new THREE.MeshStandardMaterial({
  color: 0xff0000,
  side: DoubleSide,
});
const sphere = new THREE.Mesh(sphereGeometry, sphereMaterial);
sphere.castShadow = true; //default is false
sphere.receiveShadow = false; //default
scene.add(sphere);

//Create a plane that receives shadows (but does not cast them)
const planeGeometry = new THREE.PlaneGeometry(50, 50);

const planeMaterial = new THREE.MeshStandardMaterial({
  color: 0xffffff,
  side: DoubleSide,
});

const plane = new THREE.Mesh(planeGeometry, planeMaterial);
const plane1 = new THREE.Mesh(planeGeometry, planeMaterial);
const plane2 = new THREE.Mesh(planeGeometry, planeMaterial);
const plane3 = new THREE.Mesh(planeGeometry, planeMaterial);
const plane4 = new THREE.Mesh(planeGeometry, planeMaterial);
plane1.position.set(0, -10, 0);
plane1.rotation.x = Math.PI / 2;
plane1.receiveShadow = true;
plane2.position.set(0, -10, 0);
plane2.rotation.x = Math.PI / 2;
plane2.receiveShadow = true;
plane3.position.set(0, -20, 0);
plane3.rotation.x = Math.PI / 2;
plane3.receiveShadow = true;
plane4.position.set(0, -30, 0);
plane4.rotation.x = Math.PI / 2;
plane4.receiveShadow = true;
plane.position.set(0, -5, 0);
plane.rotation.x = Math.PI / 2;
plane.receiveShadow = true;
scene.add(plane);
scene.add(plane1);
scene.add(plane2);
scene.add(plane3);
scene.add(plane4);

const smallBall = new Mesh(
  new THREE.SphereBufferGeometry(5, 10, 10),
  new THREE.MeshBasicMaterial({ color: 0x800080 })
);
smallBall.position.set(30, 30, 10);
//聚光灯光源
const PointLight = new THREE.PointLight(0x800080, 1, 1000);
PointLight.position.set(2, 10, 2); //default; light shining from top
PointLight.castShadow = true; // default false
PointLight.shadow.mapSize.set(4096, 4096);
smallBall.add(PointLight);
scene.add(smallBall);
const helper = new THREE.CameraHelper(PointLight.shadow.camera);
scene.add(helper);

const axesHelper = new THREE.AxesHelper(100);
scene.add(axesHelper);

///初始化渲染器

const renderer = new THREE.WebGL1Renderer();

//设置渲染的尺寸大小
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.shadowMap.enabled = true;
document.body.appendChild(renderer.domElement);

//使用渲染器，通过相机场景渲染尽量
renderer.render(scene, camera);

// 创建轨道控制器
const controls = new OrbitControls(camera, renderer.domElement);
controls.update();
const clock = new THREE.Clock();
function animate() {
  let time = clock.getElapsedTime();
  smallBall.position.x = Math.sin(time) * 100;
  smallBall.position.y = Math.cos(time) * 100;
  smallBall.position.z = 10+ Math.sin(time) * 100 ;
  requestAnimationFrame(animate);
  controls.update();
  renderer.render(scene, camera);
}
animate();

const gui = new dat.GUI();
gui.add(sphere.position, "x").min(-5).max(10).step(1);

gui.add(PointLight, "distance").min(5).max(100).step(0.1);

gui.add(PointLight, "decay").min(0).max(100).step(0.1);
gui.add(PointLight, "power").min(Math.PI).max(Math.PI);
