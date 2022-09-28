import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

import gsap from "gsap";
import * as dat from "dat.gui";
import { Color } from "three";
import textureimg from "../../dist/img/men.jpg";
import textureyueqiu from "../assets/img/yueqiu.png";
// 目标 创建材质
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
// itemSize = 3 因为每个顶点都是一个三元组。

//导入纹理
const texture = new THREE.TextureLoader().load(textureyueqiu);
texture.rotation=360
// 立即使用纹理进行材质创建
// 添加物体
const cubeGeometry = new THREE.SphereGeometry();

//材质
const basicMaterial = new THREE.MeshBasicMaterial({
  color: "#ffff00",
  map: texture,
});
const cube = new THREE.Mesh(cubeGeometry, basicMaterial);
scene.add(cube);
const axesHelper = new THREE.AxesHelper(10);
scene.add(axesHelper);

///初始化渲染器

const renderer = new THREE.WebGL1Renderer();

//设置渲染的尺寸大小
renderer.setSize(window.innerWidth, window.innerHeight);

document.body.appendChild(renderer.domElement);

//使用渲染器，通过相机场景渲染尽量
renderer.render(scene, camera);

// 创建轨道控制器
const controls = new OrbitControls(camera, renderer.domElement);

//设置控制器阻尼。让控制器有真实效果
controls.enableDamping = true;

gsap.to(cube.position, {
  x: 8,
  y: 8,
  z: -8,
  duration: 1,
  //设置重复次数，无线循环-1
  repeat: 1,
  //是否往返运动
  yoyo: true,
});
//设置动画
function animate() {
  controls.update();
  renderer.render(scene, camera);
  requestAnimationFrame(animate);
}
animate();

//监听画面变化，更新渲染画面
window.addEventListener("resize", () => {
  console.log("画面变化了");
  // 更新摄像头
  camera.aspect = window.innerWidth / window.innerHeight;
  //更新摄像头投影矩阵
  camera.updateProjectionMatrix();
  //更新渲染器
  renderer.setSize(window.innerWidth, window.innerHeight);
  // 设置渲染器像素比例
  renderer.setPixelRatio(window.devicePixelRatio);
});
