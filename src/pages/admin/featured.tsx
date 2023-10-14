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
import { useCallback, useContext, useEffect, useState } from "react";
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

	@media (prefers-color-scheme: dark) {
		background-color: #001620;
	}
`;

export default function Featured() {
	const [error, setError] = useState<string>();
	const [first, setFirst] = useState(true);
	const [featuredProducts, setFeaturedProducts] = useState<
		QueryDocumentSnapshot<product, DocumentData>[]
	>([]);
	const adminContext = useContext(AdminContext);
	const router = useRouter();
	const db = Firestore();

	const addFeatured = useCallback(
		async (p: QueryDocumentSnapshot<product, DocumentData>) => {
			const q = query(collection(db, "/products"), where("featured", "==", true));
			const products = await getDocs(q);

			if (products.docs.length <= 10) {
				await updateDoc(p.ref, { featured: true });

				if (error) setError(undefined);
			} else {
				setError("Maximo de destacados añadidos");
			}
		},
		[db, error]
	);

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
		addFeatured,
	]);

	useEffect(() => {
		const coll = collection(db, "/products") as CollectionReference<product>;

		const unsub = onSnapshot(coll, async (snap) => {
			const q = query(snap.query, where("featured", "==", true));
			const d = (await getDocs(q)).docs;

			const s = d.sort((prev, next) => {
				if (prev.data().name > next.data().name) {
					return 1;
				}
				if (prev.data().name < next.data().name) {
					return -1;
				}
				// a must be equal to b
				return 0;
			});

			setFeaturedProducts(s);
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
			{error && <p style={{ marginBottom: "20px", color: "red" }}>{error}</p>}
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
			setImage(await getImage(`/products/${data.id}/thumbnails/product_300x300`));
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
