import type { Material } from 'three'
import type { Gooey } from 'gooey'

import {
	MeshStandardMaterial,
	PerspectiveCamera,
	DirectionalLight,
	ShaderMaterial,
	WebGLRenderer,
	AmbientLight,
	Vector2,
	Color,
	Scene,
	Group,
	Mesh,
} from 'three'
import { EffectComposer } from 'three/addons/postprocessing/EffectComposer.js'
import CustomShaderMaterial from 'three-custom-shader-material/vanilla'
import { RenderPass } from 'three/addons/postprocessing/RenderPass.js'
import { OutputPass } from 'three/addons/postprocessing/OutputPass.js'
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js'

import fragmentShader from './rune.frag?raw'
import vertexShader from './rune.vert?raw'
import { UnrealBloomPass } from './Bloom'
import { get } from 'svelte/store'
import { theme } from 'fractils' // todo - replace with svelte 5 themer
import { G3Obj } from './goos'

import { device } from '$lib/utils/device.svelte'
import { cubicOut, quintOut } from 'svelte/easing'
import { tweened } from 'svelte/motion'
import { BROWSER, DEV } from 'esm-env'

const params = {
	tween_duration: 800,
	camera_sensitivity: {
		x: -1,
		y: 0.66,
	},
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
} as const

export async function init(canvas: HTMLCanvasElement) {
	if (!BROWSER) return { destroy() {} }

	//· Setup ··········································································¬

	let activeTheme: 'light' | 'dark' = get(theme) === 'dark' ? 'dark' : 'light'

	// Unsubscribe functions.
	const subs = new Set<() => void>()

	const scene = new Scene()

	const dpr = window.devicePixelRatio
	const w = canvas.offsetWidth * dpr
	const h = canvas.offsetHeight * dpr
	const W = window.innerWidth * dpr
	const H = window.innerHeight * dpr

	const renderer = new WebGLRenderer({
		canvas,
		alpha: false,
		depth: false,
		stencil: false,
		antialias: true,
		powerPreference: 'high-performance',
	})
	renderer.setSize(w, h)

	const camera = new PerspectiveCamera(75, w / h, 0.1, 1000)
	camera.position.z = 2
	camera.lookAt(0, 0, 0)

	const ambientLight = new AmbientLight('#40404f', 0.5)
	scene.add(ambientLight)

	const directionalLight = new DirectionalLight('#abcdff', 0.2)
	directionalLight.position.set(0, 1, 100)
	scene.add(directionalLight)
	//⌟

	//· Bloom ·········································································¬

	const renderScene = new RenderPass(scene, camera)

	const composer = new EffectComposer(renderer)
	composer.setPixelRatio(dpr)
	composer.setSize(W, H)
	composer.addPass(renderScene)

	const bloomPass = new UnrealBloomPass(
		new Vector2(W, H),
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
	scene.background = new Color(background)

	// Sync canvas background color / bloom settings on theme change.
	subs.add(
		theme.subscribe((v) => {
			scene.background = new Color(window.getComputedStyle(document.body).background)

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
			console.error('Failed to load the glb:', error)
		})
	)?.scene

	if (!runes) return

	const runeGroup = new Group()
	const scale = tweened(0, { duration: 2000, easing: quintOut })
	runeGroup.scale.setScalar(0)
	scene.add(runeGroup)

	runes.rotateY(-Math.PI / 2)
	runeGroup.add(runes)

	const runestone = runes.children[0] as Mesh

	const runeBLOpts: RuneOpts = {
		position: { x: -0.5, y: -0.85, z: 0 },
		scale: 0.066,
		rotate: { x: 0.5, y: 0, z: 0.7 },
	}
	const runeBL = createRune(runestone, runeBLOpts)
	runeGroup.add(runeBL)

	const runeTLOpts: RuneOpts = {
		position: { x: -0.6, y: 0.35, z: 0 },
		scale: 0.033,
		rotate: { x: -0.1, y: Math.PI, z: -2.8 },
	}
	const runeTL = createRune(runestone, runeTLOpts)
	runeGroup.add(runeTL)

	const runeBROpts: RuneOpts = {
		position: { x: 0.5, y: -0.75, z: 0 },
		scale: 0.05,
		rotate: { x: 0.4, y: 0, z: 2.8 },
	}
	const runeBR = createRune(runestone, runeBROpts)
	runeGroup.add(runeBR)
	//⌟

	//· Svelte Logo ····································································¬

	const svelte = scene.getObjectByName('svelte-outer') as Mesh<any, ShaderMaterial>

	svelte.material = new CustomShaderMaterial({
		baseMaterial: MeshStandardMaterial,
		uniforms: {
			color: { value: new Color(0xff3e00) },
			time: { value: 0 },
			speed: { value: 1 },
			brightness: { value: 1 },
			noise_amplitude: { value: 0.25 },
			noise_speed: { value: 0.33 },
			noise_scale: { value: 1 },
			noise_color: { value: new Color(0.78, 0.66, 0.54) },
		},
		vertexShader,
		fragmentShader,
		silent: true, // Extraneous warnings.
	}) as any as ShaderMaterial
	//⌟

	//· Camera Animation ·······························································¬

	const cameraPosition = tweened(
		{ x: 0, y: 0 },
		{ duration: params.tween_duration, easing: cubicOut },
	)

	const rect = canvas.getBoundingClientRect()
	let mouseX = rect.left + rect.width / 2
	let mouseY = 0
	let scrollY = 0

	const updateScroll = (e: Event) => {
		scrollY = window.scrollY
		update()
	}
	addEventListener('scroll', updateScroll, false)
	subs.add(() => removeEventListener('scroll', updateScroll, false))

	function updatePointer(e: PointerEvent) {
		mouseY = e.clientY
		mouseX = e.clientX
		update()
	}
	addEventListener('pointermove', updatePointer, false)
	subs.add(() => removeEventListener('pointermove', updatePointer, false))

	function update() {
		if (device.mobile) {
			// todo -- maybe do more with scroll since we don't have a mouse?
		} else {
			const rect = canvas.getBoundingClientRect()

			// Calculate the mouse position relative to the center of the canvas
			const x = mouseX - (rect.left + rect.width / 2)
			const totalY = scrollY + mouseY
			const middle = rect.top + rect.height / 2
			const y = totalY - middle

			// Invert the x and y values to make the rune lean towards the mouse
			cameraPosition.set(
				{
					x: (x / window.innerWidth) * params.camera_sensitivity.x,
					y: (y / rect.height) * params.camera_sensitivity.y,
				},
				{ duration: params.tween_duration },
			)
		}
	}

	cameraPosition.subscribe(({ x, y }) => {
		camera.position.x = x
		camera.position.y = y * params.camera_sensitivity.y
		camera.lookAt(0, 0, 0)
	})
	//⌟

	//· Animation ······································································¬

	// Scale in the runes.
	scale.subscribe((v) => {
		runeGroup.scale.setScalar(v)
	})
	setTimeout(() => {
		requestAnimationFrame(() => scale.set(1))
	}, 600)

	let running = true
	let previousTimestamp = 0
	let fpsLimit = 60
	let frame = 0
	let fps = 0
	let t = 0

	function loop(timestamp: DOMHighResTimeStamp) {
		if (!running) return

		if (previousTimestamp === null) {
			previousTimestamp = timestamp
		}

		const delta = timestamp - previousTimestamp
		const fps_time = 1000 / delta
		if (fpsLimit && fps_time > fpsLimit) {
			frame = requestAnimationFrame(loop)
			return
		}

		fps = fps_time
		previousTimestamp = timestamp
		animate(delta)
		frame = requestAnimationFrame(loop)
	}

	const animate = (delta: number) => {
		t += delta

		runeBL.position.y = runeBLOpts.position.y + Math.sin(t / 1000) * 0.05
		runeBR.position.y = runeBROpts.position.y + Math.sin(5 + t / 1100) * 0.033
		runeTL.position.y = runeTLOpts.position.y + Math.sin(15 + t / 900) * 0.05

		svelte.material.uniforms.time.value = t / 1000

		composer.render()
	}

	loop(Date.now())
	// animate(0)
	//⌟

	//· Utils ··········································································¬

	function createRune(mesh: Mesh, opts: RuneOpts) {
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

	let gui: Gooey | null = null
	async function addGooey() {
		const { Gooey } = await import('gooey')

		gui = new Gooey({
			title: 'Rune',
			storage: {
				key: 'sveltehack-2024-rune-gooey',
				position: true,
				size: true,
			},
		})

		const mesh_f = gui.addFolder('Objects', { closed: true })
		new G3Obj(mesh_f, scene, runeBL, 'Rune BL')
		new G3Obj(mesh_f, scene, runeBR, 'Rune BR')
		new G3Obj(mesh_f, scene, runeTL, 'Rune TL')
		new G3Obj(mesh_f, scene, svelte, 'Svelte')

		const mouse_f = gui.addFolder('Mouse', { closed: true })

		mouse_f.bind(params, 'tween_duration', { max: 2000, min: 0 })
		mouse_f.bind(params.camera_sensitivity, 'x', { title: 'Mouse X', min: -2, max: 2 })
		mouse_f.bind(params.camera_sensitivity, 'y', { title: 'Mouse Y', min: -2, max: 2 })

		const bloom_f = gui.addFolder('Bloom', { closed: true })
		bloom_f.bind(bloomPass, 'threshold', { min: 0, max: 1 })
		bloom_f.bind(bloomPass, 'strength', { min: 0, max: 10 })
		bloom_f.bind(bloomPass, 'radius', { min: 0, max: 1.5 })

		const lights_f = gui.addFolder('Lights', { closed: true })

		function float2RGB(c: Color) {
			return {
				r: c.r * 255,
				g: c.g * 255,
				b: c.b * 255,
			}
		}

		lights_f
			.addColor('ambient color', float2RGB(ambientLight.color))
			.on('change', (v) => ambientLight.color.set(v.hexString))
		lights_f.bind(ambientLight, 'intensity', {
			title: 'ambient amt',
			min: 0,
			max: 1,
		})
		lights_f
			.addColor('light color', float2RGB(directionalLight.color))
			.on('change', (v) => directionalLight.color.set(v.hexString))

		lights_f.bind(directionalLight, 'intensity', {
			title: 'light amt',
			min: 0,
			max: 1,
		})

		const shader_f = gui.addFolder('Shader', { closed: true })

		shader_f
			.addColor('color', float2RGB(svelte.material.uniforms.color.value))
			.on('change', (v) => (svelte.material.uniforms.color.value as Color).set(v.hexString))
		shader_f.bind(svelte.material.uniforms.speed, 'value', { title: 'speed', min: 0, max: 2 })
		shader_f.bind(svelte.material.uniforms.brightness, 'value', {
			title: 'brightness',
			min: 0,
			max: 2,
		})
		shader_f.bind(svelte.material.uniforms.noise_amplitude, 'value', {
			title: 'noise amplitude',
			min: 0,
			max: 1,
		})
		shader_f.bind(svelte.material.uniforms.noise_speed, 'value', {
			title: 'noise speed',
			min: 0,
			max: 1,
			step: 0.01,
		})
		shader_f.bind(svelte.material.uniforms.noise_scale, 'value', {
			title: 'noise scale',
			min: 0,
			max: 10,
		})
		shader_f
			.addColor('noise color', float2RGB(svelte.material.uniforms.noise_color.value))
			.on('change', (v) =>
				(svelte.material.uniforms.noise_color.value as Color).set(v.hexString),
			)
	}

	if (DEV && !device.mobile) {
		addGooey()
	} else {
		// easter egg
		let clicked = 0

		function click() {
			if (++clicked == 5) {
				addGooey()
			}
		}

		canvas.addEventListener('click', click)
		subs.add(() => canvas.removeEventListener('click', click))
	}

	//⌟

	return {
		destroy() {
			if (gui) gui.dispose()

			running = false
			cancelAnimationFrame(frame)

			// Clear the canvas immediately
			const ctx = canvas.getContext('2d')
			ctx?.clearRect(0, 0, canvas.width, canvas.height)

			// Cleanup materials / geometries / textures
			scene.traverse((object) => {
				if (object instanceof Mesh) {
					if ((object.material as Material).isMaterial) {
						object.material.dispose()
					} else if (Array.isArray(object.material)) {
						object.material.forEach((material) => material.dispose())
					}
					if (object.geometry) {
						object.geometry.dispose()
					}
				}
			})

			// Cleanup postprocessing
			composer.passes.forEach((pass) => {
				if (pass.dispose) pass.dispose()
			})
			composer.dispose()
			renderer.dispose()

			// Clear the scene
			while (scene.children.length > 0) {
				scene.remove(scene.children[0])
			}

			// Unsubscribe from all subscriptions
			subs.forEach((sub) => sub())

			console.warn('destroyed')
		},
	}
}
