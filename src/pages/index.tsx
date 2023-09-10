import { useEffect, useState } from "react";
import { collection, onSnapshot, CollectionReference } from "firebase/firestore";
import { Container, ProductContainer } from "@/styles/index.styles";
import { Nav } from "@/components/Nav";
import { Firestore } from "@/tools/firestore";
import { ProductCard } from "@/components/product.card";
import { searchProduct } from "@/tools/searchProduct";
import { useGetProducts } from "@/hooks/useGetProducts";

export default function Home() {
	const [products, setProducts] = useState<product[]>([]);
	const [featured, setFeatured] = useState<product[]>([]);
	const [entryResult, setEntryResult] = useState<product[]>([]);
	const [entry, setEntry] = useState<string>("");
	const productsListener = useGetProducts();
	const db = Firestore();

	useEffect(() => {
		const result = searchProduct(entry, products);

		setEntryResult(result);
	}, [entry, products]);

	useEffect(() => {
		if (products.length > 0) {
			const featured = products.filter((el) => el.featured);

			if (featured.length < 10) {
				const sortedProducts = products.sort((a, b) => {
					if (a.name > b.name) {
						return 1;
					}
					if (a.name < b.name) {
						return -1;
					}
					// a must be equal to b
					return 0;
				});

				setFeatured([...featured, ...sortedProducts.slice(0, 10 - featured.length)]);
			} else {
				setFeatured(featured);
			}
		}
	}, [products]);

	useEffect(() => {
		setProducts(productsListener.data);
	}, [productsListener.data]);

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
