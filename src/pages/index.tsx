import { useEffect, useState } from "react";
import { collection, onSnapshot, CollectionReference } from "firebase/firestore";
import { Container, ProductContainer } from "@/styles/index.styles";
import { Nav } from "@/components/Nav";
import { Firestore } from "@/tools/firestore";
import { ProductCard } from "@/components/product.card";
import { searchProduct } from "@/tools/searchProduct";

export default function Home() {
	const [products, setProducts] = useState<product[]>([]);
	const [featured, setFeatured] = useState<product[]>([]);
	const [entryResult, setEntryResult] = useState<product[]>([]);
	const [entry, setEntry] = useState<string>("");
	const db = Firestore();

	useEffect(() => {
		const result = searchProduct(entry, products);

		setEntryResult(result);
	}, [entry, products]);

	useEffect(() => {
		if (products.length > 0) {
			setFeatured(products.filter((el) => el.featured));
		}
	}, [products]);

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
			<Nav setEntry={setEntry} />
			<Container>
				<ProductContainer>
					{entryResult.length > 0
						? entryResult.map((el, index) => (
								<ProductCard
									key={index}
									name={el.name}
									weight={el.weight}
									price={el.price}
									imagePath={el.imagePath}
								/>
						  ))
						: featured.map((el, index) => (
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
