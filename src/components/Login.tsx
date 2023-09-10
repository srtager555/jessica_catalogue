import styled from "styled-components";
import { Roboto } from "next/font/google";
import { Button, Title } from "@/styles/index.styles";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { FormEvent, useState } from "react";

const Robo = Roboto({ weight: "400", subsets: ["latin"] });

const Center = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
	width: 100%;
	height: 100vh;
`;

const Container = styled.div``;

const Label = styled.label<{ placeh: string }>`
	position: relative;
	display: block;
	margin-bottom: 20px;
	font-family: ${Robo.style.fontFamily};
	font-weight: ${Robo.style.fontWeight};
	font-style: ${Robo.style.fontStyle};

	&::before {
		content: "${({ placeh }) => placeh}";
		position: absolute;
		top: 0;
		left: -10%;
		transform: translateX(-100%);
		z-index: 1;
	}
`;

const Input = styled.input``;

export function LogIn() {
	const [error, setError] = useState<any>();
	const auth = getAuth();

	async function onSubmit(e: FormEvent) {
		e.preventDefault();

		const target = e.currentTarget as typeof e.currentTarget & {
			mail: { value: string };
			pass: { value: string };
		};

		try {
			await signInWithEmailAndPassword(auth, target.mail.value, target.pass.value);
		} catch (error) {
			console.log(error);
		}
	}

	return (
		<Center>
			<Container>
				{error}
				<form onSubmit={onSubmit}>
					<Title>
						Inicia sesion para <br /> continuar
					</Title>
					<Label placeh="Correo">
						<Input name="mail" type="mail" required />
					</Label>

					<Label placeh="Contraseña">
						<Input name="pass" type="password" required />
					</Label>

					<Button>Iniciar</Button>
				</form>
			</Container>
		</Center>
	);
}
