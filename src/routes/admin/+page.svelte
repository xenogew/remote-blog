<script lang="ts">
	import { get_all_posts } from './posts.remote';
	console.log('Admin layout loaded');
</script>

<ol>
	{#each await get_all_posts() as post (post.id)}
		<li>
			{post.title} - {post.body}
		</li>
	{/each}
</ol>
