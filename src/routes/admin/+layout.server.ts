import { redirect } from "@sveltejs/kit";

export async function load({ locals }) {
	if (locals.user?.role !== "admin") {
		console.log(`Are you not an admin? ${locals.user?.role !== "admin"}`);
		throw redirect(302, "/auth/login");
	}
	return {};
}
