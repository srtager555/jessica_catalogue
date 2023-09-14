import { Title, Form, FlexContainer } from "@/styles/index.styles";
import { Firestore } from "@/tools/firestore";
import {
	CollectionReference,
	collection,
	deleteDoc,
	deleteField,
	getDocs,
	onSnapshot,
	query,
	updateDoc,
	where,
} from "firebase/firestore";
import { FormEvent, useEffect, useState } from "react";

type cate = {
	name: string;
};

const flexProps = {
	styles: {
		justifyContent: "space-between",
		alignItems: "start",
	},
};

export function DeleteCat() {
	const [categories, setCategories] = useState<cate[]>([]);
	const db = Firestore();

	async function deleteCat(e: FormEvent) {
		e.preventDefault();

		const target = e.currentTarget as typeof e.currentTarget & {
			select: HTMLSelectElement;
		};

		const selected = target.select.value;

		// logic to removed this category from each doc
		const prodColl = collection(db, "/products") as CollectionReference<product>;
		const productsWithTheCat = await getDocs(
			query(prodColl, where("category", "==", selected))
		);

		productsWithTheCat.forEach(async (el) => {
			await updateDoc(el.ref, {
				category: deleteField(),
			});
		});

		console.log(selected);

		// removed the category

		const cateColl = collection(db, "/categories") as CollectionReference<cate>;
		const q = query(cateColl, where("name", "==", selected));
		const querySnapshot = await getDocs(q);

		querySnapshot.forEach(async (el) => {
			await deleteDoc(el.ref);
		});

		// //@ts-ignore
		e.target.reset();
	}

	useEffect(() => {
		const coll = collection(db, "/categories");

		const unsubcribe = onSnapshot(coll, (snap) => {
			setCategories([]);
			snap.forEach((el) =>
				setCategories((prev) => {
					const newData = (el.data() as cate) ?? {};

					return [...prev, newData];
				})
			);
		});

		return () => unsubcribe();
	}, [db]);

	return (
		<>
			<Title>Eliminar una Categoria</Title>
			<Form onSubmit={deleteCat}>
				<p style={{ marginBottom: "10px", color: "red" }}>
					Advertencia: Se eliminar esta categoria de cada producto que la contenga
				</p>
				<FlexContainer {...flexProps}>
					<select name="select" required>
						<option>Selecciona una categoria</option>
						{categories?.map((el, i) => (
							<option key={i} value={el.name}>
								{el.name}
							</option>
						))}
					</select>
					<button>Eliminar</button>
				</FlexContainer>
			</Form>
		</>
	);
}
