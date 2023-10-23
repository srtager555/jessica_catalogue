import { getDownloadURL, ref } from "firebase/storage";
import { Storage } from ".";

/**
 * A simple function to get image from the storage
 *
 * @param  {string} refPath the path from the firestore
 */
export async function getImage(refPath: string) {
	const storage = Storage();

	const imageRef = ref(storage, refPath);

	return await getDownloadURL(imageRef)
		.then((data) => data)
		.catch(() => undefined);
}
