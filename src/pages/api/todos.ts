import type { APIRoute } from 'astro';

// Simple mock data so you can see API shape.
// You can replace everything in this file with real DB logic later.
const mockTodos = [
	{ id: '1', title: 'Sketch API contract for /todos', status: 'active' },
	{ id: '2', title: 'Test optimistic UI updates', status: 'active' },
	{ id: '3', title: 'Write docs for public todo API', status: 'completed' },
];

export const GET: APIRoute = async () => {
	return new Response(JSON.stringify({ items: mockTodos }), {
		headers: { 'Content-Type': 'application/json' },
	});
};

export const POST: APIRoute = async ({ request }) => {
	try {
		const body = await request.json();

		// Echo back data + fake id so you can see the contract.
		const created = {
			id: body?.id ?? crypto.randomUUID(),
			title: body?.title ?? '',
			status: body?.status ?? 'active',
		};

		return new Response(JSON.stringify(created), {
			status: 201,
			headers: { 'Content-Type': 'application/json' },
		});
	} catch {
		return new Response(JSON.stringify({ message: 'Invalid JSON' }), {
			status: 400,
			headers: { 'Content-Type': 'application/json' },
		});
	}
};

