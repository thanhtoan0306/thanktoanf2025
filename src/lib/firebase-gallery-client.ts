/**
 * Firebase Gallery — Cloud Storage (ảnh) + Firestore (URL + nội dung text).
 * Cấu hình Spark: đặt biến PUBLIC_FIREBASE_* trong .env (xem .env.example).
 * Trên Firebase Console: bật Storage + Firestore; chỉnh Security Rules cho phù hợp (demo thường mở read; write cần giới hạn khi public).
 */
import { initializeApp, type FirebaseApp } from 'firebase/app';
import { getAnalytics, isSupported } from 'firebase/analytics';
import {
	getFirestore,
	collection,
	addDoc,
	query,
	orderBy,
	limit,
	onSnapshot,
	serverTimestamp,
	type Unsubscribe,
} from 'firebase/firestore';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';

const COLLECTION = 'gallery_items';

export type GalleryItem = {
	id: string;
	imageUrl: string;
	text: string;
	createdAtMs: number;
};

function getConfig() {
	const env = import.meta.env;
	const base = {
		apiKey: env.PUBLIC_FIREBASE_API_KEY,
		authDomain: env.PUBLIC_FIREBASE_AUTH_DOMAIN,
		projectId: env.PUBLIC_FIREBASE_PROJECT_ID,
		storageBucket: env.PUBLIC_FIREBASE_STORAGE_BUCKET,
		messagingSenderId: env.PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
		appId: env.PUBLIC_FIREBASE_APP_ID,
	} as const;
	const mid = env.PUBLIC_FIREBASE_MEASUREMENT_ID;
	return mid ? { ...base, measurementId: mid } : { ...base };
}

export function isFirebaseConfigured(): boolean {
	const c = getConfig();
	return Boolean(
		c.apiKey && c.projectId && c.storageBucket && c.appId && c.authDomain && c.messagingSenderId,
	);
}

let app: FirebaseApp | null = null;

function getApp(): FirebaseApp {
	if (!isFirebaseConfigured()) {
		throw new Error('Firebase chưa cấu hình (thiếu biến PUBLIC_FIREBASE_*).');
	}
	if (!app) {
		const a = initializeApp(getConfig());
		app = a;
		if (typeof window !== 'undefined' && import.meta.env.PUBLIC_FIREBASE_MEASUREMENT_ID) {
			void isSupported()
				.then((ok) => {
					if (ok) getAnalytics(a);
				})
				.catch(() => {});
		}
	}
	return app;
}

export function subscribeGallery(
	onData: (items: GalleryItem[]) => void,
	onError: (e: Error) => void,
): Unsubscribe {
	const db = getFirestore(getApp());
	const q = query(collection(db, COLLECTION), orderBy('createdAt', 'desc'), limit(60));
	return onSnapshot(
		q,
		(snap) => {
			const items: GalleryItem[] = snap.docs.map((d) => {
				const data = d.data() as {
					imageUrl?: string;
					text?: string;
					createdAt?: { toMillis?: () => number };
				};
				const createdAtMs = data.createdAt?.toMillis?.() ?? 0;
				return {
					id: d.id,
					imageUrl: data.imageUrl ?? '',
					text: data.text ?? '',
					createdAtMs,
				};
			});
			onData(items);
		},
		(err) => onError(err instanceof Error ? err : new Error(String(err))),
	);
}

function sanitizeFileName(name: string): string {
	return name.replace(/[^a-zA-Z0-9._-]/g, '_').slice(0, 120) || 'image';
}

export async function uploadGalleryImage(file: File, text: string): Promise<void> {
	if (!file.type.startsWith('image/')) {
		throw new Error('Chỉ chấp nhận file ảnh.');
	}
	const storage = getStorage(getApp());
	const safeName = sanitizeFileName(file.name);
	const path = `gallery/${Date.now()}_${safeName}`;
	const storageRef = ref(storage, path);
	await uploadBytes(storageRef, file, { contentType: file.type || 'image/jpeg' });
	const imageUrl = await getDownloadURL(storageRef);

	const db = getFirestore(getApp());
	await addDoc(collection(db, COLLECTION), {
		imageUrl,
		text: text.trim(),
		storagePath: path,
		createdAt: serverTimestamp(),
	});
}
