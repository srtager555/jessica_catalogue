import { Title } from "@/styles/index.styles";
import styled from "styled-components";
import { Roboto } from "next/font/google";
import { InputImage } from "@/components/InputImage";
import { useState } from "react";

const roboto = Roboto({ weight: "400", subsets: ["latin"] });

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

const Input = styled.input`
	display: block;
	margin-bottom: 20px;
`;

const Form = styled.form`
	display: flex;
	justify-content: space-between;
	width: 100%;
	padding: 30px;
	background-color: #fff;
	border-radius: 20px;
`;

export default function Add() {
	const [imageURl, setImageUrl] = useState<any>();

	console.log(imageURl);

	return (
		<Box>
			<Title>Añadir producto</Title>
			<Form>
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
				<div></div>
			</Form>
		</Box>
	);
}
