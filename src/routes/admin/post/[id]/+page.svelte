<script lang="ts">
	import { page } from '$app/state';
	import { get_post_by_id, update_post } from '../../posts.remote';
	import * as Field from '$lib/components/ui/field';
	import { Input } from '$lib/components/ui/input';
	import { Textarea } from '$lib/components/ui/textarea';
	import { Button } from '$lib/components/ui/button';

	const post = await get_post_by_id(page.params.id as string);
</script>

<form {...update_post}>
	<Field.Group>
		<Field.Set>
			<Input {...update_post.fields.id.as('text')} hidden value={post?.id} />
			<Field.Field>
				<Field.Label for="title">Title</Field.Label>
				<Input {...update_post.fields.title.as('text')} value={post?.title} />
			</Field.Field>
			{#each update_post.fields.title.issues() as issue (issue.message)}
				<Field.Description>{issue.message}</Field.Description>
			{/each}
			<Field.Field>
				<Field.Label for="body">Content</Field.Label>
				<Textarea {...update_post.fields.body.as('text')} value={post?.body} />
			</Field.Field>
		</Field.Set>
	</Field.Group>
	<Button class="my-8" type="submit">Update Post</Button>
</form>
