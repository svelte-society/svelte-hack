<script>
	export let dur = '7s'
</script>

<div class="lineb">
	<svg width="100%" height="100%" viewBox="0 0 185 157" fill="none" xmlns="http://www.w3.org/2000/svg">
		<path
			d="M4.13818 156.057L2.78576 60.0487L61.1413 60.245L60.987 3.445L184.154 3.445"
			stroke="url(#line_b_gradient)"
			stroke-width="3"
		/>
		<defs>
			<radialGradient id="line_b_gradient" cx="250" cy="100" r="50" gradientUnits="userSpaceOnUse">
				<animate attributeName="cx" values="-50;100;250;250;250" {dur} repeatCount="indefinite" />
				<animate attributeName="cy" values="200;0;50;50;50" {dur} repeatCount="indefinite" />
				<animate attributeName="r" values="-50;200;0;0;0" {dur} repeatCount="indefinite" />
				<stop stop-color="#FF3E00" stop-opacity="0.5">
					<animate attributeName="stop-opacity" values="0.25;1;0.25;0.25;0.25" {dur} repeatCount="indefinite" />
				</stop>
				<stop offset="0.583333" stop-color="#FF3E00" stop-opacity="0" />
			</radialGradient>
		</defs>
	</svg>
</div>

<style>
	.lineb {
		width: var(--size, 185px);
		height: auto;
	}
</style>
