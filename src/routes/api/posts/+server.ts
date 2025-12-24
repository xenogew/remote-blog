import { json, type RequestHandler } from "@sveltejs/kit";
import { db } from "$lib/server/db";

export const GET: RequestHandler = async () => {
	const posts = await db.query.post.findMany();
	return json(posts);
};
