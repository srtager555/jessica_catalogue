import { Firestore } from "@/tools/firestore";
import {
	CollectionReference,
	DocumentData,
	DocumentSnapshot,
	QueryDocumentSnapshot,
	QuerySnapshot,
	collection,
	getDocs,
	query,
	where,
} from "firebase/firestore";
import { useEffect, useState } from "react";
import styled from "styled-components";
import { ProductCard } from "./product.card";
import { getImage } from "@/tools/storage/getImage";
import { Roboto } from "next/font/google";

const Container = styled.div`
	width: 100%;
	margin-top: 50px;
`;

const roboto = Roboto({ weight: "400", subsets: ["latin"] });

interface props {
	currentProduct: DocumentSnapshot<product, DocumentData>;
}

export function RecommendedProducts({ currentProduct }: props) {
	const [recommendedProducts, setRecommendedProducts] =
		useState<QuerySnapshot<product, DocumentData>>();
	const db = Firestore();

	useEffect(() => {
		async function getRecommended() {
			const data = currentProduct.data();

			const ref = collection(db, "/products") as CollectionReference<product>;

			const q = query(
				ref,
				where("category", "==", data?.category),
				where("name", "!=", data?.name)
			);

			const docs = await getDocs(q);

			setRecommendedProducts(docs);
		}

		getRecommended();
	}, [currentProduct, db]);

	return (
		<Container>
			<h2 className={roboto.className} style={{ marginBottom: "20px" }}>
				Productos similares
			</h2>
			<div>
				{recommendedProducts?.docs.map((el, i) => (
					<CardRender key={i} el={el} index={i} />
				))}
			</div>
		</Container>
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

	useEffect(() => {
		async function gImage() {
			setImage(await getImage(`/products/${el.id}/thumbnails/product_300x300`));
		}

		gImage();
	}, [el.id]);

	return <ProductCard data={el} key={index} imagePath={image} />;
}
