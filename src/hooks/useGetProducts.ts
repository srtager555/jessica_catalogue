import { Firestore } from "@/tools/firestore";
import { collection, CollectionReference, onSnapshot } from "firebase/firestore";
import { useEffect, useState } from "react";

export function useGetProducts() {
	const [products, setProducts] = useState<product[]>([]);
	const db = Firestore();

	useEffect(() => {
		const collectionProducts = collection(db, "/products/") as CollectionReference<product>;

		const unsubcribe = onSnapshot(collectionProducts, (snap) => {
			setProducts([]);

			snap.forEach((doc) => {
				setProducts((prev) => [...prev, doc.data()]);
			});
		});

		return () => {
			unsubcribe();
		};
	}, [db]);

	return products;
}
