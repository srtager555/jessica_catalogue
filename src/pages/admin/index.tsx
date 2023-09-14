import { FlexContainer, Form, Title } from "@/styles/index.styles";
import styled from "styled-components";
import { Roboto } from "next/font/google";
import { InputImage } from "@/components/InputImage";
import { FormEvent, HTMLAttributes, useState } from "react";
import { addDoc, collection, doc, getDocs } from "firebase/firestore";
import { Firestore } from "@/tools/firestore";
import { CreateCategory } from "@/components/admin/createCat.form";
import { DeleteCat } from "@/components/admin/deleteCat.form";

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

	console.log(imageURl);

	return (
		<Box>
			<Title>Añadir producto</Title>
			<Form style={{ marginBottom: "100px" }}>
				<FlexContainer styles={{ ...flexProps.styles, marginBottom: "40px" }}>
					<InputImage setImageUrl={setImageUrl} />
					<Container>
						<div>
							<Names>Nombre</Names>
							<Names>Precio</Names>
							<Names>Peso</Names>
						</div>
						<div>
							<Input />
							<Input />
							<Input />
						</div>
					</Container>
				</FlexContainer>
				<p>Selecciona una categoria</p>
				<select required>
					<option>Categoria</option>
				</select>
			</Form>
			<CreateCategory />
			<DeleteCat />
		</Box>
	);
}
