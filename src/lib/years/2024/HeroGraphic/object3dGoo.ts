import type { Mesh, Object3D } from 'three'
import type { Folder, Gooey } from 'gooey'

import { elasticOut } from 'svelte/easing'

export function object3dGoo(parentFolder: Gooey | Folder, obj: Mesh | Object3D, name = obj.name) {
	const folder = parentFolder.addFolder(name, { closed: true })

	const transform_f = folder.addFolder('Transform', { closed: true })

	// Position
	const position_f = transform_f.addFolder('position', { closed: true })
	const positionMM = { min: -3, max: 3 }
	position_f.bind(obj.position, 'x', { ...positionMM, title: 'x' })
	position_f.bind(obj.position, 'y', { ...positionMM, title: 'y', disabled: true })
	position_f.bind(obj.position, 'z', { ...positionMM, title: 'z' })

	// Rotation
	const rotation_f = transform_f.addFolder('rotation', { closed: true })
	const rotationMM = { min: -Math.PI, max: Math.PI }
	rotation_f.bind(obj.rotation, 'x', { ...rotationMM, title: 'x' })
	rotation_f.bind(obj.rotation, 'y', { ...rotationMM, title: 'y' })
	rotation_f.bind(obj.rotation, 'z', { ...rotationMM, title: 'z' })

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
	scale_f.bind(obj.scale, 'x', { ...scaleMM, title: 'x' })
	scale_f.bind(obj.scale, 'y', { ...scaleMM, title: 'y' })
	scale_f.bind(obj.scale, 'z', { ...scaleMM, title: 'z' })

	const EASINGS = [
		{
			label: 'Elastic Out',
			easing: elasticOut,
		},
	]

	folder.bind(obj, 'visible')

	return { folder }
}
