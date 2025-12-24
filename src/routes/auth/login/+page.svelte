<script lang="ts">
	import { goto } from "$app/navigation";
	import { resolve } from "$app/paths";
	import { authClient } from "$lib/auth-client";
	import { get_user } from "../../user.remote";
	import { Input } from "$lib/components/ui/input";
	import { Button } from "$lib/components/ui/button";
	import * as Field from "$lib/components/ui/field";

	let error = $state<string>("");

	async function login(event: Event) {
		event.preventDefault();

		const form = event.target as HTMLFormElement;
		const email = form.email.value;
		const password = form.password.value;

		if (!email || !password) {
			error = "All fields are required";
			return;
		}
		await authClient.signIn.email(
			{
				email,
				password,
			},
			{
				onSuccess: async () => {
					get_user().refresh();
					goto(resolve("/"));
				},
			}
		);
	}
</script>

<div>
	<h1 class="text-4xl font-extrabold">Login</h1>
	<form onsubmit={login}>
		<Field.Set class="set">
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
				{#if error}
					<p class="text-destructive">{error}</p>
				{/if}
				<Button class="cursor-pointer" variant="secondary" type="submit">Login</Button>
			</Field.Group>
		</Field.Set>
	</form>
</div>

<p class="mt-8">
	Don't have an account? <a href={resolve("/auth/signup")}>Sign Up</a>
</p>
