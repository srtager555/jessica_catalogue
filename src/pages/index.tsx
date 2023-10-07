import { CSSProperties, useEffect, useState } from "react";
import { QueryDocumentSnapshot, DocumentData } from "firebase/firestore";
import { Container, ProductContainer, Title, TitleH3 } from "@/styles/index.styles";
import { Nav } from "@/components/Nav";
import { Firestore } from "@/tools/firestore";
import { ProductCard } from "@/components/product.card";
import { searchProduct } from "@/tools/searchProduct";
import { useGetProducts } from "@/hooks/useGetProducts";
import { getImage } from "@/tools/storage/getImage";

type p = QueryDocumentSnapshot<product, DocumentData>[];

const titleStyles: CSSProperties = {
	marginTop: "40px",
	textAlign: "center",
};

export default function Home() {
	const [products, setProducts] = useState<p>([]);
	const [featured, setFeatured] = useState<p>([]);
	const [entryResult, setEntryResult] = useState<{ byName: p; byBrand: p; byCate: p }>();
	const [entry, setEntry] = useState<string>("");
	const productsListener = useGetProducts();

	useEffect(() => {
		const result = searchProduct(entry, products);

		setEntryResult(result);
	}, [entry, products]);

	useEffect(() => {
		if (products.length > 0) {
			const featured = products.filter((el) => el.data().featured);

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

			const sortedFeatured = featured.sort((prev, next) => {
				if (prev.data().name > next.data().name) {
					return 1;
				}
				if (prev.data().name < next.data().name) {
					return -1;
				}
				// a must be equal to b
				return 0;
			});

			if (featured.length < 10)
				setFeatured([...sortedFeatured, ...sortedProducts.slice(0, 10 - featured.length)]);
			else setFeatured(sortedFeatured);
		}
	}, [products]);

	useEffect(() => {
		setProducts(productsListener.snap);
	}, [productsListener.snap]);

	return (
		<>
			<Nav setEntry={setEntry} />
			<Container>
				{entryResult && Object.keys(entryResult).length > 0 ? (
					<div>
						{entryResult.byName.length > 0 && (
							<>
								<Title style={titleStyles}>coincidencias en los nombre</Title>
								<ProductContainer>
									{entryResult.byName.map((el, index) => (
										<CardRender key={index} el={el} index={index} />
									))}
								</ProductContainer>
							</>
						)}
						{entryResult.byCate.length > 0 && (
							<>
								<Title style={titleStyles}>coincidencias en las categorias</Title>
								<ProductContainer>
									{entryResult.byCate.map((el, index) => (
										<CardRender key={index} el={el} index={index} />
									))}
								</ProductContainer>
							</>
						)}
						{entryResult.byBrand.length > 0 && (
							<>
								<Title style={titleStyles}>coincidencias en las marcas</Title>
								<ProductContainer>
									{entryResult.byBrand.map((el, index) => (
										<CardRender key={index} el={el} index={index} />
									))}
								</ProductContainer>
							</>
						)}
					</div>
				) : (
					<ProductContainer>
						{featured.map((el, index) => (
							<CardRender key={index} el={el} index={index} />
						))}
					</ProductContainer>
				)}
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
			setImage(await getImage(`/products/${el.id}/thumbnails/product_300x300`));
		}

		gImage();
	}, [el.id]);

	return <ProductCard data={el} key={index} imagePath={image} />;
}
