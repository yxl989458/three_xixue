import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

import gsap from "gsap";
import * as dat from "dat.gui";
import { Color } from "three";
import men from "../../dist/img/men.jpg";
import textureyueqiu from "../assets/img/yueqiu.png";
import jinshu from "../assets/img/TilesMosaicPennyround030_Wall.png";
import heibai from "../assets/img/未标题-1.png";
// 目标 透明纹理
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
const textureLoader = new THREE.TextureLoader();
const doorColorTestrue = textureLoader.load(men);
const doorAplhaTextrue = textureLoader.load(heibai);

//偏移
// doorColorTexture.offset.x=0.5
// doorColorTexture.offset.y=0.5
//纹理旋转

// doorColorTexture.rotation=Math.PI/4 //旋转四十五度

//设置旋转中心位置
// doorColorTexture.center.set(0.5,0.5)

//设置纹理的重复
// doorColorTexture.repeat.set(2, 3);
//设置纹理重复的模式

// doorColorTexture.wrapS = THREE.MirroredRepeatWrapping; //x的镜像重复
// doorColorTexture.wrapT = THREE.RepeatWrapping;

// 立即使用纹理进行材质创建

//纹理显示设置
doorColorTestrue.minFilter = THREE.LinearMipmapNearestFilter;
doorColorTestrue.magFilter = THREE.LinearMipmapLinearFilter;
doorColorTestrue.minFilter = THREE.LinearFilter;

// 添加物体
const cubeGeometry = new THREE.BoxGeometry();

//材质
const basicMaterial = new THREE.MeshBasicMaterial({
  color: "#ffff",
  map: doorColorTestrue,
  alphaMap: doorAplhaTextrue,
  transparent: true,
  opacity:0.5,
  side:THREE.DoubleSide
});
const cube = new THREE.Mesh(cubeGeometry, basicMaterial);
scene.add(cube);
const axesHelper = new THREE.AxesHelper(10);
scene.add(axesHelper);


// 添加一个平面
const plan =new THREE.Mesh(
  new THREE.PlaneBufferGeometry(1,1),
  basicMaterial
)
plan.position.set(3,0,0)
scene.add(plan)
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
