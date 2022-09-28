import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { gsap } from "gsap";
import { PixiPlugin } from "gsap/PixiPlugin.js";
import { MotionPathPlugin } from "gsap/MotionPathPlugin.js";
// 目标 掌握gsap
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

const cubeMaterial = new THREE.MeshBasicMaterial({ color: 0xeded });

//根据几何体和材质创建物体

const cube = new THREE.Mesh(cubeGeometry, cubeMaterial);

// 将几何体添加到场景
scene.add(cube);

const axesHelper = new THREE.AxesHelper(5);
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

// 设置时钟
const clock = new THREE.Clock();

//设置动画
var animates = gsap.to(cube.position, {
  x: 5,
  //运动时长
  duration: 5,
  //运动曲线
  ease: "back.inOut(1.7)",
  //设置重复次数，无线循环-1
  repeat: -1,
  //是否往返运动
  yoyo: true,
  //延迟时间
  delay: 2,
  onComplete: () => {
    console.log("动画完成");
  },
  onStart: () => {
    console.log("动画开始");
  },
});
gsap.to(cube.rotation, {
  x: Math.PI * 2,
  repeat: -1,
  duration: 5,
  ease: "back.inOut(1.7)",
});

window.addEventListener("dblclick", () => {
  //双击控制进入全屏、退出全屏
  let fullScreenElement = document.fullscreenElement;
  console.log(fullScreenElement);
  if (fullScreenElement) {
    document.exitFullscreen()
  } else {
    renderer.domElement.requestFullscreen();
  }
  console.log(fullScreenElement);
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
