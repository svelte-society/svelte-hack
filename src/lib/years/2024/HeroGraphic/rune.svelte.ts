import type { Material } from 'three'
import type { Gooey } from 'gooey'

import {
	MeshStandardMaterial,
	PerspectiveCamera,
	DirectionalLight,
	ShaderMaterial,
	WebGLRenderer,
	AmbientLight,
	Vector3,
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

import { themer } from '$lib/themer/themer.svelte'
import fragmentShader from './rune.frag?raw'
import { object3dGoo } from './object3dGoo'
import vertexShader from './rune.vert?raw'
import { UnrealBloomPass } from './Bloom'
import { tweenGoo } from './tweenGoo'

import { cubicOut, quintOut } from 'svelte/easing'
import { device } from '$lib/utils/device.svelte'
import { tweened } from 'svelte/motion'
import { BROWSER, DEV } from 'esm-env'

const params = {
	tween_duration: 800,
	/** Camera position sensitivity to mouse xy. */
	camera: {
		x: 1,
		y: 0.66,
	},
	/** Rune position sensitivity to mouse xy. */
	offset: {
		x: 0.3,
		y: 0.15,
	},
	tweens: {
		rotation: {
			duration: 1200,
			easing: quintOut,
			x: 1,
			y: 0.5,
		},
		position: {
			duration: 800,
			easing: quintOut,
			x: 0.3,
			y: 0.15,
		},
		clonePosition: {
			duration: 3000,
			easing: quintOut,
			x: 0.3,
			y: 0.15,
		},
	},
	bloom: {
		dark: {
			threshold: 0.29,
			strength: 4.57,
			radius: 0.38,
		},
		light: {
			threshold: 0.37,
			strength: 2.875,
			radius: 0.9,
		},
	},
	lights: {
		light: {
			ambient: {
				color: new Color('#40404f'),
				intensity: 0.74,
			},
			directional: {
				color: new Color('#97aed6'),
				intensity: 0.72,
			},
		},
		dark: {
			ambient: {
				color: new Color('#40404f'),
				intensity: 0.5,
			},
			directional: {
				color: new Color('#abcdff'),
				intensity: 0.2,
			},
		},
	},
}

let gui: Gooey | null = null

export async function init(canvas: HTMLCanvasElement) {
	if (!BROWSER) return { destroy() {} }

	//#region Setup ··········································································¬

	let activeTheme: 'light' | 'dark' = themer.mode === 'dark' ? 'dark' : 'light'

	/** Store / rune callbacks for unsubscribe / cleanup. */
	const subs = new Set<() => void>()

	const scene = new Scene()

	const dpr = window.devicePixelRatio
	const w = canvas.offsetWidth * dpr
	const h = canvas.offsetHeight * dpr
	const W = window.innerWidth * dpr
	const H = window.innerHeight * dpr

	const renderer = new WebGLRenderer({
		canvas,
		alpha: true,
		depth: false,
		stencil: false,
		antialias: true,
		powerPreference: 'high-performance',
	})
	renderer.setSize(w, h)
	renderer.setClearColor(0x000000, 0)

	const camera = new PerspectiveCamera(75, w / h, 0.1, 1000)
	camera.position.z = 2
	camera.lookAt(0, 0, 0)

	const ambientLight = new AmbientLight('#40404f', 0.5)
	scene.add(ambientLight)

	const directionalLight = new DirectionalLight('#abcdff', 0.2)
	directionalLight.position.set(0, 1, 100)
	scene.add(directionalLight)
	//#endregion Setup

	//#region Bloom ··········································································¬

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
	//#endregion Bloom

	//#endregion Gooey

	//#region Resize

	const onResize = () => {
		composer.setSize(window.innerWidth, window.innerHeight)
		renderer.setSize(window.innerWidth, window.innerHeight)
	}

	// globalThis.window?.removeEventListener('resize', onResize)
	// globalThis.window?.addEventListener('resize', onResize)

	//#endregion Resize

	//#region Theme Sync ·····································································¬

	// fully transparent background

	// const { background } = window.getComputedStyle(document.body)
	// scene.background = new Color(background)

	// Sync canvas background color / bloom settings on theme change.
	subs.add(
		$effect.root(() => {
			$effect(() => {
				bloomPass.threshold = params.bloom[themer.mode].threshold
				bloomPass.strength = params.bloom[themer.mode].strength
				bloomPass.radius = params.bloom[themer.mode].radius

				ambientLight.color.set(params.lights[themer.mode].ambient.color)
				ambientLight.intensity = params.lights[themer.mode].ambient.intensity
				directionalLight.color.set(params.lights[themer.mode].directional.color)
				directionalLight.intensity = params.lights[themer.mode].directional.intensity

				for (const [_, input] of gui?.folder?.allInputs ?? []) {
					if (['ambient', 'light'].includes(input.title)) {
						input.refresh()
					}
				}
			})

			$effect(() => {
				device.mobile
				onResize()
			})
		}),
	)
	// subs.add(
	// 	theme.subscribe(v => {
	// 		scene.background = new Color(window.getComputedStyle(document.body).background)

	// 		activeTheme = v === 'dark' ? 'dark' : 'light'
	// 		bloomPass.threshold = params.bloom[activeTheme].threshold
	// 		bloomPass.strength = params.bloom[activeTheme].strength
	// 		bloomPass.radius = params.bloom[activeTheme].radius
	// 	}),
	// )
	//#endregion Theme Sync

	//#region Runes ··········································································¬

	interface RuneOpts {
		position: { x: number; y: number; z: number }
		scale: number
		rotate: { x: number; y: number; z: number }
	}

	// load the glb
	const loader = new GLTFLoader()
	const runes = (
		await loader.loadAsync('/assets/runes.glb').catch(error => {
			console.error('Failed to load the glb:', error)
		})
	)?.scene

	if (!runes) return

	const runeGroup = new Group()
	const animateIn = tweened(0, { duration: 2000, easing: quintOut })
	runeGroup.scale.setScalar(0)
	scene.add(runeGroup)

	runes.rotateY(-Math.PI / 2)
	runeGroup.add(runes)

	/** //* Main, large runestone mesh. */
	const runestone = runes.children[0] as Mesh

	const cloneGroup = new Group()
	cloneGroup.scale.setScalar(0)
	scene.add(cloneGroup)

	/** //* Bottom-Left runestone mesh clone. */
	const runeBL = createRune(runestone, {
		position: { x: -0.5, y: -0.85, z: 0 },
		scale: 0.066,
		rotate: { x: 0.5, y: 0, z: 0.7 },
	})
	cloneGroup.add(runeBL)

	/** //* Top-Left runestone mesh clone. */
	const runeTL = createRune(runestone, {
		position: { x: -0.6, y: 0.35, z: 0 },
		scale: 0.033,
		rotate: { x: -0.1, y: Math.PI, z: -2.8 },
	})
	cloneGroup.add(runeTL)

	/** //* Bottom-Right runestone mesh clone. */
	const runeBR = createRune(runestone, {
		position: { x: 0.5, y: -0.75, z: 0 },
		scale: 0.05,
		rotate: { x: 0.4, y: 0, z: 2.8 },
	})
	cloneGroup.add(runeBR)
	//#endregion Runes

	//#region Svelte Logo ····································································¬

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
	//#endregion Svelte Logo

	//#region Tween Animation ·······························································¬

	// const cameraPosition = tweened({ x: 0, y: 0 })
	const runeRotation = tweened({ x: 0, y: 0 })
	const runePosition = tweened({ x: 0, y: 0 })
	const clonePosition = tweened({ x: 0, y: 0 })

	const rect = canvas.getBoundingClientRect()
	let mouseX = rect.left + rect.width / 2
	let mouseY = 0
	let scrollY = 0

	const updateScroll = () => {
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

	// Create a target rotation based on mouse position
	const targetRotation = new Vector3()
	const lerp = 0.5

	// todo - add tween params to set calls below
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

			const relative_x = -x / window.innerWidth
			const relative_y = y / rect.height

			// wip
			targetRotation.x = relative_y * lerp * params.tweens.rotation.y
			targetRotation.y = -relative_x * lerp * params.tweens.rotation.x

			runeRotation.set(
				{
					x: targetRotation.x,
					y: targetRotation.y,
				},
				{
					duration: params.tween_duration,
					easing: cubicOut,
				},
			)

			runePosition.set(
				{
					x: relative_x * params.tweens.position.x,
					y: relative_y * params.tweens.position.y,
				},
				{
					duration: params.tween_duration * 0.75,
					easing: cubicOut,
				},
			)

			clonePosition.set(
				{
					x: relative_x * params.tweens.clonePosition.x,
					y: relative_y * params.tweens.clonePosition.y,
				},
				{
					duration: params.tweens.clonePosition.duration,
					easing: params.tweens.clonePosition.easing,
					// easing: (t: number) =>
					// 	params.debug.amp *
					// 		Math.sin((-13.0 * (t + 1.0) * Math.PI) / 2) *
					// 		Math.pow(2.0, -params.debug.decay * t) +
					// 	1.0,
				},
			)
		}
	}

	subs.add(
		runeRotation.subscribe(({ x, y }) => {
			runeGroup.rotation.x = x
			runeGroup.rotation.y = y
			cloneGroup.rotation.x = x
			cloneGroup.rotation.y = y
		}),
	)

	subs.add(
		runePosition.subscribe(({ x, y }) => {
			runeGroup.position.x = -x
			runeGroup.position.y = -y
		}),
	)

	subs.add(
		clonePosition.subscribe(({ x, y }) => {
			cloneGroup.position.x = -x
			cloneGroup.position.y = -y
		}),
	)
	//#endregion Tween Animation

	//#region Scene Animation ································································¬

	function mapRange(v: number, x1: number, x2: number, y1: number, y2: number) {
		return ((v - x1) * (y2 - y1)) / (x2 - x1) + y1
	}

	// Scale-in animation.
	animateIn.subscribe(v => {
		runeGroup.scale.setScalar(v)
		cloneGroup.scale.setScalar(v)

		bloomPass.radius = mapRange(v, 0, 1, 2, params.bloom[themer.mode].radius)
		bloomPass.strength = mapRange(v, 0, 1, 10, params.bloom[themer.mode].strength)
		bloomPass.threshold = mapRange(v, 0, 1, 0.1, params.bloom[themer.mode].threshold)
	})
	setTimeout(() => requestAnimationFrame(() => animateIn.set(1)), 600)

	let t = 0
	let running = true

	let frame = 0
	let fpsLimit = 60
	let previousTimestamp = 0

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

		previousTimestamp = timestamp
		animate(delta)
		frame = requestAnimationFrame(loop)
	}

	const initial = {
		runestone: { position: runestone.position.clone() },
		svelte: { position: svelte.position.clone() },
		runeBL: { position: runeBL.position.clone() },
		runeBR: { position: runeBR.position.clone() },
		runeTL: { position: runeTL.position.clone() },
	}

	const animate = (delta: number) => {
		t += delta

		runeBL.position.y = Math.sin(t / 1000) * 0.05 + initial.runeBL.position.y
		runeBR.position.y = Math.sin(5 + t / 1100) * 0.033 + initial.runeBR.position.y
		runeTL.position.y = Math.sin(15 + t / 900) * 0.05 + initial.runeTL.position.y

		svelte.material.uniforms.time.value = t / 1000

		composer.render()
	}

	loop(Date.now())
	//#endregion Scene Ann

	//#region Utils ··········································································¬

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
	//#endregion Utils

	//#region Gooey ·······································································¬

	async function addGooey() {
		const { Gooey } = await import('gooey')

		gui = new Gooey({
			title: 'Rune',
			margin: { x: 16 * 7, y: 16 },
			storage: {
				key: 'sveltehack-2024-rune-gooey',
				position: true,
				size: true,
			},
		})

		const mesh_f = gui.addFolder('Objects', { closed: true })
		object3dGoo(mesh_f, runeBL, 'Rune BL')
		object3dGoo(mesh_f, runeBR, 'Rune BR')
		object3dGoo(mesh_f, runeTL, 'Rune TL')
		object3dGoo(mesh_f, svelte, 'Svelte')

		const mouse_f = gui.addFolder('Mouse', { closed: true })

		tweenGoo('rotation', params.tweens.rotation, mouse_f, runeRotation, {
			name: 'quint',
			type: 'Out',
		})
		tweenGoo('position', params.tweens.position, mouse_f, runePosition, {
			name: 'quint',
			type: 'Out',
		})
		tweenGoo('clone position', params.tweens.clonePosition, mouse_f, clonePosition, {
			name: 'elastic',
			type: 'Out',
		})

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
			.on('change', v => ambientLight.color.set(v.hexString))
		lights_f.bind(ambientLight, 'intensity', {
			title: 'ambient amt',
			min: 0,
			max: 1,
		})
		lights_f
			.addColor('light color', float2RGB(directionalLight.color))
			.on('change', v => directionalLight.color.set(v.hexString))

		lights_f.bind(directionalLight, 'intensity', {
			title: 'light amt',
			min: 0,
			max: 1,
		})

		const shader_f = gui.addFolder('Shader', { closed: true })

		shader_f
			.addColor('color', float2RGB(svelte.material.uniforms.color.value))
			.on('change', v => (svelte.material.uniforms.color.value as Color).set(v.hexString))
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
			.on('change', v =>
				(svelte.material.uniforms.noise_color.value as Color).set(v.hexString),
			)
	}

	if (DEV && !device.mobile && globalThis?.window?.location?.search?.includes('gui')) {
		const defer =
			typeof globalThis.requestIdleCallback !== 'undefined'
				? requestIdleCallback
				: requestAnimationFrame
		defer(addGooey)
	} else {
		// easter egg
		let clicked = 0
		let max = 10

		function click() {
			if (++clicked >= max) {
				if (!gui) {
					addGooey()
					max = 2
				} else {
					gui.toggleHidden()
				}
				clicked = 0
			}
		}

		canvas.addEventListener('click', click)
		subs.add(() => canvas.removeEventListener('click', click))
	}

	return {
		destroy() {
			if (gui) gui.dispose()

			running = false
			cancelAnimationFrame(frame)

			// Clear the canvas
			const ctx = canvas.getContext('webgl2')
			ctx?.clearColor(0, 0, 0, 0)

			// Cleanup materials / geometries / textures
			scene.traverse(object => {
				if (object instanceof Mesh) {
					if ((object.material as Material).isMaterial) {
						object.material.dispose()
					} else if (Array.isArray(object.material)) {
						object.material.forEach(material => material.dispose())
					}
					if (object.geometry) {
						object.geometry.dispose()
					}
				}
			})

			// Cleanup postprocessing
			composer.passes.forEach(pass => {
				if (pass.dispose) pass.dispose()
			})
			composer.dispose()
			renderer.dispose()

			// Clear scene objects
			while (scene.children.length > 0) {
				scene.remove(scene.children[0])
			}

			// Unsubscribe from all subscriptions
			subs.forEach(sub => sub())
		},
	}
}
