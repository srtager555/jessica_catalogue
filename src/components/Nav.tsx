import { Container } from "@/styles/index.styles";
import { Bebas_Neue, Roboto } from "next/font/google";
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

export function Nav() {
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
				<Title className={BebasNeue.className}>Carnicería Rodriguez</Title>
				<Input className={roboto.className} type="text" placeholder="Busca un producto" />
			</Container>
		</NavStyled>
	);
}
