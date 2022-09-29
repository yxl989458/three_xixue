import * as THREE from "three";
import { DoubleSide } from "three";

import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import * as dat from "dat.gui";
// 目标 聚光灯的应用和属性

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
plane.position.set(0, -5, 0);
plane.rotation.x = Math.PI / 2;
plane.receiveShadow = true;
scene.add(plane);

//聚光灯光源
const spotLight = new THREE.SpotLight(0xffffff, 0.5, 1000);
spotLight.position.set(5, 10, 0); //default; light shining from top
spotLight.castShadow = true; // default false
spotLight.shadow.mapSize.set(4096,4096)
spotLight.target=sphere
scene.add(spotLight);
spotLight.angle=Math.PI/4



const helper = new THREE.CameraHelper(spotLight.shadow.camera);
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

function animate() {
  requestAnimationFrame(animate);
  controls.update();
  renderer.render(scene, camera);
}
animate();

const gui = new dat.GUI();
gui
  .add(sphere.position, "x")
  .min(-5)
  .max(10)
  .step(1)
  ;

  gui.add(spotLight,'angle').
  min(-5)
  .max(10)
  .step(0.1)


  gui.add(spotLight,'distance').
  min(5)
  .max(100)
  .step(0.1)


  gui.add(spotLight,'penumbra').
  min(0)
  .max(1)
  .step(0.1)
  gui.add(spotLight,'decay').
    min(0)
  .max(100)
  .step(0.1)


