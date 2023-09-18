/* eslint-disable @next/next/no-img-element */
import { AdminContext } from "@/layout/admin";
import { SpaceBeetwenContainer, Title, TitleH3 } from "@/styles/index.styles";
import { Firestore } from "@/tools/firestore";
import { getImage } from "@/tools/storage/getImage";
import {
	CollectionReference,
	DocumentData,
	QueryDocumentSnapshot,
	collection,
	deleteField,
	getDocs,
	onSnapshot,
	query,
	updateDoc,
	where,
} from "firebase/firestore";
import { Roboto } from "next/font/google";
import { useRouter } from "next/router";
import { useContext, useEffect, useState } from "react";
import styled from "styled-components";

const roboto = Roboto({ weight: "400", subsets: ["latin"] });

const Box = styled.div`
	width: 60%;
	font-family: ${roboto.style.fontFamily};
	font-style: ${roboto.style.fontStyle};
	font-weight: ${roboto.style.fontWeight};
`;

const FBox = styled(SpaceBeetwenContainer)`
	flex-wrap: wrap;
	margin-top: 20px;
`;

const FProduct = styled.div`
	width: 47%;
	margin-bottom: 20px;

	& img {
		width: 100%;
	}
`;

const TransparentBTN = styled.button`
	width: 100%;
	position: relative;
	background-color: transparent;
	border: none;
	cursor: pointer;
	transition: 200ms ease-in;

	&:active {
		transform: scale(0.9);
	}
`;

const PInfo = styled.div`
	border-top-right-radius: 10px;
	border-top-left-radius: 10px;
	background-color: #fff;
	padding: 10px 5px;
`;

export default function Featured() {
	const [first, setFirst] = useState(true);
	const [featuredProducts, setFeaturedProducts] = useState<
		QueryDocumentSnapshot<product, DocumentData>[]
	>([]);
	const adminContext = useContext(AdminContext);
	const router = useRouter();
	const db = Firestore();

	async function addFeatured(p: QueryDocumentSnapshot<product, DocumentData>) {
		await updateDoc(p.ref, { featured: true });
	}

	useEffect(() => {
		if (
			first &&
			//@ts-ignore
			(document.referrer != "/admin/featured" || document.referrer != "/admin/featured/")
		) {
			adminContext?.setProductSelector(undefined);
			setFirst(false);
			return;
		}

		const p = adminContext?.productSelector;

		if (!p) return;

		addFeatured(p);
	}, [
		adminContext?.setProductSelector,
		adminContext?.productSelector,
		router.asPath,
		adminContext,
		first,
	]);

	useEffect(() => {
		const coll = collection(db, "/products") as CollectionReference<product>;

		const unsub = onSnapshot(coll, async (snap) => {
			const q = query(snap.query, where("featured", "==", true));
			const d = (await getDocs(q)).docs;

			setFeaturedProducts(d);
		});

		return () => unsub();
	}, [db]);

	return (
		<Box>
			<Title>Destacados</Title>
			<p>
				<i>
					Los productos destacados se muestran por orden alfabetico en el &quot;home&quot;
				</i>
			</p>
			<div style={{ marginTop: "20px", color: "blue" }}>
				<ul>
					<li>Puedes remover un producto solo dando click en el</li>
					<li>Para agregar un producto solo tienes que seleccionarlo a la izquierda</li>
				</ul>
			</div>
			<FBox>
				{featuredProducts.map((el, i) => (
					<FeaturedComponent key={i} data={el} />
				))}
			</FBox>
		</Box>
	);
}

interface props {
	data: QueryDocumentSnapshot<product, DocumentData>;
}

const FeaturedComponent = ({ data }: props) => {
	const [image, setImage] = useState<string>();

	function removed() {
		updateDoc(data.ref, {
			featured: deleteField(),
		});
	}

	useEffect(() => {
		async function getImg() {
			setImage(await getImage(`/products/${data.id}/product`));
		}

		getImg();
	}, [data.id]);

	return (
		<FProduct>
			<TransparentBTN onClick={removed}>
				<PInfo>
					<TitleH3>{data.data().name}</TitleH3>
					<span>
						{data.data().brand ? data.data().brand + " | " : ""}
						{data.data().price} LPS | {data.data().weight} LB
					</span>
				</PInfo>
				<img src={image} alt={data.data().name} />
			</TransparentBTN>
		</FProduct>
	);
};
