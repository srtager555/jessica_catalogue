import { Title, FlexContainer, Form, Input } from "@/styles/index.styles";
import { Firestore } from "@/tools/firestore";
import { collection, getDocs, addDoc } from "firebase/firestore";
import { FormEvent, useState } from "react";

const flexProps = {
	styles: {
		justifyContent: "space-between",
		alignItems: "start",
	},
};

export function CreateCategory() {
	const [error, setError] = useState<string>();
	const db = Firestore();

	async function addCategory(e: FormEvent) {
		e.preventDefault();

		const target = e.currentTarget as typeof e.currentTarget & {
			cate: HTMLInputElement;
		};

		const value = target.cate.value;

		if (value === "" || value === undefined) return;

		const coll = collection(db, "/categories");

		const docsColl = await getDocs(coll);

		const isThere = docsColl.docs.find((el) => el.data().name === value);

		if (isThere) return setError("Ya hay una categoria con este nombre");

		await addDoc(coll, {
			name: value,
		});

		//@ts-ignore
		e.target.reset();
		if (error != undefined) setError(undefined);
	}

	return (
		<>
			<Title>Crear una nueva Categoria</Title>
			<Form onSubmit={addCategory}>
				{error && <p style={{ marginBottom: "10px", color: "red" }}>{error}</p>}
				<FlexContainer {...flexProps}>
					<div>
						<p style={{ marginBottom: "10px" }}>Nombre de la categoria</p>

						<Input m name="cate" />
					</div>
					<button>Crear</button>
				</FlexContainer>
			</Form>
		</>
	);
}
