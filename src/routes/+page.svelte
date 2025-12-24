<script>
	import { goto } from "$app/navigation";
	import { resolve } from "$app/paths";
	import { get_all_posts } from "./admin/posts.remote";
	import * as Table from "$lib/components/ui/table";
</script>

<div class="list"></div>

<Table.Root>
	<Table.Header>
		<Table.Row>
			<Table.Head class="w-25 cursor-default text-3xl font-extrabold">Our Blog Post</Table.Head>
		</Table.Row>
	</Table.Header>
	<Table.Body>
		{#each await get_all_posts() as post (post.title)}
			<Table.Row class="cursor-pointer hover:bg-gray-500">
				<Table.Cell class="font-medium" onclick={() => goto(resolve(`/post/${post.slug}`))}>
					<h2 style:view-transition-name={`heading-${post.slug}`}>
						{post.title}
					</h2>
				</Table.Cell>
			</Table.Row>
		{/each}
	</Table.Body>
</Table.Root>
