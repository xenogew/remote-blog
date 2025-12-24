<script lang="ts">
	import "./layout.css";
	import favicon from "$lib/assets/favicon.svg";
	import { ModeWatcher } from "mode-watcher";
	import { authClient } from "$lib/auth-client";
	import { get_user } from "./user.remote";
	import { goto, onNavigate } from "$app/navigation";
	import { resolve } from "$app/paths";
	import { Button } from "$lib/components/ui/button";

	let { children } = $props();

	const user = $derived(await get_user());

	function logout(event: Event) {
		event.preventDefault();
		authClient.signOut({
			fetchOptions: {
				onSuccess: async () => {
					await get_user().refresh();
					goto(resolve("/auth/login"));
				},
			},
		});
	}

	onNavigate((navigate) => {
		if (!document.startViewTransition) {
			return;
		}

		return new Promise((resolve) => {
			document.startViewTransition(async () => {
				resolve();
				await navigate.complete;
			});
		});
	});
</script>

<ModeWatcher />

<svelte:head><link rel="icon" href={favicon} /></svelte:head>

<header></header>
<header
	class="flex h-(--header-height) shrink-0 items-center gap-2 border-b transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-(--header-height)"
>
	<div class="flex w-full items-center gap-1 px-4 lg:gap-2 lg:px-6">
		<h1 class="text-xl font-bold">
			<a href={resolve("/")}>Remote Blog</a>
		</h1>
		<div class="ms-auto flex items-center gap-2">
			{#if user.id}
				<Button
					onclick={logout}
					variant="ghost"
					size="sm"
					class="hidden cursor-pointer sm:flex dark:text-foreground"
					target="_blank"
					rel="noopener noreferrer"
				>
					Logout
				</Button>
			{/if}
		</div>
	</div>
</header>
<main class="mx-4 w-full max-w-md p-6">
	{@render children()}
</main>
