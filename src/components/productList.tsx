import { useGetProducts } from "@/hooks/useGetProducts";
import { Title } from "@/styles/index.styles";
import { searchProduct } from "@/tools/searchProduct";
import { DocumentData, QueryDocumentSnapshot } from "firebase/firestore";
import { useRouter } from "next/router";
import { ChangeEvent, Dispatch, SetStateAction, useEffect, useRef, useState } from "react";
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

	/* @media (prefers-color-scheme: dark) {
			background-color: #001620;
		} */
`;

const Select = styled.span`
	font-style: italic;
`;

const Input = styled.input`
	display: block;
	padding: 15px 10px;
	border: none;
	background-color: #fff;
	width: 100%;
	margin-bottom: 20px;

	/* @media (prefers-color-scheme: dark) {
		background-color: #001620;
	} */
`;

interface props {
	setProductSelector: Dispatch<
		SetStateAction<QueryDocumentSnapshot<product, DocumentData> | undefined>
	>;
}

export function ProductList({ setProductSelector }: props) {
	const productsListener = useGetProducts().snap;
	const [products, setProducts] = useState<typeof productsListener>([]);
	const router = useRouter();

	function onClick(snap: QueryDocumentSnapshot<product, DocumentData>) {
		if (router.asPath === "/admin/" || router.asPath === "/admin") {
			router.push("/admin/edit");

			setTimeout(() => {
				setProductSelector(snap);
			}, 500);
		} else {
			setProductSelector(snap);
		}
	}

	function onChange(e: ChangeEvent<HTMLInputElement>) {
		e.preventDefault();
		const value = e.target.value;

		if (value === "")
			setProducts(
				productsListener
					.sort((a, b) => {
						if (typeof a.data().price !== "number") return 1;
						else if (typeof b.data().price != "number") return 1;
						else return 0;
					})
					.slice(0, 10)
			);
		else {
			setProducts(searchProduct(value, productsListener, 0.2)?.byName ?? []);
		}
	}

	useEffect(() => {
		setProducts(
			productsListener
				.sort((a, b) => {
					if (typeof a.data().price !== "number") return 1;
					else if (typeof b.data().price != "number") return 1;
					else return 0;
				})
				.slice(0, 10)
		);
	}, [productsListener]);

	return (
		<Container>
			<Title>Productos</Title>
			<Input onChange={onChange} type="text" placeholder="Buscar producto" />
			{products.map((el, i) => {
				const data = el.data();

				return (
					<Button key={i} onClick={() => onClick(el)}>
						<div>
							{data.brand && (
								<>
									<span>{data.brand}</span>
									<br />
								</>
							)}

							{data.name}
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
