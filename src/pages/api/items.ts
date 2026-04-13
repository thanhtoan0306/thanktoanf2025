import type { APIRoute } from 'astro';

type Item = {
	id: string;
	text: string;
	createdAt: string; // ISO string
};

// In-memory store (resets when server restarts).
let items: Item[] = [];

export const GET: APIRoute = async () => {
	return new Response(JSON.stringify({ count: items.length, items }), {
		headers: { 'Content-Type': 'application/json; charset=utf-8' },
	});
};

export const POST: APIRoute = async ({ request }) => {
	let body: unknown;
	try {
		body = await request.json();
	} catch {
		return new Response(JSON.stringify({ message: 'Invalid JSON' }), {
			status: 400,
			headers: { 'Content-Type': 'application/json; charset=utf-8' },
		});
	}

	const obj = (body ?? {}) as Record<string, unknown>;
	const rawText = obj.text ?? obj.todoitem ?? obj.title;
	const text = typeof rawText === 'string' ? rawText.trim() : '';

	if (!text) {
		return new Response(JSON.stringify({ message: 'Missing field: text' }), {
			status: 400,
			headers: { 'Content-Type': 'application/json; charset=utf-8' },
		});
	}

	if (text.length > 500) {
		return new Response(JSON.stringify({ message: 'text too long (max 500 chars)' }), {
			status: 400,
			headers: { 'Content-Type': 'application/json; charset=utf-8' },
		});
	}

	const created: Item = {
		id: crypto.randomUUID(),
		text,
		createdAt: new Date().toISOString(),
	};

	items = [created, ...items].slice(0, 200);

	return new Response(JSON.stringify(created), {
		status: 201,
		headers: { 'Content-Type': 'application/json; charset=utf-8' },
	});
};

