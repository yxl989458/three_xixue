import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { gsap } from "gsap";
import { PixiPlugin } from "gsap/PixiPlugin.js";
import { MotionPathPlugin } from "gsap/MotionPathPlugin.js";

import * as dat from "dat.gui";
// 目标 掌握dat.gui
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
console.log(cube);
console.log(cubeGeometry);
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

const gui = new dat.GUI();
gui
  .add(cube.position, "x")
  .min(0)
  .max(5)
  .step(0.01)
  .name("移动x轴")
  .onChange((val) => {
    console.log(val);
  })
  .onFinishChange((val) => {
    //完全停下来触发
    console.log(val, "完全停下来触发");
  });

gui.add(cube.position, "y").min(0).max(5).step(0.01).name("移动y轴");
gui.add(cube.position, "z").min(0).max(5).step(0.01).name("移动z轴");

//=修改物体颜色
const params = {
  color: "#fff000",
  fn: () => {
    gsap.to(cube.position, { x: 5, duration: 2, yoyo: true, repeat: -1 });
  },
};

gui.addColor(params, "color").onChange((val) => {
  cube.material.color.set(val);
});
gui
  .add(params, "fn")
  .onChange((val) => {
    cube.material.color.set(val);
  })
  .name("立方体运动");
// 设置选项框
gui
  .add(cube, "visible")
  .name("是否显示")
  .onChange((val) => {
    console.log(val);
  });
const floder = gui.addFolder("设置立方体");
floder.add(cube.material, "wireframe");
floder.add(cube, "visible").name("是否显示");
