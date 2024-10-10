import type { Tweened, TweenedOptions } from 'svelte/motion'
import type { Scene, Mesh, Object3D } from 'three'
import type { Folder, Gooey, NumberInputOptions } from 'gooey'

import { get } from 'svelte/store'

export class G3Obj {
	folder: Folder
	constructor(
		public parentFolder: Gooey | Folder,
		public scene: Scene,
		public obj: Mesh | Object3D,
		public name = obj.name,
	) {
		this.folder = parentFolder.addFolder(name, { closed: true })

		const transform_f = this.folder.addFolder('Transform', { closed: true })

		const position_f = transform_f.addFolder('position', { closed: true })
		let mm = { min: -10, max: 10 }

		position_f.bind(obj.position, 'x', mm)
		position_f.bind(obj.position, 'y', mm)
		position_f.bind(obj.position, 'z', mm)

		const rotation_f = transform_f.addFolder('rotation', { closed: true })
		mm = { min: -Math.PI, max: Math.PI }

		rotation_f.bind(obj.rotation, 'x', mm)
		rotation_f.bind(obj.rotation, 'y', mm)
		rotation_f.bind(obj.rotation, 'z', mm)

		const scale_f = transform_f.addFolder('scale', { closed: true })
		mm = { min: 0.1, max: 3 }

		scale_f
			.addNumber('xyz', Math.sqrt(obj.scale.x * obj.scale.y * obj.scale.z), {
				min: 0.1,
				max: 3,
			})
			.on('change', v => {
				obj.scale.set(v, v, v)
			})
		scale_f.bind(obj.scale, 'x', mm)
		scale_f.bind(obj.scale, 'y', mm)
		scale_f.bind(obj.scale, 'z', mm)

		this.folder.bind(obj, 'visible')
	}
}

// todo - add sensitivity controls...
type Vec2 = { x: number; y: number }
export function tweenGooey(
	name: string,
	opts: TweenedOptions<Vec2> & {
		duration: number
		x: number
		y: number
	},
	parentFolder: Gooey | Folder,
	tween: Tweened<Vec2>,
	inputOpts?: Partial<NumberInputOptions>,
) {
	const folder = parentFolder.addFolder(name, { closed: true })

	opts.delay ??= 0

	folder.bind(opts, 'duration')
	folder.bind(opts, 'delay')

	inputOpts = Object.assign({ min: -1, disabled: true, resettable: false }, inputOpts ?? {})

	folder.bind(opts, 'x', { title: 'x intensity' })
	const x = folder.addNumber('x', opts.x, inputOpts)
	// @ts-expect-error - _evm is private
	x._evm.add(tween.subscribe(v => (x.value = v.x)))

	folder.bind(opts, 'y', { title: 'y intensity' })
	const y = folder.addNumber('y', opts.y, inputOpts)
	// @ts-expect-error - _evm is private
	y._evm.add(tween.subscribe(v => (y.value = v.y)))

	// if (tween) {
	// 	const opts = Object.assign({ disabled: true, min: -1 }, inputOpts)
	// 	const v = get(tween)

	// 	if (v && typeof v === 'object') {
	// 		for (const [key, value] of Object.entries(v)) {
	// 			if (typeof value === 'number') {
	// 				const input = folder.addNumber(key, value, opts)
	// 				// @ts-expect-error - _evm is private
	// 				input._evm.add(
	// 					tween.subscribe(v => (input.value = v[key as keyof T] as number)),
	// 				)
	// 			}
	// 		}
	// 	} else if (typeof v === 'number') {
	// 		const input = folder.add('value', v, opts)
	// 		// @ts-expect-error - _evm is private
	// 		input._evm.add(tween.subscribe(v => (input.value = v as number)))
	// 	}
	// }

	return { folder }
}

export function object3dGooey(parentFolder: Gooey | Folder, obj: Mesh | Object3D, name = obj.name) {
	const folder = parentFolder.addFolder(name, { closed: true })

	const transform_f = folder.addFolder('Transform', { closed: true })

	// Position
	const position_f = transform_f.addFolder('position', { closed: true })
	const positionMM = { min: -10, max: 10 }
	position_f.bind(obj.position, 'x', positionMM)
	position_f.bind(obj.position, 'y', positionMM)
	position_f.bind(obj.position, 'z', positionMM)

	// Rotation
	const rotation_f = transform_f.addFolder('rotation', { closed: true })
	const rotationMM = { min: -Math.PI, max: Math.PI }
	rotation_f.bind(obj.rotation, 'x', rotationMM)
	rotation_f.bind(obj.rotation, 'y', rotationMM)
	rotation_f.bind(obj.rotation, 'z', rotationMM)

	// Scale
	const scale_f = transform_f.addFolder('scale', { closed: true })
	const scaleMM = { min: 0.1, max: 3 }

	scale_f
		.addNumber('xyz', Math.sqrt(obj.scale.x * obj.scale.y * obj.scale.z), {
			min: 0.1,
			max: 3,
		})
		.on('change', v => {
			obj.scale.set(v, v, v)
		})
	scale_f.bind(obj.scale, 'x', scaleMM)
	scale_f.bind(obj.scale, 'y', scaleMM)
	scale_f.bind(obj.scale, 'z', scaleMM)

	folder.bind(obj, 'visible')

	return { folder }
}
