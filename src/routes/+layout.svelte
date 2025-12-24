<script lang="ts">
	import './layout.css';
	import favicon from '$lib/assets/favicon.svg';
	import { ModeWatcher } from 'mode-watcher';
	import { authClient } from '$lib/auth-client';
	import { get_user } from './user.remote';
	import { goto } from '$app/navigation';
	import { resolve } from '$app/paths';
	import { Button } from '$lib/components/ui/button';

	let { children } = $props();

	const user = $derived(await get_user());

	function logout() {
		authClient.signOut({
			fetchOptions: {
				onSuccess: async () => {
					await get_user().refresh();
					goto(resolve('/auth/login'));
				}
			}
		});
	}
</script>

<ModeWatcher />

<svelte:head><link rel="icon" href={favicon} /></svelte:head>

<header>
	{#if user.id}
		<Button onclick={logout}>Logout</Button>
	{/if}
</header>
<main class="mx-4 w-full max-w-md p-6">
	{@render children()}
</main>
