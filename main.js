import './style.css';
import * as THREE from "three";
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import backImg from "./envimage/back.png";
import frontImg from "./envimage/front.png";
import downImg from "./envimage/down.png";
import upImg from "./envimage/up.png";
import leftImg from "./envimage/left.png";
import ritghtImg from "./envimage/right.png";

const canvas = document.getElementById('webgl');
const scene = new THREE.Scene();

const sizes = {
    width: window.innerWidth,
    height: window.innerHeight,
}
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 3000);
camera.position.set(0, 500, 1000);
scene.add(camera);

const renderer = new THREE.WebGLRenderer({ canvas, antialias: true,});
renderer.setSize(sizes.width, sizes.height);
renderer.setPixelRatio( Math.min(window.devicePixelRatio, 2) );

const urls = [
    "./envImage/right.png",  
    "./envImage/left.png",     
    "./envImage/up.png",      
    "./envImage/down.png",  
    "./envImage/front.png",   
    "./envImage/back.png",    
];

const loader = new THREE.CubeTextureLoader();
scene.background = loader.load(urls);

const cubeRenderTarget = new THREE.WebGLCubeRenderTarget(100);

const cubeCamera = new THREE.CubeCamera(1, 1000, cubeRenderTarget);
scene.add(cubeCamera);

const material = new THREE.MeshBasicMaterial({
    envMap: cubeRenderTarget.texture
});
const geometry = new THREE.SphereGeometry(350, 50, 50);
const sphere = new THREE.Mesh(geometry, material);
sphere.position.set(0, 100, 0);
scene.add(sphere);

const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;

function animation() {
    renderer.render(scene, camera);
    cubeCamera.update(renderer, scene);
    controls.update();
    requestAnimationFrame(animation);
}
animation();

window.addEventListener("resize", () => {
    // Update sizes
    sizes.width = window.innerWidth;
    sizes.height = window.innerHeight;
  
    // Update camera
    camera.aspect = sizes.width / sizes.height;
    camera.updateProjectionMatrix();
  
    // Update renderer
    renderer.setSize(sizes.width, sizes.height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
});