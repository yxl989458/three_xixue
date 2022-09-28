import * as THREE from "three";
import { DoubleSide } from "three";

import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import * as dat from "dat.gui";
// 目标
/*
 * 灯光阴影
 * 1.材质要满足能够对光照有反应
 * 2.设置渲染器开启阴影的计算 render.shadowMap.enabled=true
 * 3.设置光照投影阴影 directionalLight.castShadow=true
 * 4.设置物理投影阴影 sphere.castShadow=true
 * 5.设置物体接受阴影 plan.receiveShadow=true

*/
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

const light = new THREE.DirectionalLight(0xffffff, 1);
light.position.set(10, 10, 0); //default; light shining from top
light.castShadow = true; // default false
scene.add(light);

//Set up shadow properties for the light
light.shadow.mapSize.width = 2048; // default
light.shadow.mapSize.height = 2048; // default
light.shadow.camera.near = 1; // default
light.shadow.camera.far = 500; // default
light.shadow.camera.right = 50; // default
light.shadow.camera.left = -50; // defaultlight.shadow.camera.near = 10; // default
light.shadow.camera.top = 50; // defaultlight.shadow.camera.near = 10; // default
light.shadow.camera.bottom = -50; // default

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
const planeGeometry = new THREE.PlaneGeometry(30, 30);

const planeMaterial = new THREE.MeshStandardMaterial({
  color: 0xffffff,
  side: DoubleSide,
});
const plane = new THREE.Mesh(planeGeometry, planeMaterial);
plane.position.set(0, -5, 0);
plane.rotation.x = Math.PI / 2;
plane.receiveShadow = true;
scene.add(plane);

const helper = new THREE.CameraHelper(light.shadow.camera);
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
  .add(light.shadow.camera, "near")
  .min(0.1)
  .max(100)
  .step(0.1)
  .onChange(() => {
    light.shadow.camera.updateProjectionMatrix();
  });
