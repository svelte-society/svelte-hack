<script lang="ts">
	import { data } from '$lib/years/2024/data'
</script>

<div class="br-md"></div>

<section>
	<div class="card-wrapper">
		<div class="card">
			<h1>Rules</h1>

			<ul>
				<li>Your project must use Svelte as its primary dependency!</li>
				<li>Team sizes must be between 1 and 3 members.</li>
				<li>
					Submissions must have a demonstration video or working demo included in their
					README. <br /><sup
						>excluding <a href="/2024/prizes#migration-magician">Migration Magicians</a
						></sup
					>
				</li>
				<li>
					Submissions must be new. Projects started before
					<code>{new Date(data.date.start).toDateString().slice(4)}</code> are not eligible.
				</li>
				<li>
					Submissions can't be updated after <code
						>{new Date(data.date.end).toDateString().slice(4)}</code
					>.
				</li>
				<li>
					If you're below the legal age in your country, you will need to obtain written
					permission from a parent or legal guardian to enter.
				</li>
				<li>You must be able to provide a link to your project on GitHub.</li>
				<li>Closed-source code is not permitted.</li>
				<li>One submission per person.</li>
			</ul>

			<h1>Who can't enter?</h1>

			<ul>
				<li>Svelte Society Organizers</li>
				<li>Svelte Ambassadors</li>
				<li>Svelte Sirens Organizers</li>
				<li>Svelte Org Members</li>
				<li>Family Members of above orgs</li>
			</ul>

			<h1>Etc</h1>

			<ul>
				<li>
					Sveltehack, Svelte Society, and Svelte Org are teams of volunteers who cannot be
					held liable for any reason, and reserve the right to disqualify any submission
					for any reason they see fit.
				</li>
				<li>
					To revoke a submission or ask a question, please contact kev@sveltesociety.dev
				</li>
				<li>
					Svelte Society reserves the right to make adjustments to the rules in case of
					abuse.
				</li>
				<li>All decisions and rulings are final.</li>
				<li>
					Any taxes or other fees are the responsibility of the winner, and will not be
					paid by us.
				</li>
			</ul>
		</div>
	</div>
</section>

<div class="br-xl"></div>

<style lang="scss">
	ul {
		display: flex;
		flex-direction: column;
		gap: 0.25rem;
		line-height: 1.4;
	}
</style>
