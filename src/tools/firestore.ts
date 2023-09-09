import { connectFirestoreEmulator, getFirestore } from "firebase/firestore";

export function Firestore() {
	const db = getFirestore();

	if (process.env.NODE_ENV === "development") {
		// @ts-ignore
		if (typeof window === "undefined" || !window._firestore) {
			connectFirestoreEmulator(db, "localhost", 8080);

			if (typeof window !== "undefined") {
				// @ts-ignore
				window._firestore = true;
			}
		}
	}

	return db;
}
