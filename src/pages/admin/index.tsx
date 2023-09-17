import { FlexContainer, Form, Title } from "@/styles/index.styles";
import styled from "styled-components";
import { Roboto } from "next/font/google";
import { InputImage } from "@/components/InputImage";
import { FormEvent, HTMLAttributes, useEffect, useState } from "react";
import {
	CollectionReference,
	addDoc,
	collection,
	getDocs,
	onSnapshot,
	query,
	where,
} from "firebase/firestore";
import { Firestore } from "@/tools/firestore";
import { CreateCategory } from "@/components/admin/createCat.form";
import { DeleteCat, cate } from "@/components/admin/deleteCat.form";
import { uploadFile } from "@/tools/storage/uploadFile";

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
	const [imageURl, setImageUrl] = useState<File>();
	const [imageName, setImageName] = useState<string>();
	const [refreshImage, setRefreshImage] = useState<boolean>(false);
	const [productName, setProductName] = useState<string>("");
	const [brandName, setBrandName] = useState<string>("");
	const [categories, setCategories] = useState<cate[]>([]);
	const [error, setError] = useState<any>();
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

		const { productName, price, weight, brand, category } = target;

		if (!imageURl) {
			setError("El producto debe de llevar una imagen");

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

			return;
		}

		// adding the product to firebase
		const data = await addDoc(prodColl, {
			name: productName.value,
			price: price.value,
			weight: weight.value,
			category: category.value,
			brand: brand.value,
		});

		// uploading the image
		await uploadFile(`products/${data.id}/product`, imageURl);

		// restoring the form, the input image and the Error state
		//@ts-ignore
		e.target.reset();
		setError(undefined);
		setRefreshImage(true);
	}

	// image name listener
	useEffect(() => {
		setImageName(`${productName.replaceAll(" ", "_")}_${brandName.replaceAll(" ", "_")}`);
	}, [productName, brandName]);

	useEffect(() => {
		// refresh input image xdxdxd

		setTimeout(() => setRefreshImage(false));
	}, [refreshImage]);

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
				{error && <p style={{ marginBottom: "20px", color: "red" }}>{error}</p>}
				<FlexContainer styles={{ ...flexProps.styles, marginBottom: "40px" }}>
					{!refreshImage && (
						<InputImage setImageUrl={setImageUrl} customImageName="image" />
					)}
					<Container>
						<div>
							<Names>Nombre</Names>
							<Names>Precio</Names>
							<Names>Peso en libras</Names>
							<Names>Marca (optional)</Names>
						</div>
						<div>
							<Input
								onChange={(e) => {
									setProductName(e.currentTarget.value);
								}}
								type="text"
								required
								name="productName"
							/>
							<Input type="text" required name="price" />
							<Input type="number" required name="weight" />
							<Input
								onChange={(e) => {
									setBrandName(e.currentTarget.value);
								}}
								type="text"
								name="brand"
							/>
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
							<option key={i} value={el.name}>
								{el.name}
							</option>
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
