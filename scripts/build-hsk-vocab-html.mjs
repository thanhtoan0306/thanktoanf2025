/**
 * Regenerates public/apps/hsk1-vocab.html with HSK 1 (hand-curated VI+emoji) + HSK 2/3
 * from scripts/data/hsk-old-*-exclusive.json (MIT: drkameleon/complete-hsk-vocabulary).
 *
 * Short English (first popular sense) + Vietnamese: VI for HSK2/3 via MyMemory API,
 * cached in scripts/data/en-vi-cache.json (run build with network to refresh missing keys).
 */
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, '..');

const CACHE_PATH = path.join(root, 'scripts/data/en-vi-cache.json');
const TRANSLATE_DELAY_MS = 85;

const EMOJI_POOL = [
	'📌', '📚', '🎯', '✨', '🔹', '🌿', '🎵', '🍀', '⭐', '💠', '🍂', '🌸', '🌟', '📎', '🔖', '🏷️', '💡', '📝', '🎨', '🧩',
];

function pickEmoji(hanzi) {
	let h = 0;
	for (let i = 0; i < hanzi.length; i++) h = (h * 31 + hanzi.charCodeAt(i)) >>> 0;
	return EMOJI_POOL[h % EMOJI_POOL.length];
}

/** One short gloss: first segment before ; or /, trimmed, length-capped. */
function shortGloss(str, maxLen = 72) {
	if (!str || typeof str !== 'string') return '';
	let s = str
		.split(';')[0]
		.split('/')[0]
		.replace(/\s+/g, ' ')
		.trim();
	if (/^\(modal particle/i.test(s)) s = 'modal particle';
	if (s.length > maxLen) s = s.slice(0, maxLen - 1) + '…';
	return s;
}

function isLowValueSense(m) {
	const s = m.trim();
	if (/^surname /i.test(s) || /^\.\.\./.test(s) || /^abbr\./i.test(s)) return true;
	if (/euphemistic|vulgar|屄/i.test(s)) return true;
	if (/^(Belgium|Belgian|Netherlands|Thailand|Norway|Sweden)$/i.test(s)) return true;
	return false;
}

function loadEnViCache() {
	try {
		const raw = fs.readFileSync(CACHE_PATH, 'utf8');
		return JSON.parse(raw);
	} catch {
		return {};
	}
}

function saveEnViCache(cache) {
	fs.writeFileSync(CACHE_PATH, JSON.stringify(cache, null, '\t'), 'utf8');
}

function cleanViGloss(s) {
	return s.replace(/\s+/g, ' ').replace(/\.$/, '').trim();
}

function collectAllMeaningsFlat(e) {
	const out = [];
	for (const f of e.forms || []) {
		for (const m of f.meanings || []) {
			const t = m.trim();
			if (t) out.push(t);
		}
	}
	return out;
}

/**
 * One short English gloss: (1) modal/particle anywhere (e.g. 吧),
 * (2) else first pronunciation block with a non-surname sense, shortest gloss (e.g. 白 → white).
 */
function pickBestEnglishGloss(e) {
	const all = collectAllMeaningsFlat(e);
	if (!all.length) return '—';

	const modal = all.find((m) => /\bparticle\b|modal/i.test(m));
	if (modal) return shortGloss(modal.split(';')[0], 56);

	for (const f of e.forms || []) {
		const line = (f.meanings || []).map((m) => m.trim()).filter(Boolean);
		const good = line.filter((m) => !/^surname /i.test(m) && !/^\.\.\./.test(m) && !isLowValueSense(m));
		if (!good.length) continue;
		good.sort((a, b) => a.length - b.length);
		let pick = good[0];
		if (pick.length < 5 && good.length > 1) pick = good.find((m) => m.length >= 5) || pick;
		return shortGloss(pick.split(';')[0], 56);
	}

	const fallback = all.filter((m) => !/^\.\.\./.test(m));
	return shortGloss((fallback[0] || '—').split(';')[0], 56);
}

function compactEntry(e) {
	const hanzi = e.simplified;
	const en = pickBestEnglishGloss(e);
	const form0 = e.forms?.[0];
	const pinyin = form0?.transcriptions?.pinyin || '';
	return {
		hanzi,
		pinyin,
		en,
		vi: '',
		emoji: pickEmoji(hanzi),
	};
}

async function translateUniqueEnToVi(uniqueEnSet, cache) {
	const list = [...uniqueEnSet].sort();
	let n = 0;
	for (const en of list) {
		if (!en || en === '—') continue;
		if (cache[en]) continue;
		await new Promise((r) => setTimeout(r, TRANSLATE_DELAY_MS));
		const url = `https://api.mymemory.translated.net/get?q=${encodeURIComponent(en)}&langpair=en|vi`;
		try {
			const ac = new AbortController();
			const to = setTimeout(() => ac.abort(), 15000);
			const res = await fetch(url, { signal: ac.signal });
			clearTimeout(to);
			const data = await res.json();
			let vi = data.responseData?.translatedText?.trim() || '';
			if (!vi || data.responseStatus === 403 || data.responseStatus === 429) {
				vi = `(${en})`;
			} else {
				vi = cleanViGloss(vi);
			}
			cache[en] = vi;
		} catch {
			cache[en] = `(${en})`;
		}
		n++;
		if (n % 25 === 0) saveEnViCache(cache);
	}
	saveEnViCache(cache);
}

function applyViFromCache(rows, cache) {
	for (const row of rows) {
		if (row.vi) continue;
		row.vi = cache[row.en] ? shortGloss(cache[row.en], 90) : shortGloss(row.en, 90);
	}
}

function shortenHsk1(row) {
	return {
		...row,
		en: shortGloss(row.en, 80),
		vi: shortGloss(row.vi, 90),
	};
}

function buildHtml({ vocab1, vocab2, vocab3 }) {
	const j1 = JSON.stringify(vocab1);
	const j2 = JSON.stringify(vocab2);
	const j3 = JSON.stringify(vocab3);

	return `<!DOCTYPE html>
<html lang="vi">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>HSK 1–3 — từ vựng</title>
  <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
  <style>
    :root {
      --bg: #faf8f5;
      --card: #fff;
      --text: #1a1a1a;
      --muted: #5c5c5c;
      --accent: #c45c26;
      --accent-soft: rgba(196, 92, 38, 0.12);
      --border: #e8e4dc;
      --vi: #2d5a3d;
      --font-han: "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", "Noto Sans SC", sans-serif;
      --font-sans: system-ui, -apple-system, "Segoe UI", Roboto, "Noto Sans", sans-serif;
    }
    * { box-sizing: border-box; }
    .visually-hidden {
      position: absolute;
      width: 1px;
      height: 1px;
      padding: 0;
      margin: -1px;
      overflow: hidden;
      clip: rect(0, 0, 0, 0);
      white-space: nowrap;
      border: 0;
    }
    body {
      margin: 0;
      min-height: 100vh;
      font-family: var(--font-sans);
      background: var(--bg);
      color: var(--text);
      line-height: 1.5;
    }
    .wrap {
      max-width: 960px;
      margin: 0 auto;
      padding: 1.5rem 1.25rem 3rem;
    }
    .page-title-row {
      display: flex;
      align-items: flex-start;
      gap: 1rem;
      margin-bottom: 0.5rem;
    }
    .page-icon {
      flex-shrink: 0;
      width: 56px;
      height: 56px;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 1.75rem;
      font-family: var(--font-han);
      background: var(--accent-soft);
      border: 1px solid var(--border);
      border-radius: 0.75rem;
      line-height: 1;
    }
    header {
      margin-bottom: 1rem;
    }
    header h1 {
      margin: 0 0 0.35rem 0;
      font-size: 1.75rem;
      font-weight: 700;
      letter-spacing: -0.02em;
    }
    header p {
      margin: 0;
      color: var(--muted);
      font-size: 0.95rem;
    }
    .tabs {
      display: flex;
      flex-wrap: wrap;
      gap: 0.35rem;
      margin-bottom: 1rem;
    }
    .tabs button {
      font: inherit;
      cursor: pointer;
      padding: 0.45rem 0.9rem;
      border-radius: 999px;
      border: 1px solid var(--border);
      background: var(--card);
      color: var(--text);
      transition: background 0.15s ease, border-color 0.15s ease, color 0.15s ease;
    }
    .tabs button:hover {
      border-color: rgba(196, 92, 38, 0.45);
    }
    .tabs button[aria-selected="true"] {
      background: var(--accent-soft);
      border-color: var(--accent);
      color: var(--accent);
      font-weight: 600;
    }
    .toolbar {
      display: flex;
      flex-wrap: wrap;
      gap: 0.75rem;
      align-items: center;
      margin-bottom: 1.25rem;
    }
    .toolbar label {
      flex: 1;
      min-width: 200px;
    }
    .toolbar input[type="search"] {
      width: 100%;
      padding: 0.65rem 0.85rem;
      border: 1px solid var(--border);
      border-radius: 0.5rem;
      font-size: 1rem;
      background: var(--card);
      font-family: inherit;
    }
    .toolbar input[type="search"]:focus {
      outline: 2px solid var(--accent-soft);
      border-color: var(--accent);
    }
    .count {
      font-size: 0.875rem;
      color: var(--muted);
      white-space: nowrap;
    }
    .grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
      gap: 0.75rem;
    }
    .card {
      background: var(--card);
      border: 1px solid var(--border);
      border-radius: 0.6rem;
      padding: 0.85rem 1rem;
      transition: border-color 0.15s ease, box-shadow 0.15s ease;
    }
    .card:hover {
      border-color: rgba(196, 92, 38, 0.35);
      box-shadow: 0 2px 10px rgba(0,0,0,0.06);
    }
    .card-row {
      display: flex;
      gap: 0.75rem;
      align-items: flex-start;
    }
    .emoji {
      flex-shrink: 0;
      width: 2.5rem;
      height: 2.5rem;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 1.65rem;
      line-height: 1;
      background: var(--accent-soft);
      border-radius: 0.5rem;
    }
    .card-main {
      flex: 1;
      min-width: 0;
    }
    .hanzi {
      font-family: var(--font-han);
      font-size: 1.45rem;
      font-weight: 600;
      margin: 0 0 0.2rem 0;
      line-height: 1.3;
    }
    .pinyin {
      margin: 0;
      font-size: 0.9rem;
      color: var(--accent);
      font-weight: 500;
    }
    .en {
      margin: 0.35rem 0 0 0;
      font-size: 0.85rem;
      color: var(--muted);
    }
    .vi {
      margin: 0.25rem 0 0 0;
      font-size: 0.88rem;
      color: var(--vi);
      font-weight: 500;
    }
    .vi:empty {
      display: none;
    }
    footer {
      margin-top: 2rem;
      padding-top: 1rem;
      border-top: 1px solid var(--border);
      font-size: 0.8rem;
      color: var(--muted);
      text-align: center;
    }
    a.back {
      display: inline-block;
      margin-bottom: 1rem;
      color: var(--accent);
      text-decoration: none;
      font-size: 0.9rem;
    }
    a.back:hover { text-decoration: underline; }
  </style>
</head>
<body>
  <div class="wrap">
    <a class="back" href="/apps/">← Apps</a>
    <header>
      <div class="page-title-row">
        <div class="page-icon" role="img" aria-label="HSK">漢</div>
        <div>
          <h1>HSK 1–3 — từ vựng</h1>
          <p>Mỗi mục: một nghĩa English ngắn + tiếng Việt. HSK 2.0 (old), từ loại trừ theo cấp. Gõ để lọc.</p>
        </div>
      </div>
    </header>
    <div class="tabs" role="tablist" aria-label="Cấp HSK">
      <button type="button" role="tab" id="tab-1" aria-selected="true" aria-controls="panel-vocab" data-level="1">HSK 1</button>
      <button type="button" role="tab" id="tab-2" aria-selected="false" aria-controls="panel-vocab" data-level="2">HSK 2</button>
      <button type="button" role="tab" id="tab-3" aria-selected="false" aria-controls="panel-vocab" data-level="3">HSK 3</button>
    </div>
    <div class="toolbar">
      <label>
        <span class="visually-hidden">Tìm kiếm</span>
        <input type="search" id="q" placeholder="Tìm: 汉字, pinyin, English…" autocomplete="off" spellcheck="false" />
      </label>
      <span class="count" id="meta"></span>
    </div>
    <div class="grid" id="panel-vocab" role="tabpanel" aria-labelledby="tab-1" aria-live="polite"></div>
    <footer>Từ vựng HSK 2.0 (old) · Nguồn từ điển: drkameleon/complete-hsk-vocabulary (MIT)</footer>
  </div>
  <script>
    const VOCAB_1 = ${j1};
    const VOCAB_2 = ${j2};
    const VOCAB_3 = ${j3};
    const LEVELS = { 1: VOCAB_1, 2: VOCAB_2, 3: VOCAB_3 };

    const grid = document.getElementById('panel-vocab');
    const q = document.getElementById('q');
    const meta = document.getElementById('meta');
    const tabButtons = document.querySelectorAll('.tabs button');

    let activeLevel = 1;

    function currentVocab() {
      return LEVELS[activeLevel] || VOCAB_1;
    }

    function norm(s) {
      return (s || '').toLowerCase().normalize('NFD').replace(/[\\u0300-\\u036f]/g, '');
    }

    function render(filter) {
      const f = norm(filter.trim());
      const list = currentVocab();
      let n = 0;
      grid.innerHTML = '';
      for (const row of list) {
        const hay = norm(
          row.hanzi + ' ' + row.pinyin + ' ' + row.en + ' ' + (row.vi || '') + ' ' + (row.emoji || '')
        );
        if (f && !hay.includes(f)) continue;
        n++;
        const el = document.createElement('article');
        el.className = 'card';
        el.innerHTML =
          '<div class="card-row">' +
          '<div class="emoji" aria-hidden="true"></div>' +
          '<div class="card-main">' +
          '<p class="hanzi"></p><p class="pinyin"></p><p class="vi"></p><p class="en"></p>' +
          '</div></div>';
        el.querySelector('.emoji').textContent = row.emoji || '📌';
        el.querySelector('.hanzi').textContent = row.hanzi;
        el.querySelector('.pinyin').textContent = row.pinyin;
        const viEl = el.querySelector('.vi');
        viEl.textContent = row.vi || '';
        if (!row.vi) viEl.remove();
        el.querySelector('.en').textContent = row.en;
        grid.appendChild(el);
      }
      meta.textContent = n + ' / ' + list.length + ' mục · HSK ' + activeLevel;
    }

    tabButtons.forEach(function (btn) {
      btn.addEventListener('click', function () {
        const lv = parseInt(btn.getAttribute('data-level'), 10);
        if (lv === activeLevel) return;
        activeLevel = lv;
        tabButtons.forEach(function (b) {
          b.setAttribute('aria-selected', b === btn ? 'true' : 'false');
        });
        grid.setAttribute('aria-labelledby', btn.id);
        render(q.value);
      });
    });

    q.addEventListener('input', function () {
      render(q.value);
    });
    render('');
  </script>
</body>
</html>
`;
}

const htmlPath = path.join(root, 'public/apps/hsk1-vocab.html');

async function main() {
	const vocab1 = JSON.parse(fs.readFileSync(path.join(root, 'scripts/data/hsk1-curated.json'), 'utf8')).map(shortenHsk1);

	const raw2 = JSON.parse(fs.readFileSync(path.join(root, 'scripts/data/hsk-old-2-exclusive.json'), 'utf8'));
	const raw3 = JSON.parse(fs.readFileSync(path.join(root, 'scripts/data/hsk-old-3-exclusive.json'), 'utf8'));
	const vocab2 = raw2.map(compactEntry);
	const vocab3 = raw3.map(compactEntry);

	const cache = loadEnViCache();
	const uniqueEn = new Set();
	for (const r of vocab2) uniqueEn.add(r.en);
	for (const r of vocab3) uniqueEn.add(r.en);

	const missing = [...uniqueEn].filter((en) => en && en !== '—' && !cache[en]);
	if (missing.length) {
		console.log('Translating', missing.length, 'unique English glosses to Vietnamese (cached in en-vi-cache.json)…');
		await translateUniqueEnToVi(uniqueEn, cache);
	}

	applyViFromCache(vocab2, cache);
	applyViFromCache(vocab3, cache);

	const out = buildHtml({ vocab1, vocab2, vocab3 });
	fs.writeFileSync(htmlPath, out, 'utf8');
	console.log('Wrote', htmlPath, {
		hsk1: vocab1.length,
		hsk2: vocab2.length,
		hsk3: vocab3.length,
		cacheKeys: Object.keys(cache).length,
	});
}

await main();
