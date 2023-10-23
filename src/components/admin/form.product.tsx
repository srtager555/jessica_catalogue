import { Form, FlexContainer } from "@/styles/index.styles";
import styled from "styled-components";
import { InputImage } from "../InputImage";
import { collection, CollectionReference, deleteDoc, doc, onSnapshot } from "firebase/firestore";
import {
	Dispatch,
	FormEvent,
	MouseEvent,
	SetStateAction,
	useContext,
	useEffect,
	useState,
} from "react";
import { cate } from "./deleteCat.form";
import { Firestore } from "@/tools/firestore";
import { AdminContext } from "@/layout/admin";
import { getImage } from "@/tools/storage/getImage";
import { useRouter } from "next/router";
import { Storage } from "@/tools/storage";
import { deleteObject, ref } from "firebase/storage";

const flexProps = {
	styles: {
		justifyContent: "space-between",
		alignItems: "center",
	},
};

const Container = styled.div`
	display: flex;
	justify-content: center;
`;

const Names = styled.p`
	text-align: end;
	margin-bottom: 20px;
	margin-right: 20px;
`;

const Input = styled.input<{ m?: boolean }>`
	display: block;
	margin-bottom: ${({ m }) => (m ? "0" : "20px")};
`;

interface props {
	loading: boolean;
	callback: (
		e: FormEvent,
		imageURl: File | undefined,
		setError: Dispatch<SetStateAction<string | undefined>>,
		setRefreshImage: Dispatch<SetStateAction<boolean>>
	) => void;
	edit?: boolean;
}

export function FormProduct({ loading, callback, edit }: props) {
	const [defaultEditData, setDefaultEditData] = useState<product>();
	const [defaultImage, setDefaultImage] = useState<string>();
	const [imageURl, setImageUrl] = useState<File>();
	const [refreshImage, setRefreshImage] = useState<boolean>(false);
	const [refreshInputs, setRefreshInputs] = useState<boolean>(false);
	const [categories, setCategories] = useState<cate[]>([]);
	const [error, setError] = useState<string>();
	const db = Firestore();
	const storage = Storage();
	const router = useRouter();
	const adminContext = useContext(AdminContext);

	function onSubmit(e: FormEvent) {
		e.preventDefault();

		callback(e, imageURl, setError, setRefreshImage);
	}

	async function deleteProduct(e: MouseEvent<HTMLButtonElement, globalThis.MouseEvent>) {
		e.preventDefault();

		if (adminContext?.productSelector?.id) {
			await deleteDoc(doc(db, "/products/" + adminContext.productSelector.id)).then(
				async () => {
					if (adminContext?.productSelector?.id) {
						const thumbnailsImageRef300x300 = ref(
							storage,
							`products/${adminContext.productSelector.id}/thumbnails/product_300x300`
						);

						await deleteObject(thumbnailsImageRef300x300)
							.then(() => {
								router.push("/admin/");
							})
							.catch((e) => console.log(e));
					}
				}
			);
		}
	}

	useEffect(() => {
		// refresh input image xdxdxd

		setTimeout(() => setRefreshImage(false));
	}, [refreshImage]);

	useEffect(() => {
		const cateColl = collection(db, "/categories") as CollectionReference<cate>;

		const unsubcribe = onSnapshot(cateColl, (snap) => {
			setCategories([]);

			snap.forEach((el) => {
				const data = el.data();

				setCategories((prev) => [...prev, data]);
			});
		});

		return () => {
			unsubcribe();
		};
	}, [db]);

	// product selector listener
	useEffect(() => {
		async function getProduct() {
			const product = adminContext?.productSelector;

			if (!product) return;

			setDefaultEditData(product.data());

			setDefaultImage(await getImage(`/products/${product.id}/thumbnails/product_300x300`));

			setRefreshInputs(true);
		}

		getProduct();
	}, [adminContext?.productSelector]);

	useEffect(() => {
		if (router.asPath != "/admin/edit") return;

		if (refreshInputs) setRefreshInputs(false);
	}, [refreshInputs, router.asPath]);

	useEffect(() => {
		if (router.asPath === "/admin/edit" || router.asPath === "/admin/edit/") return;

		setTimeout(() => {
			setDefaultImage(undefined);
			setDefaultEditData(undefined);
			setRefreshInputs(false);
			adminContext?.setProductSelector(undefined);
		}, 200);

		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [adminContext?.setProductSelector, router.asPath]);

	return edit && !defaultEditData ? (
		<>Para comenzar debes de seleccionar un producto a la izquierda</>
	) : (
		!refreshInputs && (
			<Form
				// @ts-ignore
				disabled={loading}
				loading={loading}
				onSubmit={onSubmit}
				style={{ marginBottom: "100px" }}
			>
				{error && <p style={{ marginBottom: "20px", color: "red" }}>{error}</p>}
				<FlexContainer styles={{ ...flexProps.styles, marginBottom: "40px" }}>
					{!refreshImage && (
						<div style={{ height: "130px" }}>
							<InputImage
								borderRadius="10px"
								setImageUrl={setImageUrl}
								customImageName="image"
								previewImage={defaultImage}
								ratio={1 / 1.2}
								height="100%"
								minHeight="130px"
								// minWidth="110px"
							/>
						</div>
					)}
					<Container>
						<div>
							<Names>Nombre</Names>
							<Names>Precio (opcional)</Names>
							<Names>Peso en libras</Names>
							<Names>Marca (opcional)</Names>
						</div>
						<div>
							<>
								<Input
									type="text"
									required={!edit}
									name="productName"
									defaultValue={
										defaultEditData?.name ? defaultEditData?.name : ""
									}
								/>
								<Input
									type="number"
									// required={!edit}
									name="price"
									defaultValue={
										defaultEditData?.price ? defaultEditData?.price : ""
									}
								/>
								<Input
									type="number"
									required={!edit}
									name="weight"
									defaultValue={
										defaultEditData?.weight ? defaultEditData?.weight : ""
									}
								/>
								<Input
									type="text"
									name="brand"
									defaultValue={
										defaultEditData?.brand ? defaultEditData?.brand : ""
									}
								/>
							</>
						</div>
					</Container>
				</FlexContainer>
				<FlexContainer styles={{ ...flexProps.styles }}>
					<select
						name="category"
						defaultValue={defaultEditData?.category ? defaultEditData?.category : ""}
					>
						{categories?.length > 0 ? (
							<option value="">Selecciona una categoria</option>
						) : (
							<option value="">No hay categorias</option>
						)}
						{categories.map((el, i) => (
							<option key={i} defaultValue={el.name}>
								{el.name}
							</option>
						))}
					</select>
					<div>
						{adminContext?.productSelector && (
							<button
								style={{
									marginRight: "10px",
									display: "inline-block",
									color: "red",
								}}
								onClick={deleteProduct}
							>
								Eliminar producto
							</button>
						)}
						<button>{edit ? "Actualizar" : "Crear"}</button>
					</div>
				</FlexContainer>
			</Form>
		)
	);
}
