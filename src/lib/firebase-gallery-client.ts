/**
 * Firebase Gallery — TEMPORARILY DISABLED (firebase not installed / dev unblock).
 * Re-enable: `npm install` then restore imports from git history.
 */

export type GalleryItem = {
	id: string;
	imageUrl: string;
	text: string;
	createdAtMs: number;
};

export type Unsubscribe = () => void;

export function isFirebaseConfigured(): boolean {
	return false;
}

export function subscribeGallery(
	_onData: (items: GalleryItem[]) => void,
	_onError: (e: Error) => void,
): Unsubscribe {
	return () => {};
}

export async function uploadGalleryImage(_file: File, _text: string): Promise<void> {
	throw new Error('Firebase gallery is temporarily disabled.');
}
