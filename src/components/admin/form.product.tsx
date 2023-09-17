import { Form, FlexContainer } from "@/styles/index.styles";
import error from "next/error";
import styled from "styled-components";
import { InputImage } from "../InputImage";
import { collection, CollectionReference, onSnapshot } from "firebase/firestore";
import { Dispatch, FormEvent, SetStateAction, useEffect, useState } from "react";
import { cate } from "./deleteCat.form";
import { Firestore } from "@/tools/firestore";

const flexProps = {
	styles: {
		justifyContent: "space-between",
		alignItems: "center",
	},
};

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

interface props {
	callback: (
		e: FormEvent,
		imageURl: File | undefined,
		setError: Dispatch<SetStateAction<string | undefined>>,
		setRefreshImage: Dispatch<SetStateAction<boolean>>
	) => void;
}

export function FormProduct({ callback }: props) {
	const [imageURl, setImageUrl] = useState<File>();
	const [imageName, setImageName] = useState<string>();
	const [refreshImage, setRefreshImage] = useState<boolean>(false);
	const [productName, setProductName] = useState<string>("");
	const [brandName, setBrandName] = useState<string>("");
	const [categories, setCategories] = useState<cate[]>([]);
	const [error, setError] = useState<string>();
	const db = Firestore();

	function onSubmit(e: FormEvent) {
		e.preventDefault();

		callback(e, imageURl, setError, setRefreshImage);
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
		<Form onSubmit={onSubmit} style={{ marginBottom: "100px" }}>
			{error && <p style={{ marginBottom: "20px", color: "red" }}>{error}</p>}
			<FlexContainer styles={{ ...flexProps.styles, marginBottom: "40px" }}>
				{!refreshImage && <InputImage setImageUrl={setImageUrl} customImageName="image" />}
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
	);
}
