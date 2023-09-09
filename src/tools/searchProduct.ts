import { compareTwoStrings } from "string-similarity";

export function searchProduct(entry: string, products: product[]) {
	const result = products.filter((el) => {
		const rate = compareTwoStrings(entry.toLowerCase(), el.name.toLowerCase());

		if (rate > 0.1) return true;
		else false;
	});

	return result;
}
