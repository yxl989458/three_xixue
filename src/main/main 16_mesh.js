import {
  AmbientLight,
  BoxGeometry,
  BufferAttribute,
  DirectionalLight,
  DoubleSide,
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
import box_bg from "../assets/img/微信图片_20220925002626.jpg";
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

// 目标 纹理贴图
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
      1000
    );

    const spotLight = new DirectionalLight(0xffffff, 2);
    spotLight.position.set(10, 10, 10);
    this.scene.add(spotLight);
    const textureLoader = new TextureLoader();

    const geometry = new SphereGeometry(50, 50, 50);
    const material = new MeshStandardMaterial({
      map: textureLoader.load(TexturesCom_Brick_StoneCladding3_1K_albedo),
      // normalMap: textureLoader.load(TexturesCom_Brick_StoneCladding3_1K_normal),
      displacementMap: textureLoader.load(
        TexturesCom_Brick_StoneCladding3_1K_height
      ),
      displacementScale: 2,
      aoMapIntensity: 1,
      aoMap: textureLoader.load(TexturesCom_Brick_StoneCladding3_1K_ao),
      roughness: 0,
      roughnessMap: textureLoader.load(
        TexturesCom_Brick_StoneCladding3_1K_roughness
      ),
      metalness: 0,
      envMap: textureLoader.load(box_bg),
      metalnessMap: undefined,
      normalMap: textureLoader.load(
        TexturesCom_Brick_StoneCladding3_1K_normal,
        (texture) => {
          console.log("图片加载成功");
        },
        (progrees) => {
          console.log(progrees);
        },
        (error) => {
          console.log(error);
        }
      ),
    });
    // const geometry1 = new SphereGeometry(50, 50, 50);

    const mesh = new Mesh(geometry, material);
    // 给圆设置uv
    geometry.setAttribute(
      "uv2",
      new BufferAttribute(geometry.attributes.uv.array, 2)
    );
    const skyBoxGeometry = new BoxGeometry(500, 500, 500);
    const skyBoxMaterial = [
      new MeshBasicMaterial({
        map: textureLoader.load(home_left),
        side: DoubleSide,
      }),
      new MeshBasicMaterial({
        map: textureLoader.load(home_right),
        side: DoubleSide,
      }),
      new MeshBasicMaterial({
        map: textureLoader.load(home_top),
        side: DoubleSide,
      }),
      new MeshBasicMaterial({
        map: textureLoader.load(home_bottom),
        side: DoubleSide,
      }),
      new MeshBasicMaterial({
        map: textureLoader.load(home_front),
        side: DoubleSide,
      }),
      new MeshBasicMaterial({
        map: textureLoader.load(home_back),
        side: DoubleSide,
      }),
    ];
    // const skyMaterial = new MeshBasicMaterial({map:textureLoader.load(box_bg),side:DoubleSide})
    const skyMesh = new Mesh(skyBoxGeometry, skyBoxMaterial);
    this.scene.add(skyMesh);
    console.log(mesh);
    this.scene.add(mesh);
    this.renderer = new WebGL1Renderer({ antialias: true });
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    this.orbitcontrols = new OrbitControls(
      this.camera,
      this.renderer.domElement
    );
    document.body.appendChild(this.renderer.domElement);
    this.camera.position.set(0, 0, 100);
    this.animateRender();
    window.addEventListener("resize", () => this.onWindowResize());
  }
  animateRender() {
    this.stats.begin();
    window.requestAnimationFrame(() => this.animateRender());
    this.renderer.render(this.scene, this.camera);
    this.stats.end();
  }
  onWindowResize() {
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    this.renderer.render(this.scene, this.camera);
  }
}
new Application();
