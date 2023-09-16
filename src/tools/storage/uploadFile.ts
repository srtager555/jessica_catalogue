import { UploadMetadata, ref, uploadBytes } from "firebase/storage";
import { Storage } from ".";

export async function uploadFile(path: string, file: File | Blob, metadata?: UploadMetadata) {
	try {
		const storage = Storage();

		const fileRef = ref(storage, path);

		return await uploadBytes(fileRef, file, metadata);
	} catch (error) {
		console.log(error);
	}
}
