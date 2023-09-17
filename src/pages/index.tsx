import { useEffect, useState } from "react";
import {
	collection,
	onSnapshot,
	CollectionReference,
	QueryDocumentSnapshot,
	DocumentData,
} from "firebase/firestore";
import { Container, ProductContainer } from "@/styles/index.styles";
import { Nav } from "@/components/Nav";
import { Firestore } from "@/tools/firestore";
import { ProductCard } from "@/components/product.card";
import { searchProduct } from "@/tools/searchProduct";
import { useGetProducts } from "@/hooks/useGetProducts";
import { getImage } from "@/tools/storage/getImage";

type p = QueryDocumentSnapshot<product, DocumentData>[];

export default function Home() {
	const [products, setProducts] = useState<p>([]);
	const [featured, setFeatured] = useState<p>([]);
	const [entryResult, setEntryResult] = useState<p>([]);
	const [entry, setEntry] = useState<string>("");
	const productsListener = useGetProducts();
	const db = Firestore();

	useEffect(() => {
		const result = searchProduct(entry, products);

		setEntryResult(result);
	}, [entry, products]);

	useEffect(() => {
		if (products.length > 0) {
			const featured = products.filter((el) => el.data().featured);

			if (featured.length < 10) {
				const sortedProducts = products.sort((a, b) => {
					if (a.data().name > b.data().name) {
						return 1;
					}
					if (a.data().name < b.data().name) {
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
		setProducts(productsListener.snap);
	}, [productsListener.snap]);

	return (
		<>
			<Nav setEntry={setEntry} />
			<Container>
				<ProductContainer>
					{entryResult.length > 0
						? entryResult.map((el, index) => (
								<CardRender key={index} el={el} index={index} />
						  ))
						: featured.map((el, index) => (
								<CardRender key={index} el={el} index={index} />
						  ))}
				</ProductContainer>
			</Container>
		</>
	);
}

function CardRender({
	el,
	index,
}: {
	el: QueryDocumentSnapshot<product, DocumentData>;
	index: number;
}) {
	const [image, setImage] = useState<string>();
	const data = el.data();

	useEffect(() => {
		async function gImage() {
			setImage(await getImage(`products/${el.id}/product`));
		}

		gImage();
	}, [el.id]);

	return (
		<ProductCard
			key={index}
			name={data.name}
			weight={data.weight}
			price={data.price}
			brand={data.brand}
			imagePath={image}
		/>
	);
}
