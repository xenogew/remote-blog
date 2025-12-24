<script lang="ts">
	import { create_post } from "../../posts.remote";
	import * as Field from "$lib/components/ui/field";
	import { Input } from "$lib/components/ui/input";
	import { Textarea } from "$lib/components/ui/textarea";
	import { Button } from "$lib/components/ui/button";
</script>

<form {...create_post}>
	<Field.Group>
		<Field.Set>
			<Field.Field>
				<Field.Label for="title">Title</Field.Label>
				<Input {...create_post.fields.title.as("text")} />
			</Field.Field>
			{#each create_post.fields.title.issues() as issue (issue.message)}
				<Field.Description>{issue.message}</Field.Description>
			{/each}
			<Field.Field>
				<Field.Label for="body">Content</Field.Label>
				<Textarea {...create_post.fields.body.as("text")} />
			</Field.Field>
		</Field.Set>
	</Field.Group>
	<Button class="my-8" type="submit">Create Post</Button>
</form>
