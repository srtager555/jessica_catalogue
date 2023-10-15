import { List } from "@/components/admin/cataloge";
import { Firestore } from "@/tools/firestore";
import { getImage } from "@/tools/storage/getImage";
import { User, getAuth, onAuthStateChanged } from "firebase/auth";
import {
	CollectionReference,
	DocumentData,
	QueryDocumentSnapshot,
	collection,
	getDocs,
} from "firebase/firestore";
import { Roboto } from "next/font/google";
import { useEffect, useState } from "react";
import styled from "styled-components";

const roboto = Roboto({ weight: "400", subsets: ["latin"] });

const Main = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
	height: 100vh;
	width: 100%;
`;

const Info = styled.div`
	@media print {
		display: none;
	}

	max-width: 550px;
	margin: auto;

	p {
		margin-bottom: 10px;
	}
`;

export default function Cataloge() {
	const [products, setProducts] = useState<product[]>([]);
	const [user, setUser] = useState<User>();
	const auth = getAuth();
	const db = Firestore();

	useEffect(() => {
		const unsub = onAuthStateChanged(auth, (u) => {
			if (!u) return setUser(undefined);

			setUser(u);
		});

		return () => unsub();
	}, [auth]);

	useEffect(() => {
		async function getProducts() {
			const coll = collection(db, "/products") as CollectionReference<product>;

			const query = await getDocs(coll);

			query.docs.forEach(async (data) => {
				const imagePath = await getImage(`products/${data.id}/thumbnails/product_300x300`);

				setProducts((prev) => [...prev, { img: imagePath, ...data.data() }]);
			});
		}

		getProducts();
	}, [db]);

	if (!user) return <>acceso denegado...</>;

	return (
		<Main className={roboto.className}>
			<Info>
				{JSON.stringify(products)}
				{/* <p>
					Para poder ver una vista previa del catalogo presione: <b>ctrl + p</b> en
					Windows ó <b>cmd + p</b> en MacOS
				</p>
				<p>
					La vista previa se ordenara por categoria y marcas sin un orden en especial, ese
					orden se debe de dar en fisico, despues de la impresion, esto se hace para
					facilitar añadir nuevos productos
				</p> */}
			</Info>
			{/* <List /> */}
		</Main>
	);
}
