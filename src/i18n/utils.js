import { translations } from './translations.js';

const DEFAULT_LANG = 'en';
const STORAGE_KEY = 'selectedLanguage';
const COOKIE_NAME = 'lang';

/**
 * Get current language from cookie (server-side) or localStorage (client-side) or default
 * @param {import('astro').APIContext | import('astro').AstroGlobal} astro - Astro context (optional)
 * @returns {string} Language code ('en', 'zh', 'vi')
 */
export function getCurrentLanguage(astro = null) {
	// Server-side: try to read from cookie (may not be available if prerendered)
	if (typeof window === 'undefined' && astro) {
		try {
			const cookieLang = astro.cookies.get(COOKIE_NAME)?.value;
			console.log('[i18n] Server-side - Cookie lang:', cookieLang);
			if (cookieLang && cookieLang in translations) {
				console.log('[i18n] Server-side - Using cookie lang:', cookieLang);
				return cookieLang;
			}
		} catch (e) {
			console.log('[i18n] Server-side - Cannot read cookies (prerendered page):', e.message);
		}
		console.log('[i18n] Server-side - Using default lang:', DEFAULT_LANG);
		return DEFAULT_LANG;
	}
	
	// Client-side: read from localStorage or cookie
	if (typeof window !== 'undefined') {
		// Try cookie first
		const cookieLang = document.cookie
			.split('; ')
			.find(row => row.startsWith('lang='))
			?.split('=')[1];
		
		if (cookieLang && cookieLang in translations) {
			console.log('[i18n] Client-side - Using cookie lang:', cookieLang);
			// Sync with localStorage
			if (localStorage.getItem(STORAGE_KEY) !== cookieLang) {
				localStorage.setItem(STORAGE_KEY, cookieLang);
			}
			return cookieLang;
		}
		
		// Fallback to localStorage
		const stored = localStorage.getItem(STORAGE_KEY);
		console.log('[i18n] Client-side - LocalStorage lang:', stored);
		if (stored && stored in translations) {
			console.log('[i18n] Client-side - Using localStorage lang:', stored);
			return stored;
		}
		console.log('[i18n] Client-side - Using default lang:', DEFAULT_LANG);
	}
	
	return DEFAULT_LANG;
}

/**
 * Get translations for current language
 * @param {string | null} [lang=null] - Language code ('en', 'zh', 'vi') or null to use current
 * @returns {object} Translations object for the language
 */
export function getTranslations(lang = null) {
	const currentLang = lang || getCurrentLanguage();
	return translations[currentLang] || translations[DEFAULT_LANG];
}

/**
 * Get a nested translation value by path (e.g., 'nav.home' or 'home.title')
 * @param {string} path - Translation key path (e.g., 'nav.home')
 * @param {string | null} [lang=null] - Language code ('en', 'zh', 'vi') or null to use current
 * @returns {any} Translation value
 */
export function t(path, lang = null) {
	const translations = getTranslations(lang);
	const keys = path.split('.');
	let value = translations;
	
	for (const key of keys) {
		if (value && typeof value === 'object' && key in value) {
			value = value[key];
		} else {
			console.warn(`Translation key "${path}" not found`);
			return path;
		}
	}
	
	return value;
}
