// import { BloomEffect, EffectComposer, EffectPass, RenderPass } from 'postprocessing'
// import { UnrealBloomPass } from 'three/addons/postprocessing/UnrealBloomPass.js'
import { EffectComposer } from 'three/addons/postprocessing/EffectComposer.js'
import CustomShaderMaterial from 'three-custom-shader-material/vanilla'
import { RenderPass } from 'three/addons/postprocessing/RenderPass.js'
import { OutputPass } from 'three/addons/postprocessing/OutputPass.js'
import { OrbitControls } from 'three/addons/controls/OrbitControls.js'
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js'
import fragmentShader from './rune.frag?raw'
import vertexShader from './rune.vert?raw'
import { UnrealBloomPass } from './Bloom'
import { tweened } from 'svelte/motion'
import { BROWSER, DEV } from 'esm-env'
import { Pane } from 'tweakpane'
import { theme } from 'fractils'
import * as T from 'three'

export async function init(canvas: HTMLCanvasElement) {
	if (!BROWSER) return { destroy() {} }

	const opts = {
		bloom: {
			threshold: 0.42,
			strength: 5,
			radius: 1,
			exposure: 0.1,
		},
	}

	//· Setup ··········································································¬

	// Unsubscribe functions.
	const subs = new Set<() => void>()

	const scene = new T.Scene()

	const { background } = window.getComputedStyle(document.body)
	scene.background = new T.Color(background)

	// Update scene background color when the app theme changes.
	subs.add(
		theme.subscribe(() => {
			scene.background = new T.Color(window.getComputedStyle(document.body).background)
		}),
	)

	const dpr = window.devicePixelRatio
	const renderer = new T.WebGLRenderer({
		canvas,
		alpha: false,
		depth: false,
		stencil: false,
		antialias: true,
		powerPreference: 'high-performance',
	})
	renderer.setSize(w, h)

	const camera = new T.PerspectiveCamera(75, canvas.offsetWidth / canvas.offsetHeight, 0.1, 1000)
	const CAMERA_POS = {
		x: 0,
		y: 0,
		z: 2,
	}
	camera.position.z = CAMERA_POS.z
	camera.lookAt(0, 0, 0)

	const ambientLight = new T.AmbientLight(0x40404f, 0.5)
	scene.add(ambientLight)

	const directionalLight = new T.DirectionalLight(0xabcdff, 0.2)
	directionalLight.position.set(0, 1, 100)
	scene.add(directionalLight)
	//⌟

	//· Postprocessing ·································································¬

	// const composer = new EffectComposer(renderer)

	// composer.addPass(new RenderPass(scene, camera))

	// const bloom = new BloomEffect({
	// 	intensity: 4,
	// 	luminanceThreshold: 0.1,
	// 	luminanceSmoothing: 1.1,
	// 	radius: 1,
	// })
	// composer.addPass(new EffectPass(camera, bloom))
	//⌟

	//· Bloom ··········································································¬

	const renderScene = new RenderPass(scene, camera)

	const composer = new EffectComposer(renderer)
	composer.addPass(renderScene)

	const bloomPass = new UnrealBloomPass(
		new T.Vector2(canvas.offsetWidth, canvas.offsetHeight),
		opts.bloom.strength,
		opts.bloom.radius,
		opts.bloom.threshold,
	)
	composer.addPass(bloomPass)

	const outputPass = new OutputPass()
	composer.addPass(outputPass)
	//⌟

	//· Runes ··········································································¬

	interface RuneOpts {
		position: { x: number; y: number; z: number }
		scale: number
		rotate: { x: number; y: number; z: number }
	}

	// load the glb
	const loader = new GLTFLoader()
	const runes = (
		await loader.loadAsync('/assets/runes.glb').catch((error) => {
			console.error(error)
			throw new Error('Failed to load the glb')
		})
	).scene

	console.log(runes)

	runes.rotateY(-Math.PI / 2)
	scene.add(runes)

	const runestone = runes.children[0] as T.Mesh

	const runeBLOpts: RuneOpts = {
		position: { x: -0.5, y: -0.85, z: 0 },
		scale: 0.066,
		rotate: { x: 0.5, y: 0, z: 0.7 },
	}
	const runeBL = createRune(runestone, runeBLOpts)
	scene.add(runeBL)

	const runeTLOpts: RuneOpts = {
		position: { x: -0.6, y: 0.35, z: 0 },
		scale: 0.033,
		rotate: { x: -0.1, y: Math.PI, z: -2.8 },
	}
	const runeTL = createRune(runestone, runeTLOpts)
	scene.add(runeTL)

	const runeBROpts: RuneOpts = {
		position: { x: 0.5, y: -0.75, z: 0 },
		scale: 0.05,
		rotate: { x: 0.4, y: 0, z: 2.8 },
	}
	const runeBR = createRune(runestone, runeBROpts)
	scene.add(runeBR)
	//⌟

	//· Svelte Logo ····································································¬

	const svelte = scene.getObjectByName('svelte-outer') as T.Mesh<any, T.ShaderMaterial>

	svelte.material = new CustomShaderMaterial({
		baseMaterial: T.MeshStandardMaterial,
		uniforms: {
			tDiffuse: {
				value: new T.Color(0xff3e00),
			},
			time: {
				value: 0,
			},
		},
		vertexShader,
		fragmentShader,
		silent: true, // Extraneous warnings.
	}) as any as T.ShaderMaterial
	//⌟

	//· Controls ·······································································¬

	const controls = new OrbitControls(camera, renderer.domElement)
	controls.enableDamping = true
	controls.dampingFactor = 0.01
	controls.enableZoom = false
	controls.enablePan = false
	controls.enableRotate = false

	// very limited rotation
	controls.minPolarAngle = Math.PI / 2 - 0.25
	controls.maxPolarAngle = Math.PI / 2 + 0.25
	controls.minAzimuthAngle = -0.5
	controls.maxAzimuthAngle = 0.5

	// mouse follower
	const mouse = tweened({ x: 0, y: 0 }, { duration: 400 })
	const onMouseMove = (event: MouseEvent) => {
		// // Relative to the window:
		// mouse.set({
		// 	x: (event.clientX / window.innerWidth) * 2 - 1,
		// 	y: -(event.clientY / window.innerHeight) * 2 + 1,
		// })

		// Relative to the canvas:
		const rect = canvas.getBoundingClientRect()
		mouse.set({
			x: ((event.clientX - rect.left) / canvas.width) * 2 - 1,
			y: -((event.clientY - rect.top) / canvas.height) * 2 + 1,
		})
	}

	mouse.subscribe(({ x, y }) => {
		// move the camera
		camera.position.x = CAMERA_POS.x + x * 0.2
		camera.position.y = CAMERA_POS.y + y * 0.2
		camera.lookAt(0, 0, 0)
	})

	window.addEventListener('mousemove', onMouseMove, false)
	//⌟

	//· Animation ······································································¬

	const animate = (t: number) => {
		requestAnimationFrame(animate)

		runeBL.position.y = runeBLOpts.position.y + Math.sin(t / 1000) * 0.05
		runeBR.position.y = runeBROpts.position.y + Math.sin(5 + t / 1100) * 0.033
		runeTL.position.y = runeTLOpts.position.y + Math.sin(15 + t / 900) * 0.05

		svelte.material.uniforms.time.value = t / 1000

		composer.render()
	}

	animate(0)
	//⌟

	//· Utils ···································································¬

	function createRune(mesh: T.Mesh, opts: RuneOpts) {
		const rune = mesh.clone()

		rune.position.x = opts.position.x
		rune.position.y = opts.position.y
		rune.position.z = opts.position.z

		rune.scale.set(opts.scale, opts.scale, opts.scale)

		rune.rotateZ(opts.rotate.z)
		rune.rotateX(opts.rotate.x)
		rune.rotateY(opts.rotate.y)

		return rune
	}
	//⌟

	//· Controls ···································································¬

	if (DEV) {
		const pane = new Pane({
			title: 'Runes',
			container: document.getElementById('controls')!,
		})

		pane.on('change', () => {
			bloomPass.threshold = opts.bloom.threshold
			bloomPass.strength = opts.bloom.strength
			bloomPass.radius = opts.bloom.radius
			renderer.toneMappingExposure = opts.bloom.exposure
		})

		pane.addBinding(opts.bloom, 'threshold', { label: 'Threshold' })
		pane.addBinding(opts.bloom, 'strength', { label: 'Strength' })
		pane.addBinding(opts.bloom, 'radius', { label: 'Radius' })
		pane.addBinding(opts.bloom, 'exposure', { label: 'Exposure' })
	}
	//⌟

	return {
		destroy() {
			subs.forEach((sub) => sub())

			if (BROWSER) {
				window.removeEventListener('mousemove', onMouseMove)
			}
		},
	}
}
