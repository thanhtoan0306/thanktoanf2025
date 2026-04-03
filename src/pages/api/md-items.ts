import type { APIRoute } from 'astro';
import { readdir } from 'node:fs/promises';
import path from 'node:path';

export const GET: APIRoute = async () => {
	try {
		const mdDir = path.resolve(process.cwd(), 'md');
		const dirents = await readdir(mdDir, { withFileTypes: true });

		const items = dirents
			.filter((d) => !d.name.startsWith('.'))
			.map((d) => ({
				name: d.name,
				type: d.isDirectory() ? 'dir' : 'file',
			}))
			.sort((a, b) => a.name.localeCompare(b.name));

		return new Response(JSON.stringify({ count: items.length, items }), {
			headers: { 'Content-Type': 'application/json' },
		});
	} catch (err) {
		const message = err instanceof Error ? err.message : 'Unknown error';
		return new Response(
			JSON.stringify({ message: 'Failed to read md folder', error: message }),
			{ status: 500, headers: { 'Content-Type': 'application/json' } }
		);
	}
};

