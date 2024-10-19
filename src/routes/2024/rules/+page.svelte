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

		<div class="card">
			<h1>Rules</h1>

			<ul>
				<li>A submission can be made by an individual, or a team of up to 3 people.</li>
				<li>
					Participants must adhere to the
					<a href="https://github.com/sveltejs/community/blob/main/CODE_OF_CONDUCT.md">
						Svelte Community Code of Conduct
					</a>
					at all times.
				</li>
				<li>
					SvelteHack organizers reserve the right to disqualify any submission for any
					reason.
				</li>
			</ul>

			<h2>Eligibility</h2>

			<p>
				If you're below 18 or the legal age of majority in your country, you'll need to
				obtain written permission from a parent or legal guardian. You will be asked for
				this if you win.
			</p>

			<p>
				After the hackathon ends, we'll assemble our crack panel of judges comprising of
				members from the Svelte org, Community Ambassadors, Svelte Sirens organizers, and
				the Svelte Society team to perform the tough task of deciding the winners. To make
				it fair, no one from the aformentioned orgs, or their immediate family are eligible
				to enter SvelteHack.
			</p>

			<h2>Your Submission</h2>

			<p>
				As we mentioned previously you can work on your submission solo, or with up to two
				other people. Your submission must be new, original work, and have been started on
				or after the start date of <code>October 19th 2024 at 12:00 AM UTC</code>, with no
				further changes after the end date <code>January 10th 2025 at 12:00 AM UTC</code>,
				until the winners have been announced. Feel free to work on your project in another
				branch, but there must be no changes in your main branch after this date. A change
				could include but is not limited to: code edits, demo changes, documentation edits,
				etc. You can only have **one** SvelteHack submission so we'd encourage you to spend
				some time thinking about the category you'd like to compete in, and whether you want
				to work on a team.
			</p>

			<p>
				Your team must pick one member to submit your project, who can then login to Svelte
				Hack, and use the submit form. You can create, edit, or withdraw your submission at
				any time until the end of the hackathon, at which point it will lock automatically.
				Optionally, any other member of your team is able to login to check on your team
				submission - they just can't edit it. Please make sure that the project submitter
				uses your <a
					href="https://docs.github.com/en/account-and-profile/setting-up-and-managing-your-personal-account-on-github/managing-email-preferences/changing-your-primary-email-address"
					>primary GitHub email address</a
				>
				in the form. If you wish to be contacted at another email address, you can individually
				login to your SvelteHack account and set your contact preferences. Your email address
				will not be shared publicly. For more information please refer to our
				<a href="/privacy">privacy policy</a>.
			</p>

			<p>
				The Svelte Team has been working hard on Svelte 5 for over a year now, woah! It only
				feels like yesterday that Twitter blew up about the runes reveal. To promote this
				exciting release, your project is required to use Svelte 5 as your primary
				dependency.
			</p>

			<p>
				SvelteHack is all about Open Source, it's what Svelte is built on, so your project
				must be hosted on GitHub or GitLab, and use an
				<a href="https://opensource.org/licenses">OSI approved Open Source license</a>. It's
				essential that your license is clearly displayed in a `LICENSE` file at the root of
				your repository. If your project is made from multiple components, please make sure
				they're all available in the same repository under your chosen license.
			</p>

			<p>
				Another important step in an any Open Source project is the README. Your README must
				include a guide on how to setup your project locally, a live demo or video of your
				project, and any attribution to resources or dependencies that you used. You might <em
					>(optionally)</em
				> want to spruce up your README with a fun logo, some GIFs, a rick roll or two - but
				that's the creative bit so we'll leave it up to you.
			</p>

			<p>
				Finally, please make sure your repository has a clean and consistent commit history.
				No submitting all your work at once before the deadline. We want to encourage steady
				and thoughtful progress, rather than rushing to complete it in a week.
			</p>

			<h2>Winners & Prizes</h2>

			<p>
				After SvelteHack ends on `January 10th 2025`, we will take time to judge all
				submissions and ultimately announce the winners online on `January 31st 2025`.
				Winners will be contacted at their listed contact email within one week of being
				announced. Each member of a winning team will be contacted individually, and receive
				an equal share of the prize. After one year of the winners being announced, any
				undistributed prize money will be returned to the Svelte Open Collective.
			</p>

			<p>
				Prize money will only be distributed via <a href="https://opencollective.com"
					>Open Collective</a
				>, and therefore you must be residing in a country they support in order to receive
				any prize money. You can optionally choose to donate your winnings to a project or
				charity of your choice, which we must approve. This is what we'd recommend if you're
				unable to receive any prize money.
			</p>

			<p>
				You are solely responsible for paying any taxes or fees required when receiving
				prize money.
			</p>

			<h2>Etc</h2>

			<p>
				The SvelteHack team is a comprised of volunteers from our community, Svelte Society,
				and the Svelte Org. We cannot be held liable for any reason, and while we commit to
				always act fairly and judiciously, we reserve the right to make the final decision
				on any SvelteHack matter. This includes but is not limited to: changes to the rules,
				eligibility & disqualification, the winners. Any decision we make is final.
			</p>

			<p>
				It is your responsibility to ensure your contact information is correct, and has
				been submitted correctly on the form. You can login at any time to change your
				contact preferences, even after the hackathon ends.
			</p>

			<p>
				Submissions will be considered as open source work and governed by the specified
				open source license, which will be clearly stated in the submissions repository. We
				reserve the right to share any submissions online, including information you provide
				about your submission, in line with our <a href="/privacy">privacy policy</a>.
			</p>

			<p>
				While the use of generative AI tooling is not strictly prohibited, we'd encourage
				you to not rely on them. Please ensure that proper attribution is given to any
				contributions, and understand that you are fully responsible for any liabilities
				resulting from the use of these tools. If you decide to use AI tooling in your
				project, we require that it's only assisting you, not writing your submission for
				you.
			</p>

			<p>
				Please email <code>kev@sveltesociety.dev</code> if you have any questions, issues, or
				wish to revoke a submission after the hackathon closes.
			</p>
			<!-- </ul> -->
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
