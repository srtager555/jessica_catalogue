import { Firestore } from "@/tools/firestore";
import {
	collection,
	CollectionReference,
	DocumentData,
	onSnapshot,
	QueryDocumentSnapshot,
} from "firebase/firestore";
import { useEffect, useState } from "react";

export function useGetProducts() {
	const [products, setProducts] = useState<product[]>([]);
	const [snap, setSnap] = useState<QueryDocumentSnapshot<product, DocumentData>[]>([]);
	const db = Firestore();

	useEffect(() => {
		const collectionProducts = collection(db, "/products/") as CollectionReference<product>;

		const unsubcribe = onSnapshot(collectionProducts, (snap) => {
			setProducts([]);
			setSnap(snap.docs);

			snap.forEach((doc) => {
				setProducts((prev) => [...prev, doc.data()]);
			});
		});

		return () => {
			unsubcribe();
		};
	}, [db]);

	return { data: products, snap };
}
