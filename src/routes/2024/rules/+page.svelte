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

				<li>There can be only one submission per team, submitted by one member.</li>

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
					>. Any commits beyond this date must be made in a separate branch until winners
					are announced.
				</li>

				<li>
					If you're below the legal age in your country, you will need to obtain written
					permission from a parent or legal guardian to enter.
				</li>

				<li>You must be able to provide a link to your project on GitHub or GitLab.</li>

				<li>
					Projects must be licensed under an
					<a href="https://opensource.org/licenses">OSI approved Open Source license</a> displayed
					in a `LICENSE` file at the root of your repository.
				</li>
			</ul>

			<h1>Winners & Prizes</h1>

			<ul>
				<li>
					Each member of a winning team will be contacted individually, and receive an
					equal share of the prize. After one year of the winners being announced, any
					undistributed prize money will be returned to the Svelte Open Collective.
				</li>

				<li>
					You can optionally choose to donate your winnings to a project or charity of
					your choice, which we must approve.
				</li>

				<li>
					Any taxes or other fees are the responsibility of the winner, and will not be
					paid by us.
				</li>
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
					You can create, edit, or withdraw your submission at any time until the end of
					the hackathon, at which point it will lock automatically.
				</li>

				<li>
					We reserve the right to share any submissions online, including information you
					provide about your submission, in line with our <a href="/privacy"
						>privacy policy</a
					>.
				</li>

				<li>
					Svelte Society reserves the right to make adjustments to the rules in case of
					abuse.
				</li>

				<li>All decisions and rulings are final.</li>

				<li>
					While the use of generative AI tooling is not strictly prohibited, we'd
					encourage you to not rely on them. Please ensure that proper attribution is
					given to any contributions, and understand that you are fully responsible for
					any liabilities resulting from the use of these tools. If you decide to use AI
					tooling in your project, we require that it's only assisting you, not writing
					your submission for you.
				</li>
			</ul>
		</div>
	</div>

	<div class="br-md"></div>

	<p>
		If you have any questions, issues, or wish to revoke a submission after the hackathon
		closes, please send an email to <code>kev@sveltesociety.dev</code>.
	</p>

	<p>
		If you wish to be contacted at another email address, you can individually login to your
		SvelteHack account and set your contact preferences. Your email address will not be shared
		publicly. For more information please refer to our <a href="/privacy">privacy policy</a>.
	</p>

	<p>
		Winners will be contacted at their listed contact email within one week of being announced.
	</p>

	<p>Good luck!!</p>
</section>

<div class="br-xl"></div>

<style lang="scss">
	ul {
		display: flex;
		flex-direction: column;
		gap: 0.25rem;
		line-height: 1.4;
	}

	p {
		padding: 1rem;
	}
</style>
