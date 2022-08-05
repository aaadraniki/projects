/*

let scene = new THREE.Scene();
const main = document.querySelector('#main');
let WIDTH = main.offsetWidth;
let HEIGHT = main.offsetHeight;

let renderer = new THREE.WebGLRenderer();
renderer.setClearColor(0x404040);
renderer.setSize(WIDTH, HEIGHT);

renderer.domElement.setAttribute("id", "Church3DObj");
main.insertBefore(renderer.domElement, main.firstChild);

let camera = new THREE.PerspectiveCamera(33, WIDTH / HEIGHT, 0.1, 1000);

camera.position.set(-2,-0.3,-0); 


//let controls = new THREE.OrbitControls(camera, renderer.domElement);

const aLight = new THREE.DirectionalLight(0xffffff, 1.5);
aLight.position.setScalar(10);
scene.add(aLight, new THREE.AmbientLight(0xffffff, 0.5));

let loader = new THREE.GLTFLoader();
let obj = null;




let promise = new Promise((resolve, reject) => {
	loader.load('https://raw.githubusercontent.com/aaadraniki/projects/72ee457aaba02f03abfbc367a437e2ca969a1ea7/assets/models/spider_man/scene.gltf', function(gltf) {
  obj = gltf.scene;
  obj.rotation.y = 1.880;
  obj.position.y = -1.28;
  obj.position.x = 0;

  scene.add(obj);
  resolve();
});
});

promise
  .then(
    result => {
     

      renderer.setAnimationLoop(_ => {
  			renderer.render(scene, camera);
  			//obj.rotateOnWorldAxis ( xAxis, 0.1);
				//obj.rotateY(5);
				//obj.rotateZ(5);

			})

    },
    error => {
      alert("Rejected: " ); 
    }
  );

  */
const main = document.querySelector('#main');
let WIDTH = main.offsetWidth;
let HEIGHT = main.offsetHeight;


let scene = new THREE.Scene();
let camera = new THREE.PerspectiveCamera(75, WIDTH / HEIGHT, 0.1, 1000);
camera.position.z = 7; // Отдаление камеры

let renderer = new THREE.WebGLRenderer();
renderer.setClearColor(0x404040);
renderer.setSize(WIDTH, HEIGHT);

renderer.domElement.setAttribute("id", "Church3DObj");
main.insertBefore(renderer.domElement, main.firstChild);

let controls = new THREE.OrbitControls(camera, renderer.domElement);

const aLight = new THREE.DirectionalLight(0xffffff, 1.5);
aLight.position.setScalar(10);
scene.add(aLight, new THREE.AmbientLight(0xffffff, 0.5));

let loader = new THREE.GLTFLoader();
let obj = null;

loader.load('https://raw.githubusercontent.com/aaadraniki/projects/web-pages/assets/models/iron_man/scene.gltf', function(gltf) {
  obj = gltf.scene;
  scene.add(obj);
});

renderer.setAnimationLoop(_ => {
  renderer.render(scene, camera);
})



