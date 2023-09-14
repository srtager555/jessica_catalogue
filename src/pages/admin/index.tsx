import { FlexContainer, Title } from "@/styles/index.styles";
import styled from "styled-components";
import { Roboto } from "next/font/google";
import { InputImage } from "@/components/InputImage";
import { useState } from "react";

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

const Form = styled.form`
	width: 100%;
	padding: 30px;
	margin-bottom: 20px;
	background-color: #fff;
	border-radius: 20px;
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
			<Title>Crear una nueva Categoria</Title>
			<Form>
				<FlexContainer {...flexProps}>
					<Input m />
					<button>Crear</button>
				</FlexContainer>
			</Form>
			<Title>Eliminar una Categoria</Title>
			<Form>
				<FlexContainer {...flexProps}>
					<select>
						<option>Selecciona una categoria</option>
					</select>
					<button>Eliminar</button>
				</FlexContainer>
			</Form>
		</Box>
	);
}
