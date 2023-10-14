import { Container } from "@/styles/index.styles";
import { Bebas_Neue, Roboto } from "next/font/google";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import styled, { css } from "styled-components";

const BebasNeue = Bebas_Neue({ weight: "400", subsets: ["latin"] });
const roboto = Roboto({ weight: "400", subsets: ["latin"] });

const Title = styled.h1`
	font-size: 3rem;
	margin: 0;
	margin-bottom: 20px;
`;

const LinksContainer = styled.div`
	width: 100%;
	display: flex;
	justify-content: space-between;
	align-items: center;
`;

export function Nav() {
	return (
		<Container
			style={{
				maxWidth: "700px",
				margin: "0 auto",
				display: "flex",
				justifyContent: "space-between",
				alignItems: "center",
				flexDirection: "column",
			}}
		>
			<Title className={BebasNeue.className}>Carnicería Rodriguez</Title>
			<LinksContainer style={{ width: "100%" }}>
				<LinkStyled href="">Añadir productos</LinkStyled>
				<LinkStyled href="edit">Editar productos</LinkStyled>
				<LinkStyled href="featured">productos Destacados</LinkStyled>
			</LinksContainer>
		</Container>
	);
}

const Links = styled(Link)<{ active: boolean }>`
	display: inline-block;
	padding: 10px 20px;
	font-family: ${roboto.style.fontFamily};
	font-weight: ${roboto.style.fontWeight};
	font-style: ${roboto.style.fontStyle};
	text-decoration: none;
	background-color: #fff;
	margin: 0 auto;
	border-radius: 10px;
	transition: 200ms;
	${({ active }) => {
		if (active)
			return css`
				color: blue;
			`;
		else
			return css`
				color: gray;
			`;
	}}

	@media (prefers-color-scheme: dark) {
		background-color: #001620;
	}
`;

interface link {
	children: children;
	href: string;
}

function LinkStyled({ children, href }: link) {
	const router = useRouter();
	const [active, setActive] = useState(false);

	useEffect(() => {
		const sections = router.asPath.split("/")[2] ?? "";

		if (sections === href) {
			setActive(true);
		} else {
			setActive(false);
		}
	}, [href, router.asPath]);

	return (
		<Links active={active} href={`/admin/${href}`}>
			{children}
		</Links>
	);
}
