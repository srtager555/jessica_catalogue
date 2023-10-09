import { Nav } from "@/components/Nav";
import { RecommendedProducts } from "@/components/RecommendedProducts";
import { SmallNav } from "@/components/smallNav";
import { Firestore } from "@/tools/firestore";
import { getImage } from "@/tools/storage/getImage";
import { DocumentData, DocumentReference, DocumentSnapshot, doc, getDoc } from "firebase/firestore";
import { Bebas_Neue, Roboto } from "next/font/google";
import Image from "next/image";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import styled from "styled-components";

const BebasNeue = Bebas_Neue({ weight: "400", subsets: ["latin"] });
const roboto = Roboto({ weight: "400", subsets: ["latin"] });

const Container = styled.div`
	width: 100%;
	max-width: 1000px;
	margin: 0 auto;
	padding: 10px;
`;

const ProductContainer = styled.div`
	display: flex;
	width: 100%;
	max-width: 700px;
	margin: 0 auto;
	padding: 20px;
	border-radius: 10px;
	background-color: #fff;
`;
const ProductInfo = styled.div`
	display: flex;
	flex-direction: column;
	margin-left: 30px;
	font-family: ${roboto.style.fontFamily};
	font-weight: ${roboto.style.fontWeight};
	font-style: ${roboto.style.fontStyle};

	& h1 {
		font-family: ${BebasNeue.style.fontFamily};
		font-weight: ${BebasNeue.style.fontWeight};
		font-style: ${BebasNeue.style.fontStyle};
	}
`;

const Form = styled.form`
	display: flex;
	flex: 1;
	flex-direction: column;
	justify-content: space-between;
	align-items: flex-start;
	/* height: 100%; */
	width: 100%;
`;

const Button = styled.button`
	display: flex;
	justify-content: center;
	align-items: center;
	border: none;
	border-radius: 10px;
	background-color: #f75e5e;
	color: #fff;
	padding: 10px;
	cursor: pointer;
	transition: 200ms ease;

	&:active {
		transform: scale(0.9);
	}
`;

const Text = styled.p`
	margin-bottom: 10px;
`;

export default function Products() {
	const [entry, setEntry] = useState("");
	const [productData, setProductData] = useState<product>();
	const [product, setProduct] = useState<DocumentSnapshot<product, DocumentData>>();
	const [imagePath, setImagePath] = useState("");
	const db = Firestore();
	const router = useRouter();
	const { id } = router.query;

	function handlerOnSubmit(e: any) {
		e.preventDefault();
	}

	useEffect(() => {
		async function getProduct() {
			const docref = doc(db, "/products/" + id) as DocumentReference<product>;

			const data = await getDoc(docref);
			const content = data.data();

			setProduct(data);
			setProductData(content);
		}

		getProduct();
	}, [db, id]);

	useEffect(() => {
		async function image() {
			if (!id) return;

			const imagePath = await getImage("/products/" + id + "/thumbnails/product_300x300");

			setImagePath(imagePath);
		}

		image();
	}, [id]);

	if (!product || !productData) return "404";

	return (
		<>
			<SmallNav />
			<Container>
				<ProductContainer>
					<Image
						src={imagePath}
						alt=""
						width="1000"
						height="1000"
						style={{ width: "40%", height: "auto" }}
					/>
					<ProductInfo>
						<h1>{productData.name}</h1>
						{productData.brand && (
							<Text>
								<b>Marca:</b>
								{" " + productData.brand}
							</Text>
						)}

						<Text>
							<b>
								Cada unidad pesa {productData.weight}{" "}
								{productData.weight === 1 ? "LB" : "LBS"}
							</b>
						</Text>

						<Form onSubmit={handlerOnSubmit}>
							<label>
								Cantidad:
								<input
									style={{ width: "100px", marginLeft: "10px" }}
									type="number"
									defaultValue={1}
									min={productData.minValue ?? 1}
								/>
							</label>
							<div>
								<Button>
									Añadir{" "}
									<Image
										style={{ marginLeft: "10px" }}
										src="/svg/addShopping_white.svg"
										height="20"
										width="20"
										alt=""
									/>
								</Button>
							</div>
						</Form>
					</ProductInfo>
				</ProductContainer>
				<RecommendedProducts currentProduct={product} />
			</Container>
		</>
	);
}
