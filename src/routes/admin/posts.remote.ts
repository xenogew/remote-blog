import { error } from "@sveltejs/kit";
import { form, getRequestEvent, query } from "$app/server";
import { db } from "$lib/server/db";
import { post } from "$lib/server/db/schema";
import * as v from "valibot";
import { auth } from "$lib/auth";
import { redirect } from "@sveltejs/kit";
import { eq } from "drizzle-orm";

export const get_all_posts = query(async () => db.query.post.findMany());

export const get_post_by_id = query(v.string(), async (id) =>
	db.query.post.findFirst({
		where: (post, { eq }) => eq(post.id, id),
	})
);

export const get_post_by_slug = query(v.string(), async (slug) =>
	db.query.post.findFirst({
		where: (post, { eq }) => eq(post.slug, slug),
	})
);

export const create_post = form(
	v.object({
		title: v.pipe(v.string(), v.nonEmpty("Title is required")),
		body: v.pipe(v.string(), v.nonEmpty("Body is required")),
	}),
	async ({ title, body }) => {
		const event = getRequestEvent();
		const session = await auth.api.getSession({
			headers: event.request.headers,
		});

		if (!session?.user?.id) {
			throw error(401, "Unauthorized");
		}

		const slug = title.toLocaleLowerCase().replace(/ /g, "-");
		await db.insert(post).values({
			title,
			slug,
			body,
			authorId: session.user.id,
		});

		redirect(303, "/admin");
	}
);

export const update_post = form(
	v.object({
		id: v.pipe(v.string(), v.nonEmpty("ID is required")),
		title: v.pipe(v.string(), v.nonEmpty("Title is required")),
		body: v.pipe(v.string(), v.nonEmpty("Body is required")),
	}),
	async ({ id, title, body }) => {
		const event = getRequestEvent();
		const session = await auth.api.getSession({
			headers: event.request.headers,
		});

		if (!session?.user?.id) {
			throw error(401, "Unauthorized");
		}

		const slug = title.toLocaleLowerCase().replace(/ /g, "-");
		await db
			.update(post)
			.set({
				title,
				slug,
				body,
				authorId: session.user.id,
			})
			.where(eq(post.id, id));

		redirect(303, "/admin");
	}
);
