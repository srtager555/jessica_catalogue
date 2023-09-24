import { DocumentData, QueryDocumentSnapshot } from "firebase/firestore";
import { compareTwoStrings, findBestMatch } from "string-similarity";

type p = QueryDocumentSnapshot<product, DocumentData>[];

export function searchProduct(entry: string, products: p) {
	if (entry === "") return undefined;
	else {
		const umbral = 0.17;
		const productsNames = products.map((el) => el.data().name);
		const byNameBestMatch = findBestMatch(entry, productsNames).ratings.sort(
			(a, b) => b.rating - a.rating
		);
		const byName: p = [];

		byNameBestMatch.forEach((element) => {
			const result = products.find(
				(el) => element.rating > umbral && el.data().name === element.target
			);

			if (result) byName.push(result);
		});

		// brands
		const productsBrands = products.map((el) => el.data().brand ?? "");
		const byBrandBestMatch = [
			findBestMatch(
				entry.toLowerCase(),
				productsBrands.map((el) => el.toLowerCase())
			).bestMatch,
		];
		const byBrand: p = [];

		byBrandBestMatch.forEach((element) => {
			const result = products.filter(
				(el) =>
					element.rating > umbral &&
					el.data().brand?.toLocaleLowerCase() === element.target.toLowerCase()
			);

			if (result)
				result.forEach((el) => {
					byBrand.push(el);
				});
		});

		// categories
		const productsCate = products.map((el) => el.data().category ?? "");
		const byCateBestMatch = [findBestMatch(entry, productsCate).bestMatch];
		const byCate: p = [];

		byCateBestMatch.forEach((element) => {
			const result = products.filter(
				(el) => element.rating > umbral && el.data().category === element.target
			);

			if (result)
				result.forEach((el) => {
					byCate.push(el);
				});
		});

		const bruteResults = [byCate, byName, byBrand].flat();
		const result = bruteResults.every((el) => typeof el === "undefined")
			? undefined
			: {
					byCate,
					byName,
					byBrand,
			  };

		console.log(result);

		return result;
	}
}
