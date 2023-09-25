import { FormProduct } from "@/components/admin/form.product";
import { AdminContext } from "@/layout/admin";
import { Title } from "@/styles/index.styles";
import { Firestore } from "@/tools/firestore";
import { uploadFile } from "@/tools/storage/uploadFile";
import { collection, getDocs, query, updateDoc, where } from "firebase/firestore";
import { isEqual } from "lodash";
import { Roboto } from "next/font/google";
import { Dispatch, FormEvent, SetStateAction, useContext } from "react";
import styled from "styled-components";

const roboto = Roboto({ weight: "400", subsets: ["latin"] });

const Box = styled.div`
	width: 60%;
	font-family: ${roboto.style.fontFamily};
	font-style: ${roboto.style.fontStyle};
	font-weight: ${roboto.style.fontWeight};
`;

export default function Edit() {
	const adminContext = useContext(AdminContext);
	const db = Firestore();

	async function edit(
		e: FormEvent,
		imageURl: File | undefined,
		setError: Dispatch<SetStateAction<string | undefined>>,
		setRefreshImage: Dispatch<SetStateAction<boolean>>
	) {
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
		const changes = isEqual(data, currentData.data()) && typeof imageURl === "undefined";

		if (changes) {
			setError("No se dectectaron cambios");

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

		if (snapshot.docs.length > 0) {
			const conditions = [
				data.category === currentData.data().category,
				data.price === currentData.data().price,
				data.weight === currentData.data().weight,
				data.brand === currentData.data().brand,
			];
			if (conditions.every((el) => el === true)) {
				setError("Ya existe un producto con este nombre y marca");
				return;
			}
		}

		// uploading the new data
		if (!isEqual(data, currentData.data())) {
			await updateDoc(currentData.ref, data);
		}

		if (imageURl) {
			await uploadFile(`/products/${currentData.id}/product`, imageURl);
		}

		// restoring the error catcher
		setError(undefined);
	}

	return (
		<Box>
			<Title>Editar un productor</Title>
			<FormProduct callback={edit} edit />
		</Box>
	);
}
