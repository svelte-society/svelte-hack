<script>
	export let dur = '6.5s'
</script>

<div class="linec">
	<svg width="100%" height="100%" viewBox="0 0 280 40" fill="none" xmlns="http://www.w3.org/2000/svg">
		<path d="M279.183 3.71316L176.616 3.40969L176.599 36.6073L0.765267 36.5761" stroke="url(#line_c_gradient)" stroke-width="2" />
		<defs>
			<radialGradient id="line_c_gradient" cx="250" cy="100" r="50" gradientUnits="userSpaceOnUse">
				<animate attributeName="cx" values="250;0;-200;-200" {dur} repeatCount="indefinite" />
				<animate attributeName="cy" values="0;10;130;130" {dur} repeatCount="indefinite" />
				<animate attributeName="r" values="0;300;0;0" {dur} repeatCount="indefinite" />
				<stop stop-color="#FF3E00" stop-opacity="0.5">
					<animate attributeName="stop-opacity" values="0.25;1;0.25;0.25" {dur} repeatCount="indefinite" />
				</stop>
				<stop offset="0.583333" stop-color="#FF4700" stop-opacity="0" />
			</radialGradient>
		</defs>
	</svg>
</div>

<style>
	.linec {
		width: var(--size, 280px);
		height: auto;
	}
</style>
