<script>
	export let dur = '6s'
</script>

<div class="linea">
	<svg width="100%" height="93" viewBox="0 0 288 93" fill="none" xmlns="http://www.w3.org/2000/svg">
		<path
			d="M287.337 89.6719L193.432 89.6719L194.555 31.7827L72.4918 30.6097L72.4918 2.78883L0.850555 2.78883"
			stroke="url(#line_a_gradient)"
			stroke-width="3"
		/>
		<defs>
			<radialGradient id="line_a_gradient" cx="250" cy="100" r="50" gradientUnits="userSpaceOnUse">
				<animate attributeName="cx" values="25;285;350;350" {dur} repeatCount="indefinite" />
				<animate attributeName="cy" values="0;130;130;130" {dur} repeatCount="indefinite" />
				<animate attributeName="r" values="0;300;0;0" {dur} repeatCount="indefinite" />
				<stop stop-color="#FF3E00" stop-opacity="0.5">
					<animate attributeName="stop-opacity" values="0.25;1;0.25;0.25" {dur} repeatCount="indefinite" />
				</stop>
				<stop offset="0.583333" stop-color="#FF3E00" stop-opacity="0" />
			</radialGradient>
		</defs>
	</svg>
</div>

<style>
	.linea {
		width: var(--size, 288px);
		height: auto;
	}
</style>
