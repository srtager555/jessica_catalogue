import { useEffect, useState } from "react";
import { collection, onSnapshot, CollectionReference } from "firebase/firestore";
import { Container, ProductContainer } from "@/styles/index.styles";
import { Nav } from "@/components/Nav";
import { Firestore } from "@/tools/firestore";
import { ProductCard } from "@/components/product.card";

export default function Home() {
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

	return (
		<>
			<Nav />
			<Container>
				<ProductContainer>
					{products.map((el, index) => (
						<ProductCard
							key={index}
							name={el.name}
							weight={el.weight}
							price={el.price}
							imagePath={el.imagePath}
						/>
					))}
				</ProductContainer>
			</Container>
		</>
	);
}
