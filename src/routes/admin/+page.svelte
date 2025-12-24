<script lang="ts">
	import { get_all_posts } from "./posts.remote";
	import { resolve } from "$app/paths";
	import { goto } from "$app/navigation";
	import { Button } from "$lib/components/ui/button";
	import Send from "@lucide/svelte/icons/send";

	let flyout = $state<boolean>(false);

	function handleClick() {
		flyout = true;
		setTimeout(() => {
			goto(resolve("/admin/post/new"));
		}, 500);
	}
</script>

<Button class="my-6 cursor-pointer" variant="secondary" onclick={handleClick}>
	Create Post
	<Send class={["mr-2", { flyout }]} />
</Button>

<ol>
	{#each await get_all_posts() as post (post.id)}
		<li class="text-xl hover:underline">
			<a href={resolve(`/admin/post/${post.id}`)}>{post.title}</a>
		</li>
	{/each}
</ol>

<style>
	.flyout {
		animation: flyout 0.5s ease-out forwards;
	}

	@keyframes flyout {
		from {
			transform: translate(0, 0);
			opacity: 1;
		}
		to {
			transform: translate(50px, -50px);
			opacity: 0;
		}
	}
</style>
