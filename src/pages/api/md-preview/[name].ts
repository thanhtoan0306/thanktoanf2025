import type { APIRoute } from 'astro';
import fs from 'node:fs/promises';
import path from 'node:path';

export async function getStaticPaths() {
	const mdDir = path.resolve(process.cwd(), 'md');
	const entries = await fs.readdir(mdDir, { withFileTypes: true });
	const names = entries
		.filter((e) => e.isFile() && e.name.toLowerCase().endsWith('.md'))
		.map((e) => e.name);

	return names.map((name) => ({ params: { name } }));
}

function isSafeMdName(name: string): boolean {
	return (
		/^[a-zA-Z0-9._-]+\.md$/.test(name) &&
		!name.includes('..') &&
		!name.includes('/') &&
		!name.includes('\\')
	);
}

export const GET: APIRoute = async ({ params }) => {
	const raw = params.name ?? '';
	const name = decodeURIComponent(raw).trim();

	if (!isSafeMdName(name)) {
		return new Response(JSON.stringify({ message: 'Invalid name', name }), {
			status: 400,
			headers: { 'Content-Type': 'application/json; charset=utf-8' },
		});
	}

	try {
		const mdDir = path.resolve(process.cwd(), 'md');
		const filePath = path.join(mdDir, name);
		const content = await fs.readFile(filePath, 'utf-8');
		return new Response(JSON.stringify({ name, content }), {
			headers: {
				'Content-Type': 'application/json; charset=utf-8',
				'Cache-Control': 'no-store',
			},
		});
	} catch (err) {
		const message = err instanceof Error ? err.message : 'Unknown error';
		return new Response(
			JSON.stringify({ message: 'Failed to read file', error: message }),
			{ status: 404, headers: { 'Content-Type': 'application/json; charset=utf-8' } }
		);
	}
};

