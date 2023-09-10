import { Bebas_Neue } from "next/font/google";
import styled from "styled-components";

const BebasNeue = Bebas_Neue({ weight: "400", subsets: ["latin"] });

export const Container = styled.div`
	padding: 20px;
	width: 100%;
`;

export const ProductContainer = styled.div`
	display: grid;
	grid-template-columns: repeat(5, 1fr);
	gap: 50px;
`;

export const Background = styled.div`
	position: fixed;
	top: 0;
	left: 0;
	height: 100vh;
	width: 100%;
	background: linear-gradient(45deg, var(--bg-color) 0%, var(--bg-color-2) 100%);
	z-index: -1;
`;

export const Button = styled.button`
	display: inline-block;
	padding: 10px;
	background-color: #fff;
	border: none;
	border-radius: 10px;
	cursor: pointer;
	transition: 200ms;

	&:active {
		transform: translate(0.9);
	}
`;

export const Title = styled.h2`
	font-size: 2rem;
	margin: 0;
	margin-bottom: 20px;
	font-family: ${BebasNeue.style.fontFamily};
	font-weight: ${BebasNeue.style.fontWeight};
	font-style: ${BebasNeue.style.fontStyle};
`;
