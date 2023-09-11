import { useGetProducts } from "@/hooks/useGetProducts";
import { Title } from "@/styles/index.styles";
import { Dispatch, SetStateAction } from "react";
import styled from "styled-components";

const Container = styled.div`
	width: 40%;
	margin-right: 50px;
`;

const Button = styled.button`
	display: flex;
	justify-content: space-between;
	width: 100%;
	text-align: start;
	background-color: #fff;
	border: none;
	border-radius: 10px;
	padding: 10px 20px;
	margin-bottom: 10px;
	cursor: pointer;
`;

const Select = styled.span`
	font-style: italic;
`;

interface props {
	setProductSelector: Dispatch<SetStateAction<string | undefined>>;
}

export function ProductList({ setProductSelector }: props) {
	const productsListener = useGetProducts().snap;

	function onClick(id: string) {
		setProductSelector(id);
	}

	return (
		<Container>
			<Title>Productos</Title>
			{productsListener.map((el, i) => {
				const data = el.data();

				return (
					<Button key={i} onClick={() => onClick(el.id)}>
						{data.name} | {data.price} LPS <Select>Seleccionar</Select>
					</Button>
				);
			})}
		</Container>
	);
}
