import THREE, {
  AmbientLight,
  BoxGeometry,
  BufferAttribute,
  CubeTextureLoader,
  DirectionalLight,
  DoubleSide,
  EquirectangularReflectionMapping,
  EquirectangularRefractionMapping,
  ImageLoader,
  LoadingManager,
  Mesh,
  MeshBasicMaterial,
  MeshNormalMaterial,
  MeshPhongMaterial,
  MeshStandardMaterial,
  PerspectiveCamera,
  PlaneGeometry,
  Scene,
  SphereGeometry,
  SpotLight,
  TextureLoader,
  Vector2,
  WebGL1Renderer,
} from "three";
import { OrbitControls } from "three/examples/jsm/controls/orbitcontrols";
import jinshu from "../assets/img/jinshu.jpg";
import box_bg from "../assets/img/TexturesCom_SportsField_1K_hdri_sphere_tone.jpg";
import home_left from "../assets/img/home.left.jpg";
import home_right from "../assets/img/home.right.jpg";
import home_top from "../assets/img/home.top.jpg";
import home_bottom from "../assets/img/home.bottom.jpg";
import home_front from "../assets/img/home.front.jpg";
import home_back from "../assets/img/home.back.jpg";
import TexturesCom_Brick_StoneCladding3_1K_albedo from "../assets/img/TexturesCom_Brick_StoneCladding3_1K_albedo.png.png";
import TexturesCom_Brick_StoneCladding3_1K_height from "../assets/img/TexturesCom_Brick_StoneCladding3_1K_height.png.png";
import TexturesCom_Brick_StoneCladding3_1K_ao from "../assets/img/TexturesCom_Brick_StoneCladding3_1K_ao.jpg.png";
import TexturesCom_Brick_StoneCladding3_1K_normal from "../assets/img/TexturesCom_Brick_StoneCladding3_1K_normal.png.png";
import TexturesCom_Brick_StoneCladding3_1K_roughness from "../assets/img/TexturesCom_Brick_StoneCladding3_1K_roughness.png";
import Stats from "stats.js";

// 目标 环境贴图
class Application {
  constructor() {
    //显示fps
    this.stats = new Stats();
    this.stats.showPanel(0);
    document.body.appendChild(this.stats.dom);
    this.scene = new Scene();
    this.camera = new PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      2000
    );

    this.renderer = new WebGL1Renderer({ antialias: true });
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    this.orbitcontrols = new OrbitControls(
      this.camera,
      this.renderer.domElement
    );
    document.body.appendChild(this.renderer.domElement);
    this.camera.position.set(0, 0, 650);
    this.animateRender();
    window.addEventListener("resize", () => this.onWindowResize());

    //创建一个平面

    // const planeGeometry = new PlaneGeometry(100, 100);
    // const planeMaterial = new MeshBasicMaterial({
    //   color: 0xff00ff,
    //   side: DoubleSide,
    // });
    // const planMesh = new Mesh(planeGeometry, planeMaterial);
    // planMesh.rotation.z = Math.PI / 4;
    // this.scene.add(planMesh);

    //创建一个巨大的天空球体
const skyGeometry =new SphereGeometry(1000,1000,1000)
const skyMaterial=new MeshBasicMaterial({
  map:new TextureLoader().load(box_bg),
  side:DoubleSide
})

const skyMesh=new Mesh(skyGeometry,skyMaterial)
skyMesh.scale.set(1,1,-1)
this.scene.add(skyMesh)
  }
  animateRender() {
    this.stats.begin();
    window.requestAnimationFrame(() => this.animateRender());
    this.renderer.render(this.scene, this.camera);
    this.stats.end();
  }
  onWindowResize() {
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    this.renderer.render(this.scene, this.camera);
  }
}
new Application();
