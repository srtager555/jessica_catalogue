import { CSSProperties, useEffect, useState } from "react";
import { QueryDocumentSnapshot, DocumentData } from "firebase/firestore";
import { ProductContainer, Title } from "@/styles/index.styles";
import styled from "styled-components";
import { useInView } from "react-intersection-observer";
import { Nav } from "@/components/Nav";
import { ProductCard } from "@/components/product.card";
import { searchProduct } from "@/tools/searchProduct";
import { useGetProducts } from "@/hooks/useGetProducts";
import { getImage } from "@/tools/storage/getImage";

type p = QueryDocumentSnapshot<product, DocumentData>[];

const titleStyles: CSSProperties = {
	marginTop: "40px",
	textAlign: "center",
};

const Container = styled.div`
	position: relative;
	width: 100%;
	min-height: 110vh;
	padding: 10px;
	padding-bottom: 10%;
`;

const Charger = styled.div`
	position: absolute;
	bottom: 0%;
	left: 0%;
	height: 10vh;
	width: 100%;
`;

export default function Home() {
	const [products, setProducts] = useState<p>([]);
	const [featured, setFeatured] = useState<p>([]);
	const [productsLength, setProductsLength] = useState(10);
	const [entryResult, setEntryResult] = useState<{ byName: p; byBrand: p; byCate: p }>();
	const [entry, setEntry] = useState<string>("");
	const productsListener = useGetProducts();
	const {
		ref,
		inView,
		entry: entryData,
	} = useInView({
		threshold: 0,
	});

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

			// if (featured.length < 10)
			// 	setFeatured([...sortedFeatured, ...sortedProducts.slice(0, 10 - featured.length)]);
			// else
			setFeatured(sortedProducts.slice(0, productsLength));
		}
	}, [products, productsLength]);

	useEffect(() => {
		setProducts(productsListener.snap);
	}, [productsListener.snap]);

	useEffect(() => {
		if (!inView) return;

		if (productsLength + 10 <= products.length) setProductsLength(productsLength + 10);
		else setProductsLength(productsLength + products.length - productsLength);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [inView]);

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
					<>
						<ProductContainer>
							{featured.map((el, index) => (
								<CardRender key={index} el={el} index={index} />
							))}
						</ProductContainer>
						<Charger ref={ref}></Charger>
					</>
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
