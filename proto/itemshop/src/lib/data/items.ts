import raw from './items.json';

export type ItemTier = 'Legendary' | 'Epic' | 'Rare' | 'Common';

export type Item = {
  id: string;
  name: string;
  price: number;
  iconSrc: string;
  tier: ItemTier;
  descriptionText: string;
  categories: string[];
  stats: Array<{ label: string; value: string }>;
};

type RawItem = {
  id: number;
  name: string;
  description?: string | null;
  categories?: string[];
  priceTotal?: number;
  from?: number[];
  isBoots?: boolean;
  stats?: Record<string, { flat: number; percent: number }>;
  iconPath?: string;
  patchChange?: string | null;
  search?: string;
};

function stripHtmlToText(html) {
  return String(html ?? '')
    .replace(/<br\s*\/?>/gi, '\n')
    .replace(/<[^>]*>/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

function toTitleCaseFromCamel(s) {
  return String(s)
    .replace(/([a-z0-9])([A-Z])/g, '$1 $2')
    .replace(/_/g, ' ')
    .replace(/\b\w/g, (c) => c.toUpperCase());
}

function inferTier(price) {
  if (price >= 3000) return 'Legendary';
  if (price >= 1600) return 'Epic';
  if (price >= 700) return 'Rare';
  return 'Common';
}

function formatStatValue(v) {
  const flat = Number(v?.flat ?? 0);
  const pct = Number(v?.percent ?? 0);
  if (pct && flat) return `+${flat} (+${pct}%)`;
  if (pct) return `+${pct}%`;
  if (flat) return `+${flat}`;
  return '+0';
}

function mapStats(statsObj) {
  if (!statsObj) return [];
  return Object.entries(statsObj).map(([k, v]) => ({
    label: toTitleCaseFromCamel(k),
    value: formatStatValue(v)
  }));
}

/** @type {Record<string, RawItem>} */
const RAW = raw;

export const ITEMS = Object.values(RAW)
  .map((it) => {
    const price = Number(it.priceTotal ?? 0);
    return {
      id: String(it.id),
      name: it.name,
      price,
      iconSrc: it.iconPath || '/items/placeholder.svg',
      tier: inferTier(price),
      descriptionText: stripHtmlToText(it.description),
      categories: it.categories ?? [],
      stats: mapStats(it.stats)
    };
  })
  .sort((a, b) => b.price - a.price || a.name.localeCompare(b.name));
