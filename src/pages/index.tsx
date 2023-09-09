import { useEffect, useState } from "react";
import {
	getFirestore,
	collection,
	onSnapshot,
	DocumentData,
	CollectionReference,
} from "firebase/firestore";
import { Container } from "@/styles/index.styles";

export default function Home() {
	const [products, setProducts] = useState<product[]>([]);
	const db = getFirestore();

	useEffect(() => {
		const collectionProducts = collection(db, "/products/") as CollectionReference<product>;

		const unsubcribe = onSnapshot(collectionProducts, (snap) => {
			snap.forEach((doc) => {
				setProducts((prev) => [...prev, doc.data()]);
			});
		});

		return () => {
			unsubcribe();
		};
	}, [db]);

	return (
		<Container>
			{products.map((el) => (
				<>el.name</>
			))}
		</Container>
	);
}
