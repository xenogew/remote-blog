<script lang="ts">
	import { goto } from '$app/navigation';
	import { resolve } from '$app/paths';
	import { authClient } from '$lib/auth-client';
	import { Input } from '$lib/components/ui/input';
	import { Button } from '$lib/components/ui/button';
	import * as Field from '$lib/components/ui/field';
	import { get_user } from '../../user.remote';

	let error = $state<string>('');

	async function signup(event: Event) {
		event.preventDefault();

		const form = event.target as HTMLFormElement;
		const email = form.email.value;
		const username = form.email.value;
		const password = form.password.value;
		const passwordConfirm = form.passwordConfirm.value;

		if (password !== passwordConfirm) {
			error = 'Passwords do not match';
			return;
		}

		if (!email || !password || !passwordConfirm) {
			error = 'All fields are required';
			return;
		}
		await authClient.signUp.email(
			{
				email,
				password,
				name: username
			},
			{
				onSuccess: async () => {
					// TODO: on success
					get_user().refresh();
					goto(resolve('/'));
				}
			}
		);
	}
</script>

<div>
	<h1 class="text-4xl font-extrabold">Sign Up</h1>
	<form onsubmit={signup}>
		<Field.Set>
			<Field.Group>
				<Field.Field>
					<Field.Label for="email">Email:</Field.Label>
					<Input id="email" name="email" type="email" placeholder="Enter your email" required />
					<Field.Description>Input your email address as it is used to log in.</Field.Description>
				</Field.Field>
				<Field.Field>
					<Field.Label for="password">Password:</Field.Label>
					<Input
						id="password"
						name="password"
						type="password"
						placeholder="Enter your password"
						required
					/>
				</Field.Field>
				<Field.Field>
					<Field.Label for="passwordConfirm">Confirm Password:</Field.Label>
					<Input
						id="passwordConfirm"
						name="passwordConfirm"
						type="password"
						placeholder="Confirm your password"
						required
					/>
				</Field.Field>
				{#if error}
					<p class="text-destructive">{error}</p>
				{/if}
				<Button class="cursor-pointer" variant="outline" type="submit">Sign Up</Button>
			</Field.Group>
		</Field.Set>
	</form>
</div>

<p class="mt-8">
	Already have account? <a href={resolve('/auth/login')}>Log In</a>
</p>
