import fs from 'node:fs/promises';
import path from 'node:path';

export type IdeaPageItem = {
	href: string;
	slug: string;
	title: string;
	description: string;
	icon: string;
	order: number;
};

function humanizeSlug(slug: string): string {
	return slug
		.split(/[-_]+/)
		.filter(Boolean)
		.map((w) => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase())
		.join(' ');
}

function parseFrontmatter(raw: string): { data: Record<string, string>; body: string } {
	const trimmed = raw.trimStart();
	if (!trimmed.startsWith('---\n')) {
		return { data: {}, body: raw };
	}
	const closeIdx = trimmed.indexOf('\n---\n', 4);
	if (closeIdx === -1) {
		return { data: {}, body: raw };
	}
	const yamlBlock = trimmed.slice(4, closeIdx);
	const body = trimmed.slice(closeIdx + 5);
	const data: Record<string, string> = {};
	for (const line of yamlBlock.split('\n')) {
		const m = line.match(/^([a-zA-Z0-9_-]+):\s*(.*)$/);
		if (!m) continue;
		let v = m[2].trim();
		if (
			(v.startsWith('"') && v.endsWith('"')) ||
			(v.startsWith("'") && v.endsWith("'"))
		) {
			v = v.slice(1, -1);
		}
		data[m[1]] = v;
	}
	return { data, body };
}

function cleanHeadingTitle(line: string): string {
	return line.replace(/\*+/g, '').replace(/\s+/g, ' ').trim();
}

function extractTitle(body: string, slug: string): string {
	const m = body.match(/^#\s+(.+)$/m);
	if (m) return cleanHeadingTitle(m[1]);
	return humanizeSlug(slug);
}

function stripInlineMd(s: string): string {
	return s
		.replace(/\*\*([^*]+)\*\*/g, '$1')
		.replace(/\*([^*]+)\*/g, '$1')
		.replace(/`([^`]+)`/g, '$1')
		.trim();
}

function extractDescription(body: string, maxLen = 180): string {
	let rest = body.trim();
	if (rest.startsWith('#')) {
		rest = rest.replace(/^#+\s*[^\n]*\n+/, '');
	}
	const firstBlock = rest.split(/\n\n+/)[0] ?? '';
	const line = stripInlineMd(firstBlock.replace(/\n/g, ' '));
	if (!line) return '';
	if (line.length <= maxLen) return line;
	return line.slice(0, maxLen - 1).trimEnd() + '…';
}

function parseOrder(value: string | undefined): number {
	if (value === undefined || value === '') return 1000;
	const n = Number(value);
	return Number.isFinite(n) ? n : 1000;
}

/**
 * Lists every `.md` file in `ideaDir` (except nothing—all `*.md` become routes).
 * Optional YAML frontmatter per file:
 * - `title`, `description`, `icon`, `order` (number, lower sorts first)
 */
export async function getIdeaPages(ideaDir: string): Promise<IdeaPageItem[]> {
	const entries = await fs.readdir(ideaDir, { withFileTypes: true });
	const mdNames = entries
		.filter((e) => e.isFile() && e.name.toLowerCase().endsWith('.md'))
		.map((e) => e.name)
		.sort();

	const items: IdeaPageItem[] = [];

	for (const name of mdNames) {
		const slug = name.replace(/\.md$/i, '');
		const filePath = path.join(ideaDir, name);
		const raw = await fs.readFile(filePath, 'utf-8');
		const { data, body } = parseFrontmatter(raw);

		const title = data.title?.trim() || extractTitle(body, slug);
		const description =
			data.description?.trim() || extractDescription(body);
		const icon = data.icon?.trim() || '📄';
		const order = parseOrder(data.order);

		items.push({
			href: `/idea/${slug}`,
			slug,
			title,
			description,
			icon,
			order,
		});
	}

	items.sort((a, b) => {
		if (a.order !== b.order) return a.order - b.order;
		return a.title.localeCompare(b.title, 'en');
	});

	return items;
}
