import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import starTexture from './public/picture/stras2.jpg'
import planetVertTexture from './public/picture/planet.jpg'
import ringtexturing from './public/picture/ring.jpeg'


const app = document.getElementById("app");

//render
const render = new THREE.WebGL1Renderer();
render.setSize(window.innerWidth, window.innerHeight);
app.appendChild(render.domElement);

const scene = new THREE.Scene();

//creating camera instance
const camera = new THREE.PerspectiveCamera(
  40, window.innerWidth / window.innerHeight, 1, 1000
);

//setting background
const cubetexture = new THREE.CubeTextureLoader();
scene.background = cubetexture.load([
  starTexture,
  starTexture,
  starTexture,
  starTexture,
  starTexture,
  starTexture
]);

//setting up orbit control
const orbit = new OrbitControls(camera, render.domElement);
camera.position.set(90, 140, 140);
orbit.update();

//setting up light
const light = new THREE.AmbientLight(0x333333);
scene.add(light)

//setting up planet
const texture = new THREE.TextureLoader().load(planetVertTexture);
const planetVert = new THREE.SphereGeometry(25, 50, 50);
const material = new THREE.MeshBasicMaterial({ map: texture });
const geantvert = new THREE.Mesh(planetVert, material);
const planetObj = new THREE.Object3D;
const ringGeo = new THREE.RingGeometry(30, 40, 100);
const texturingRing = new THREE.TextureLoader().load({map: ringtexturing});
const ringTexture = new THREE.MeshBasicMaterial({ texturingRing , side: THREE.DoubleSide })
const ringBuild = new THREE.Mesh(ringGeo, ringTexture);
geantvert.add(ringBuild)
planetObj.add(geantvert);
geantvert.position.x = 95;
geantvert.position.z = -80;
scene.add(planetObj);


const animate = () => {
  geantvert.rotation.y += 0.02;
  ringBuild.rotation.x += 0.01;
  render.render(scene, camera); 
}

render.setAnimationLoop(animate);
const canva = document.querySelector('canvas');
const text = document.createElement("p");
text.textContent = "ceci est un text";
canva.appendChild(text)