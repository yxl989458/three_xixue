import * as THREE from "three";

import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
// 目标 使用控制器查看3d物体
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
camera.position.set(0, 0, 10);

scene.add(camera);

// 添加物体
const cubeGeometry = new THREE.BoxGeometry();

const cubeMaterial = new THREE.MeshBasicMaterial({ color: 0xffefad });

//根据几何体和材质创建物体

const cube = new THREE.Mesh(cubeGeometry, cubeMaterial);

// 将几何体添加到场景
scene.add(cube);

const axesHelper = new THREE.AxesHelper( 5 );
scene.add( axesHelper );

///初始化渲染器

const renderer = new THREE.WebGL1Renderer();

//设置渲染的尺寸大小
renderer.setSize(window.innerWidth, window.innerHeight);

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
animate()
