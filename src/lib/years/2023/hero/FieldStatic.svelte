<script>
	import { fieldStaticPath } from './paths'
</script>

<div class="field-static">
	<svg
		width="100%"
		height="100%"
		viewBox="-5 20 352 369"
		fill="none"
		xmlns="http://www.w3.org/2000/svg"
	>
		<path
			fill-rule="evenodd"
			clip-rule="evenodd"
			d={fieldStaticPath}
			fill="url(#field_static_gradient)"
		/>
		<defs>
			<radialGradient
				id="field_static_gradient"
				cx="0"
				cy="0"
				r="1"
				gradientUnits="userSpaceOnUse"
				gradientTransform="translate(167.067 201.462) rotate(120.008) scale(235.477 176.638)"
			>
				<stop stop-color="#FF3E00" stop-opacity="0.4" />
				<stop offset="1" stop-color="#FF3E00" stop-opacity="0" />
			</radialGradient>
		</defs>
	</svg>
</div>

<style>
	.field-static {
		width: var(--size, 352px);
		max-width: 100%;
		height: auto;
		backface-visibility: hidden;
		contain: none;
	}
</style>
