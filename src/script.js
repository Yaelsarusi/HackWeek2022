import './style.css'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import * as dat from 'lil-gui'
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader.js';

const params = {
    ambientLightColor: '0xffffff',
    directionalLightColor: '0xffffff',
  };

/**
 * Base
 */
// Debug
const gui = new dat.GUI()

// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()
//scene.background.set( '0xffffff' );


// Object
// instantiate a loader
const loader = new OBJLoader();

// load a resource
loader.load(
	// resource URL
	'/models/Filing cabinet OBJ.obj',
	// called when resource is loaded
	function ( object ) {
        gui.add(object.position, 'x').min(-10).max(10).step(0.1).name('object position x')
        gui.add(object.position, 'y').min(-10).max(10).step(0.1).name('object position y')
        gui.add(object.position, 'z').min(-10).max(10).step(0.1).name('object position z')
        gui.add(object.scale, 'x').min(0).max(1).step(0.001).name('object scale x')
        gui.add(object.scale, 'y').min(0).max(1).step(0.001).name('object scale y')
        gui.add(object.scale, 'z').min(0).max(1).step(0.001).name('object scale z')
        object.scale.x = 0.0015
        object.scale.y = 0.0015
        object.scale.z = 0.0015
		scene.add( object );
	},
	// called when loading is in progresses
	function ( xhr ) {
		console.log( ( xhr.loaded / xhr.total * 100 ) + '% loaded' );

	},
	// called when loading has errors
	function ( error ) {

		console.log( 'An error happened' );

	}
);

/**
 * Sizes
 */
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}

window.addEventListener('resize', () =>
{
    // Update sizes
    sizes.width = window.innerWidth
    sizes.height = window.innerHeight

    // Update camera
    camera.aspect = sizes.width / sizes.height
    camera.updateProjectionMatrix()

    // Update renderer
    renderer.setSize(sizes.width, sizes.height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
})

/**
 * Camera
 */
// Base camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100)
camera.position.x = 1
camera.position.y = 1
camera.position.z = 2
scene.add(camera)

gui.add(camera.position, 'x').min(-10).max(10).step(0.1).name('camera position x')
gui.add(camera.position, 'y').min(-10).max(10).step(0.1).name('camera position y')
gui.add(camera.position, 'z').min(-10).max(10).step(0.1).name('camera position z')

// Controls
const controls = new OrbitControls(camera, canvas)
controls.enableDamping = true

/**
 * Lights
 */
 const ambientLight = new THREE.AmbientLight(params.ambientLightColor, 0.2)
 scene.add(ambientLight)

 gui.addColor(params, 'ambientLightColor').onChange(function(value) {

    ambientLight.color.set(value);

  });
 
 const directionalLight = new THREE.DirectionalLight(params.directionalLightColor, 0.4)

 gui.addColor(params, 'ambientLightColor').onChange(function(value) {

    directionalLight.color.set(value);

  });
 

 directionalLight.castShadow = true
 directionalLight.shadow.mapSize.set(1024, 1024)
 directionalLight.shadow.camera.far = 20
 directionalLight.shadow.camera.left = - 7
 directionalLight.shadow.camera.top = 7
 directionalLight.shadow.camera.right = 7
 directionalLight.shadow.camera.bottom = - 7
 directionalLight.position.set(- 5, 5, 0)
 scene.add(directionalLight)



/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
    canvas: canvas
})
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))


/**
 * Animate
 */
const clock = new THREE.Clock()

const tick = () =>
{
    const elapsedTime = clock.getElapsedTime()
    // Update controls
    controls.update()

    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
    console.log(camera.position)
}

tick()