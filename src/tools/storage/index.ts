import { connectStorageEmulator, getStorage } from "firebase/storage";

export function Storage() {
	const storage = getStorage();

	if (process.env.NODE_ENV === "development") {
		// @ts-ignore
		if (typeof window === "undefined" || !window._storage) {
			connectStorageEmulator(storage, "127.0.0.1", 9199);

			if (typeof window !== "undefined") {
				// @ts-ignore
				window._storage = true;
			}
		}
	}

	return storage;
}
