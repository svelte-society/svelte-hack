export const device = new (class {
	breakpoint = 1000

	width = $state(globalThis.window?.innerWidth || 0)
	height = $state(globalThis.window?.innerHeight || 0)
	mobile = $state(globalThis.window?.innerWidth < this.breakpoint)
	scrollY = $state(globalThis.window?.scrollY || 0)

	constructor() {
		globalThis.removeEventListener?.('resize', this.onResize)
		globalThis.addEventListener?.('resize', this.onResize)

		globalThis.removeEventListener?.('scroll', this.onScroll)
		globalThis.addEventListener?.('scroll', this.onScroll)
	}

	onResize() {
		this.width = globalThis.window?.innerWidth || 0
		this.height = globalThis.window?.innerHeight || 0
		this.scrollY = globalThis.window?.scrollY || 0
	}

	onScroll() {
		this.scrollY = globalThis.window?.scrollY || 0
	}
})()
