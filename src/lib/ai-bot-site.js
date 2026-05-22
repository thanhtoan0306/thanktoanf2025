/** Shared copy for the "About this website" quick tab in AI Bot chats. */

export const SITE_TAB_LABEL = 'About this website';
export const SITE_TAB_USER_MESSAGE = 'What is this website about?';

/** English description for AI Bot replies (always English, not SITE_DESCRIPTION). */
export const SITE_DESCRIPTION_EN =
	'A learning journal and place to share product-building experience for developers.';

/**
 * @param {{ title: string; author: string }} site
 */
export function buildSiteBotAnswer(site) {
	const { title, author } = site;
	return (
		`${title} is a personal developer site by ${author}. ` +
		`${SITE_DESCRIPTION_EN} ` +
		`You can browse the Blog for articles, try experiments in Playgrounds, explore Apps and tools, ` +
		`or read more on the About page. Use the shortcuts on the home page to jump in quickly.`
	);
}
