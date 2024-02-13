import { EffectComposer } from 'three/addons/postprocessing/EffectComposer.js'
import CustomShaderMaterial from 'three-custom-shader-material/vanilla'
import { RenderPass } from 'three/addons/postprocessing/RenderPass.js'
import { OutputPass } from 'three/addons/postprocessing/OutputPass.js'
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js'
import fragmentShader from './rune.frag?raw'
import vertexShader from './rune.vert?raw'
import { UnrealBloomPass } from './Bloom'
import { cubicOut } from 'svelte/easing'
import { tweened } from 'svelte/motion'
import { BROWSER, DEV } from 'esm-env'
import { get } from 'svelte/store'
import { theme } from 'fractils'
import * as T from 'three'

const params = {
	bloom: {
		dark: {
			threshold: 0.29,
			strength: 4.57,
			radius: 0.38,
		},
		light: {
			threshold: 0.01,
			strength: 0.8,
			radius: 0.15,
		},
	},
	camera_sensitivity: {
		x: -1,
		y: 0.66,
	},
	tween_duration: 800,
} as const

export async function init(canvas: HTMLCanvasElement) {
	if (!BROWSER) return { destroy() {} }

	//· Setup ··········································································¬

	let activeTheme: 'light' | 'dark' = get(theme) === 'dark' ? 'dark' : 'light'

	// Unsubscribe functions.
	const subs = new Set<() => void>()

	const scene = new T.Scene()

	const dpr = window.devicePixelRatio
	const w = canvas.offsetWidth * dpr
	const h = canvas.offsetHeight * dpr
	const W = window.innerWidth * dpr
	const H = window.innerHeight * dpr

	const renderer = new T.WebGLRenderer({
		canvas,
		alpha: false,
		depth: false,
		stencil: false,
		antialias: true,
		powerPreference: 'high-performance',
	})
	renderer.setSize(w, h)

	const camera = new T.PerspectiveCamera(75, w / h, 0.1, 1000)
	camera.position.z = 2
	camera.lookAt(0, 0, 0)

	const ambientLight = new T.AmbientLight('#40404f', 0.5)
	scene.add(ambientLight)

	const directionalLight = new T.DirectionalLight('#abcdff', 0.2)
	directionalLight.position.set(0, 1, 100)
	scene.add(directionalLight)
	//⌟

	//· Bloom ··········································································¬

	const renderScene = new RenderPass(scene, camera)

	const composer = new EffectComposer(renderer)
	composer.setPixelRatio(dpr)
	composer.setSize(W, H)
	composer.addPass(renderScene)

	const bloomPass = new UnrealBloomPass(
		new T.Vector2(W, H),
		params.bloom[activeTheme].strength,
		params.bloom[activeTheme].radius,
		params.bloom[activeTheme].threshold,
	)
	composer.addPass(bloomPass)

	const outputPass = new OutputPass()
	composer.addPass(outputPass)
	//⌟

	//· Theme Sync ·····································································¬

	const { background } = window.getComputedStyle(document.body)
	scene.background = new T.Color(background)

	// Sync canvas background color / bloom settings on theme change.
	subs.add(
		theme.subscribe((v) => {
			scene.background = new T.Color(window.getComputedStyle(document.body).background)

			activeTheme = v === 'dark' ? 'dark' : 'light'
			bloomPass.threshold = params.bloom[activeTheme].threshold
			bloomPass.strength = params.bloom[activeTheme].strength
			bloomPass.radius = params.bloom[activeTheme].radius
		}),
	)
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
			color: { value: new T.Color(0xff3e00) },
			time: { value: 0 },
			speed: { value: 1 },
			brightness: { value: 1 },
			noise_amplitude: { value: 0.25 },
			noise_speed: { value: 0.33 },
			noise_scale: { value: 1 },
			noise_color: { value: new T.Color(0.78, 0.66, 0.54) },
		},
		vertexShader,
		fragmentShader,
		silent: true, // Extraneous warnings.
	}) as any as T.ShaderMaterial
	//⌟

	//· Camera Animation ·······························································¬

	const cameraPosition = tweened(
		{ x: 0, y: 0 },
		{ duration: params.tween_duration, easing: cubicOut },
	)

	const rect = canvas.getBoundingClientRect()
	let clientX = rect.left + rect.width / 2
	let clientY = 0
	let scrollY = 0
	let totalY = 0

	const updateScroll = (e: Event) => {
		scrollY = window.scrollY
		update()
	}
	addEventListener('scroll', updateScroll, false)
	subs.add(() => removeEventListener('scroll', updateScroll, false))

	function updatePointer(e: PointerEvent) {
		clientY = e.clientY
		clientX = e.clientX
		update()
	}
	addEventListener('pointermove', updatePointer, false)
	subs.add(() => removeEventListener('pointermove', updatePointer, false))

	function update() {
		const rect = canvas.getBoundingClientRect()

		const x = clientX - (rect.left + rect.width / 2)

		const totalY = scrollY + clientY
		const middle = rect.top + rect.height / 2
		const y = -(totalY - middle)

		cameraPosition.set(
			{
				x: (x / window.innerWidth) * params.camera_sensitivity.x,
				y: (y / rect.height) * params.camera_sensitivity.y,
			},
			{ duration: params.tween_duration },
		)
	}

	function expoEaseOut(t: number): number {
		return t === 1 ? 1 : 1 - Math.pow(2, -10 * t)
	}

	function ease(value: number, min: number, max: number): number {
		// Normalize value to a 0-1 range
		let normalized = (value - min) / (max - min)

		// Apply exponential ease-out
		normalized = expoEaseOut(normalized)

		// Clamp and scale back to the original range
		const clampedAndScaled = Math.max(min, Math.min(max, normalized * (max - min) + min))

		return clampedAndScaled
	}

	cameraPosition.subscribe(({ x, y }) => {
		camera.position.x = x
		camera.position.y = y * params.camera_sensitivity.y
		camera.lookAt(0, 0, 0)
	})
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

	//· Utils ··········································································¬

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

	//· Controls ·······································································¬

	if (DEV) {
		const { Pane } = await import('tweakpane')

		const pane = new Pane({
			container: document.getElementById('controls')!,
		})

		const sceneFolder = pane.addFolder({ title: 'Scene' })
		sceneFolder.addBinding(params.camera_sensitivity, 'x', {
			label: 'Mouse X',
			min: -2,
			max: 2,
		})
		sceneFolder.addBinding(params.camera_sensitivity, 'y', {
			label: 'Mouse Y',
			min: -2,
			max: 2,
		})
		sceneFolder.addBinding(params, 'tween_duration', { min: 0, max: 2000 })

		const bloomFolder = sceneFolder.addFolder({ title: 'Bloom' })
		bloomFolder.addBinding(bloomPass, 'threshold', { min: 0, max: 1 })
		bloomFolder.addBinding(bloomPass, 'strength', { min: 0, max: 10 })
		bloomFolder.addBinding(bloomPass, 'radius', { min: 0, max: 1.5 })

		const lightsFolder = pane.addFolder({ title: 'Lights' })

		lightsFolder.addBinding(ambientLight, 'color', {
			label: 'ambient light',
			color: { type: 'float' },
		})

		lightsFolder.addBinding(ambientLight, 'intensity', {
			label: 'intensity',
			min: 0,
			max: 1,
		})

		lightsFolder.addBinding(directionalLight, 'color', {
			label: 'directional light',
			color: { type: 'float' },
		})

		lightsFolder.addBinding(directionalLight, 'intensity', {
			label: 'intensity',
			min: 0,
			max: 1,
		})

		const shaderFolder = pane.addFolder({ title: 'Shader' })

		shaderFolder.addBinding(svelte.material.uniforms.color, 'value', {
			label: 'color',
			color: { type: 'float' },
		})

		shaderFolder.addBinding(svelte.material.uniforms.speed, 'value', { min: 0, max: 2 })

		shaderFolder.addBinding(svelte.material.uniforms.brightness, 'value', { min: 0, max: 2 })

		shaderFolder.addBinding(svelte.material.uniforms.noise_amplitude, 'value', {
			label: 'noise amplitude',
			min: 0,
			max: 1,
		})

		shaderFolder.addBinding(svelte.material.uniforms.noise_speed, 'value', {
			label: 'noise speed',
			min: 0,
			max: 1,
			step: 0.01,
		})

		shaderFolder.addBinding(svelte.material.uniforms.noise_scale, 'value', {
			label: 'noise scale',
			min: 0,
			max: 10,
		})

		shaderFolder.addBinding(svelte.material.uniforms.noise_color, 'value', {
			label: 'noise color',
			color: { type: 'float' },
		})
	}
	//⌟

	return {
		destroy() {
			subs.forEach((sub) => sub())
			if (DEV) window.location.reload()
		},
	}
}
