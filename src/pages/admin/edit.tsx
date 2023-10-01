import { FormProduct } from "@/components/admin/form.product";
import { AdminContext } from "@/layout/admin";
import { Title } from "@/styles/index.styles";
import { Firestore } from "@/tools/firestore";
import { uploadFile } from "@/tools/storage/uploadFile";
import {
	DocumentData,
	QueryDocumentSnapshot,
	collection,
	getDoc,
	getDocs,
	query,
	updateDoc,
	where,
} from "firebase/firestore";
import { isEqual } from "lodash";
import { Roboto } from "next/font/google";
import { Dispatch, FormEvent, SetStateAction, useContext, useState } from "react";
import styled from "styled-components";

const roboto = Roboto({ weight: "400", subsets: ["latin"] });

const Box = styled.div`
	width: 60%;
	font-family: ${roboto.style.fontFamily};
	font-style: ${roboto.style.fontStyle};
	font-weight: ${roboto.style.fontWeight};
`;

export default function Edit() {
	const [loading, setLoading] = useState(false);
	const [lastImage, setLastImage] = useState<File>();
	const adminContext = useContext(AdminContext);
	const db = Firestore();

	async function edit(
		e: FormEvent,
		imageURl: File | undefined,
		setError: Dispatch<SetStateAction<string | undefined>>
	) {
		setLoading(true);
		const currentData = adminContext?.productSelector;

		if (!currentData) return;

		const target = e.currentTarget as typeof e.currentTarget & {
			productName: HTMLInputElement;
			price: HTMLInputElement;
			weight: HTMLInputElement;
			brand: HTMLSelectElement;
			category: HTMLSelectElement;
		};

		const { productName, price, weight, brand, category } = target;
		const data = {
			name: productName.value,
			price: Number(price.value),
			weight: Number(weight.value),
			brand: brand.value,
			category: category.value,
		};

		// comprobation to check changes
		const changes = isEqual(data, currentData.data()) && isEqual(imageURl, lastImage);

		if (changes) {
			setError("No se dectectaron cambios");
			setLoading(false);

			return;
		}

		// comprobation to avoid issues of equal products
		const prodColl = collection(db, "/products");

		const q = query(
			prodColl,
			where("name", "==", productName.value),
			where("brand", "==", brand.value)
		);
		const snapshot = await getDocs(q);

		const equaldocs = snapshot.docs.filter((el) => el.id != currentData.id);

		if (equaldocs.length > 0) {
			setError("Ya existe un producto con este nombre y marca");
			setLoading(false);

			return;
		}

		// uploading the new data
		if (!isEqual(data, currentData.data())) {
			await updateDoc(currentData.ref, data);

			const newCurretData = await getDoc(currentData.ref);

			adminContext?.setProductSelector(
				newCurretData as unknown as QueryDocumentSnapshot<product, DocumentData>
			);
		}

		if (imageURl && !isEqual(imageURl, lastImage)) {
			await uploadFile(`/products/${currentData.id}/product`, imageURl);
			setLastImage(imageURl);
		}

		// restoring the error catcher
		setError(undefined);
		setLoading(false);
	}

	return (
		<Box>
			<Title>Editar un productor</Title>
			<FormProduct loading={loading} callback={edit} edit />
		</Box>
	);
}
