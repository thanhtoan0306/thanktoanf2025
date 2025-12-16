/**
 * Client-side script to update translations after page load
 * This is needed because pages are prerendered with default language
 */

import { getCurrentLanguage, t } from '../i18n/utils.js';

export function updatePageTranslations() {
	const lang = getCurrentLanguage();
	console.log('[updateTranslations] Updating page with language:', lang);
	
	// Update HTML lang attribute
	document.documentElement.lang = lang;
	
	// Note: Most translations are already rendered server-side
	// This script is mainly for dynamic content or if we need client-side updates
	
	// You can add specific DOM updates here if needed
	// For example, updating elements with data-i18n attributes:
	document.querySelectorAll('[data-i18n]').forEach(el => {
		const key = el.getAttribute('data-i18n');
		if (key) {
			const translation = t(key, lang);
			if (translation) {
				el.textContent = translation;
			}
		}
	});
	
	console.log('[updateTranslations] Page translations updated');
}

// Auto-run on page load
if (typeof window !== 'undefined') {
	if (document.readyState === 'loading') {
		document.addEventListener('DOMContentLoaded', updatePageTranslations);
	} else {
		updatePageTranslations();
	}
}
