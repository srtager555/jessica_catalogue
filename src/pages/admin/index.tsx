import { FlexContainer, Form, Title } from "@/styles/index.styles";
import styled from "styled-components";
import { Roboto } from "next/font/google";
import { InputImage } from "@/components/InputImage";
import { FormEvent, HTMLAttributes, useEffect, useState } from "react";
import {
	CollectionReference,
	addDoc,
	collection,
	doc,
	getDocs,
	onSnapshot,
} from "firebase/firestore";
import { Firestore } from "@/tools/firestore";
import { CreateCategory } from "@/components/admin/createCat.form";
import { DeleteCat, cate } from "@/components/admin/deleteCat.form";

const roboto = Roboto({ weight: "400", subsets: ["latin"] });

const flexProps = {
	styles: {
		justifyContent: "space-between",
		alignItems: "center",
	},
};

const Box = styled.div`
	width: 60%;
	font-family: ${roboto.style.fontFamily};
	font-style: ${roboto.style.fontStyle};
	font-weight: ${roboto.style.fontWeight};
`;

const Container = styled.div`
	display: flex;
	justify-content: center;
`;

const Names = styled.p`
	text-align: end;
	margin-bottom: 20px;
	margin-right: 20px;
`;

const Input = styled.input<{ m?: boolean }>`
	display: block;
	margin-bottom: ${({ m }) => (m ? "0" : "20px")};
`;

export default function Add() {
	const [imageURl, setImageUrl] = useState<any>();
	const [categories, setCategories] = useState<cate[]>([]);
	const db = Firestore();

	async function createProduct(e: FormEvent) {
		e.preventDefault();

		const target = e.currentTarget as typeof e.currentTarget & {
			productName: HTMLInputElement;
			price: HTMLInputElement;
			weight: HTMLInputElement;
			brand: HTMLSelectElement;
			category: HTMLSelectElement;
		};

		const prodColl = collection(db, "/products");

		await addDoc(prodColl, {
			name: target.productName.value,
			price: target.price.value,
			weight: target.weight.value,
			category: target.category.value,
			brand: target.brand.value,
		});

		//@ts-ignore
		e.target.reset();
	}

	useEffect(() => {
		const cateColl = collection(db, "/categories") as CollectionReference<cate>;

		const unsubcribe = onSnapshot(cateColl, (snap) => {
			setCategories([]);

			snap.forEach((el) => {
				const data = el.data();

				setCategories((prev) => [...prev, data]);
			});
		});

		return () => {
			unsubcribe();
		};
	}, [db]);

	return (
		<Box>
			<Title>Añadir producto</Title>
			<Form onSubmit={createProduct} style={{ marginBottom: "100px" }}>
				<FlexContainer styles={{ ...flexProps.styles, marginBottom: "40px" }}>
					<InputImage setImageUrl={setImageUrl} />
					<Container>
						<div>
							<Names>Nombre</Names>
							<Names>Precio</Names>
							<Names>Peso en libras</Names>
							<Names>Marca (optional)</Names>
						</div>
						<div>
							<Input type="text" required name="productName" />
							<Input type="text" required name="price" />
							<Input type="text" required name="weight" />
							<Input type="text" name="brand" />
						</div>
					</Container>
				</FlexContainer>
				<FlexContainer styles={{ ...flexProps.styles }}>
					<select name="category" required>
						{categories?.length > 0 ? (
							<option>Selecciona una categoria</option>
						) : (
							<option>No hay categorias</option>
						)}
						{categories.map((el, i) => (
							<option key={i}>{el.name}</option>
						))}
					</select>
					<button>Crear</button>
				</FlexContainer>
			</Form>
			<CreateCategory />
			<DeleteCat />
		</Box>
	);
}
