import { DocumentData, QueryDocumentSnapshot } from "firebase/firestore";
import { compareTwoStrings } from "string-similarity";

export function searchProduct(
	entry: string,
	products: QueryDocumentSnapshot<product, DocumentData>[]
) {
	const result = products.filter((el) => {
		const rate = compareTwoStrings(entry.toLowerCase(), el.data().name.toLowerCase());

		if (rate > 0.1) return true;
		else false;
	});

	return result;
}
