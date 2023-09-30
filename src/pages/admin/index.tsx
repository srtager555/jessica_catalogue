import styled from "styled-components";
import { Roboto } from "next/font/google";
import { Dispatch, FormEvent, SetStateAction, useContext, useEffect, useState } from "react";
import { addDoc, collection, getDocs, query, where } from "firebase/firestore";
import { Firestore } from "@/tools/firestore";
import { CreateCategory } from "@/components/admin/createCat.form";
import { DeleteCat } from "@/components/admin/deleteCat.form";
import { uploadFile } from "@/tools/storage/uploadFile";
import { FormProduct } from "@/components/admin/form.product";
import { Title } from "@/styles/index.styles";

const roboto = Roboto({ weight: "400", subsets: ["latin"] });

const Box = styled.div`
	width: 60%;
	font-family: ${roboto.style.fontFamily};
	font-style: ${roboto.style.fontStyle};
	font-weight: ${roboto.style.fontWeight};
`;

export default function Add() {
	const [loading, setLoading] = useState(false);
	const db = Firestore();

	async function createProduct(
		e: FormEvent,
		imageURl: File | undefined,
		setError: Dispatch<SetStateAction<string | undefined>>,
		setRefreshImage: Dispatch<SetStateAction<boolean>>
	) {
		e.preventDefault();
		setLoading(true);

		const target = e.currentTarget as typeof e.currentTarget & {
			productName: HTMLInputElement;
			price: HTMLInputElement;
			weight: HTMLInputElement;
			brand: HTMLSelectElement;
			category: HTMLSelectElement;
		};

		const { productName, price, weight, brand, category } = target;

		if (!imageURl) {
			setError("El producto debe de llevar una imagen");
			setLoading(false);

			return;
		}

		const prodColl = collection(db, "/products");

		// comprobation to avoid issues in the images

		const q = query(
			prodColl,
			where("name", "==", productName.value),
			where("brand", "==", brand.value)
		);
		const snapshot = await getDocs(q);

		if (snapshot.docs.length > 0) {
			setError("Ya existe un producto con este nombre y marca");
			setLoading(false);

			return;
		}

		const content = {
			name: productName.value,
			price: Number(price.value),
			weight: weight.value,
			brand: brand.value,
		};

		if (category.value != "") {
			// @ts-ignore
			content.category = category.value;
		}

		// adding the product to firebase
		const data = await addDoc(prodColl, content);

		// uploading the image
		await uploadFile(`products/${data.id}/product`, imageURl);

		// restoring the form, the input image and the Error state
		//@ts-ignore
		e.target.reset();
		setError(undefined);
		setRefreshImage(true);
		setLoading(false);
	}

	return (
		<Box>
			<Title>Añadir producto</Title>
			<FormProduct loading={loading} callback={createProduct} />
			<CreateCategory />
			<DeleteCat />
		</Box>
	);
}
