import type { Folder, Gooey, NumberInputOptions } from 'gooey'
import type { Tweened, TweenedOptions } from 'svelte/motion'
import type { EasingFunction } from 'svelte/transition'

import * as eases from 'svelte/easing'

export type EaseType = (typeof EASE_TYPES)[number][1]

export const EASE_TYPES = [
	['ease in', 'In'],
	['ease out', 'Out'],
	['ease in out', 'InOut'],
] as const

export type EaseName = (typeof EASE_NAMES)[number]

export const EASE_NAMES = [
	'linear',
	'sine',
	'quad',
	'cubic',
	'quart',
	'quint',
	'expo',
	'circ',
	'back',
	'elastic',
	'bounce',
] as const

type ProcessedEase = {
	fn: EasingFunction
	shape: string
}

type ProcessedEases = {
	[key in EaseName]: {
		In: ProcessedEase
		Out: ProcessedEase
		InOut: ProcessedEase
	}
}

const processed_eases = {} as ProcessedEases

for (const ease in eases) {
	if (ease === 'linear') {
		processed_eases.linear = {
			In: { fn: eases.linear, shape: 'M0 1000 L1000 0' },
			Out: { fn: eases.linear, shape: 'M0 1000 L1000 0' },
			InOut: { fn: eases.linear, shape: 'M0 1000 L1000 0' },
		}
	} else {
		const name = ease.replace(/In$|InOut$|Out$/, '') as EaseName
		const type = ease.match(/In$|InOut$|Out$/)?.[0] as EaseType

		processed_eases[name] ??= {} as ProcessedEases[EaseName]
		processed_eases[name][type] = {} as ProcessedEases[EaseName][EaseType]
		processed_eases[name][type].fn = eases[ease as keyof typeof eases]

		let shape = 'M0 1000'
		for (let i = 1; i <= 1000; i++) {
			shape = `${shape} L${(i / 1000) * 1000} ${1000 - eases[ease as keyof typeof eases](i / 1000) * 1000} `
			processed_eases[name][type].shape = shape
		}
	}
}

const sorted_eases = new Map([
	['linear', processed_eases.linear],
	['sine', processed_eases.sine],
	['quad', processed_eases.quad],
	['cubic', processed_eases.cubic],
	['quart', processed_eases.quart],
	['quint', processed_eases.quint],
	['expo', processed_eases.expo],
	['circ', processed_eases.circ],
	['back', processed_eases.back],
	['elastic', processed_eases.elastic],
	['bounce', processed_eases.bounce],
])

// todo - add sensitivity controls...
type Vec2 = { x: number; y: number }
export function tweenGoo(
	name: string,
	opts: TweenedOptions<Vec2> & {
		duration: number
		x: number
		y: number
	},
	parentFolder: Gooey | Folder,
	tween: Tweened<Vec2>,
	easeOptions: {
		name: EaseName
		type: EaseType
	},
	inputOpts?: Partial<NumberInputOptions>,
) {
	const folder = parentFolder.addFolder(name, { closed: true })

	opts.delay ??= 0

	folder.bindNumber(opts, 'duration')
	folder.bindNumber(opts, 'delay')

	inputOpts = Object.assign({ min: -1, disabled: true, resettable: false }, inputOpts ?? {})

	folder.bind(opts, 'x', { title: 'x intensity' })
	const x = folder.addNumber('x', opts.x, inputOpts)
	// @ts-expect-error (_evm is private)
	x._evm.add(tween.subscribe(v => (x.value = v.x)))

	folder.bind(opts, 'y', { title: 'y intensity' })
	const y = folder.addNumber('y', opts.y, inputOpts)
	// @ts-expect-error (_evm is private)
	y._evm.add(tween.subscribe(v => (y.value = v.y)))

	// Ease

	let activeEaseName = easeOptions.name ?? 'linear'
	let activeEaseType = easeOptions.type ?? 'Out'
	let activeEaseFn = sorted_eases.get(activeEaseName)?.[activeEaseType]?.fn ?? eases.linear

	const ease_f = folder.addFolder('ease', { closed: true })
	ease_f
		.addSelect('ease', EASE_NAMES as any as string[], {
			initialValue: activeEaseName,
		})
		.on('change', ({ value }) => {
			activeEaseName = value as EaseName
			updateEase()
		})
	ease_f.addButtonGrid('', [
		[
			{
				text: 'In',
				active: () => activeEaseType === 'In',
				onClick: () => {
					activeEaseType = 'In'
					updateEase()
				},
			},
			{
				text: 'Out',
				active: () => activeEaseType === 'Out',
				onClick: () => {
					activeEaseType = 'Out'
					updateEase()
				},
			},
			{
				text: 'InOut',
				active: () => activeEaseType === 'InOut',
				onClick: () => {
					activeEaseType = 'InOut'
					updateEase()
				},
			},
		],
	])

	function updateEase() {
		const easeFn = sorted_eases.get(activeEaseName)?.[activeEaseType]?.fn
		if (!easeFn) throw new Error('Failed to find easing function')
		opts.easing = easeFn
		activeEaseFn = easeFn
	}

	// function setTween(v: Vec2) {
	// 	const easeFn = sorted_eases.get(activeEaseName)?.[activeEaseType]?.fn
	// 	tween.set(v, {
	// 		duration: duration_i.value,
	// 		delay: delay_i.value,
	// 		easing: easeFn ?? eases.linear,
	// 	})
	// }

	return { folder }
}
