/*
const scene = new THREE.Scene();
			var camera = new THREE.PerspectiveCamera(75, 4/3, 1, 1000);

			
const renderer = new THREE.WebGLRenderer({
    canvas: document.querySelector('#main')
})

			renderer.setClearColor("rgb(192, 228, 236 )"); 
			
			
			camera.position.set(4, 3, 6)
camera.lookAt(new THREE.Vector3(0, 0, 0))

			const geometry = new THREE.BoxGeometry( 6, 2, 2 );
			const material = new THREE.MeshPhongMaterial( { color: 0xffffff } );
			const cube = new THREE.Mesh( geometry, material );
			//cube.rotation.x = 2;
			//cube.rotation.y = 2;
			scene.add( cube );

			camera.position.z = 5;


			var light = new THREE.SpotLight(0xffff00, 1, 100, Math.PI/6, 25)

			light.position.set(2, 5, 3);
 
			//light.target.position.set(2, 5, 3);

			//light.target = cube;

			scene.add(light);

			renderer.shadowMapEnabled = true;
			renderer.shadowMapSoft = true;



const loader = new THREE.GLTFLoader();

loader.load( 'models/black_m/scene.gltf', function ( gltf ) {

	scene.add( gltf.scene );

}, undefined, function ( error ) {

	console.error( error );

} );



			function animate() {
				requestAnimationFrame( animate );

				//cube.rotation.x += 0.01;
				//cube.rotation.y += 0.01;

				renderer.render( scene, camera  );
			};

			animate();


			
*/

let scene = new THREE.Scene();
let camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.z = 3; // Отдаление камеры

let renderer = new THREE.WebGLRenderer();
renderer.setClearColor(0x404040);
renderer.setSize(innerWidth, innerHeight);

renderer.domElement.setAttribute("id", "Church3DObj");
document.body.insertBefore(renderer.domElement, document.body.firstChild);

let controls = new THREE.OrbitControls(camera, renderer.domElement);

const aLight = new THREE.DirectionalLight(0xffffff, 1.5);
aLight.position.setScalar(10);
scene.add(aLight, new THREE.AmbientLight(0xffffff, 0.5));

let loader = new THREE.GLTFLoader();
let obj = null;

loader.load('models/white_m/scene.gltf', function(gltf) {
  obj = gltf.scene;
  scene.add(obj);
});

renderer.setAnimationLoop(_ => {
  renderer.render(scene, camera);
})
