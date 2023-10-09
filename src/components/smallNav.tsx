import { Roboto } from "next/font/google";
import Image from "next/image";
import Link from "next/link";
import styled from "styled-components";

const roboto = Roboto({ weight: "400", subsets: ["latin"] });

const Container = styled.div`
	display: flex;
	justify-content: space-between;
	align-items: center;
	width: 100%;
	max-width: 1000px;
	padding: 10px 20px;
	margin: 0 auto;
	margin-bottom: 30px;
`;

const Input = styled.input`
	width: 100%;
	max-width: 500px;
	padding: 10px;
	font-size: 1.5rem;
	margin-left: 20px;
	border: none;
	border-bottom: 1px solid #000;
	background-color: transparent;
	text-align: center;
`;

export function SmallNav() {
	return (
		<Container>
			<Image width="80" height="80" src="/CR_logo_border_small.png" alt="" />
			<Input
				// onChange={onChange}
				className={roboto.className}
				type="text"
				placeholder="Buscar un producto"
			/>
			<Link href="/cart">
				<Image width="40" height="40" src="/svg/shoppingCart.svg" alt="" />
			</Link>
		</Container>
	);
}
