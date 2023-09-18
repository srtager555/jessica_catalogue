import { useGetProducts } from "@/hooks/useGetProducts";
import { Title } from "@/styles/index.styles";
import { DocumentData, QueryDocumentSnapshot } from "firebase/firestore";
import { useRouter } from "next/router";
import { Dispatch, SetStateAction } from "react";
import styled from "styled-components";

const Container = styled.div`
	width: 40%;
	margin-right: 50px;
`;

const Button = styled.button`
	display: flex;
	justify-content: space-between;
	align-items: center;
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
	setProductSelector: Dispatch<
		SetStateAction<QueryDocumentSnapshot<product, DocumentData> | undefined>
	>;
}

export function ProductList({ setProductSelector }: props) {
	const productsListener = useGetProducts().snap;
	const router = useRouter();

	function onClick(snap: QueryDocumentSnapshot<product, DocumentData>) {
		router.push("/admin/edit");

		setTimeout(() => {
			setProductSelector(snap);
		}, 500);
	}

	return (
		<Container>
			<Title>Productos</Title>
			{productsListener.map((el, i) => {
				const data = el.data();

				return (
					<Button key={i} onClick={() => onClick(el)}>
						<div>
							{data.brand && `${data.brand} | `} {data.name}
							<span style={{ display: "block", marginTop: "5px" }}>
								{data.price} LPS
							</span>
						</div>
						<Select>Selec.</Select>
					</Button>
				);
			})}
		</Container>
	);
}
