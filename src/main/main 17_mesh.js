import {
  AmbientLight,
  BoxGeometry,
  BufferAttribute,
  DirectionalLight,
  DoubleSide,
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

// 目标 加载管理器
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

    const div = document.createElement("div");
    div.style.width = "100px";
    div.style.height = "100px";
    div.style.position = "fixed";
    div.style.right = 0;
    div.style.top = 0;
    div.style.color = "white";
    document.body.appendChild(div);
    // 设置加载管理器
    const loadingEvent = {};
    loadingEvent.onLoad = (e) => {
      console.log("图片加载完成");
      console.log(e);
    };
    loadingEvent.onProgress = (e, num, total) => {
      console.log("图片加载路径", e);
      console.log("图片加载进度", num);
      console.log("图片加载总数", total);
      let proressVal = ((num / total) * 100).toFixed(2) + "%";
      div.innerHTML = proressVal;
    };
    loadingEvent.onError = (e) => {
      console.log(e);
      console.log("图片加载失败");
    };
    const loadingManager = new LoadingManager(
      loadingEvent.onLoad,
      loadingEvent.onProgress,
      loadingEvent.onError
    );
    const textureLoader = new TextureLoader(loadingManager);

    const geometry = new SphereGeometry(50, 50, 50);
    const material = new MeshStandardMaterial({
      color: "#ffffff", //color 材质的颜色
      map: textureLoader.load(TexturesCom_Brick_StoneCladding3_1K_albedo), //颜色贴图
      // normalMap: textureLoader.load(TexturesCom_Brick_StoneCladding3_1K_normal),
      displacementMap: textureLoader.load(
        TexturesCom_Brick_StoneCladding3_1K_height
      ), //位移贴图

      displacementScale: 2, //位移贴图对网格的影响程度（黑色是无位移，白色是最大位移）。
      aoMapIntensity: 1, //环境遮挡效果的强度
      aoMap: textureLoader.load(TexturesCom_Brick_StoneCladding3_1K_ao), //该纹理的红色通道用作环境遮挡贴图。默认值为null。aoMap需要第二组UV。
      roughness: 0, // 材质的粗糙程度。0.0表示平滑的镜面反射，1.0表示完全漫反射。默认值为1.0。
      roughnessMap: textureLoader.load(
        TexturesCom_Brick_StoneCladding3_1K_roughness
      ), //该纹理的绿色通道用于改变材质的粗糙度。贴图
      metalness: 0, //材质与金属的相似度。非金属材质，如木材或石材，使用0.0，金属使用1.0，通常没有中间值。 默认值为0.0。0.0到1.0之间的值可用于生锈金属的外观。如果还提供了metalnessMap，则两个值相乘。
      metalnessMap: undefined, //金属度贴图,
      normalMap: textureLoader.load(TexturesCom_Brick_StoneCladding3_1K_normal), //法线贴图
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
