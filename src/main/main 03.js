import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
// 目标 设置物体移动


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

//修改物体的位置
cube.position.set(5,0,0)

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
controls.update();

function animate() {
cube.position.x+=0.01
cube.position.y+=0.01
cube.position.z+=0.01
if(cube.position.x>=5){
  cube.position.x=0
}else if(cube.position.y>=5){
  cube.position.y=0

}else if(cube.position.z>=5){
  cube.position.z=0
}
  requestAnimationFrame(animate);
  controls.update();
  renderer.render(scene, camera);
}
animate();
