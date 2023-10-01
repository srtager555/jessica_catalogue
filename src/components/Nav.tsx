import { Container } from "@/styles/index.styles";
import { Bebas_Neue, Roboto } from "next/font/google";
import { ChangeEvent, Dispatch, SetStateAction } from "react";
import styled from "styled-components";

const BebasNeue = Bebas_Neue({ weight: "400", subsets: ["latin"] });

const roboto = Roboto({ weight: "400", subsets: ["latin"] });

const NavStyled = styled.nav`
	width: 100%;
`;

const Title = styled.h1`
	font-size: 3rem;
	margin: 0;
	margin-bottom: 20px;
`;

const Input = styled.input`
	width: 100%;
	padding: 20px;
	font-size: 1.5rem;
	border: none;
	border-bottom: 1px solid #000;
	background-color: transparent;
	text-align: center;
`;

const Logo = styled.img`
	width: 150px;
`;

interface props {
	setEntry: Dispatch<SetStateAction<string>>;
}

export function Nav({ setEntry }: props) {
	function onChange(e: ChangeEvent<HTMLInputElement>) {
		const value = e.currentTarget.value;

		setEntry(value);
	}

	return (
		<NavStyled>
			<Container
				style={{
					maxWidth: "500px",
					margin: "0 auto",
					display: "flex",
					justifyContent: "space-between",
					alignItems: "center",
					flexDirection: "column",
				}}
			>
				<Logo src="/CR_logo_border_small.png" />
				<Title style={{ textAlign: "center" }} className={BebasNeue.className}>
					Carnicería Rodriguez
				</Title>
				<Input
					onChange={onChange}
					className={roboto.className}
					type="text"
					placeholder="Busca un producto"
				/>
			</Container>
		</NavStyled>
	);
}
