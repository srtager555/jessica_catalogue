import { User, getAuth, onAuthStateChanged } from "firebase/auth";
import { useEffect, useState } from "react";
import styled from "styled-components";

const Main = styled.div``;

export default function Cataloge() {
	const [user, setUser] = useState<User>();
	const auth = getAuth();

	useEffect(() => {
		const unsub = onAuthStateChanged(auth, (u) => {
			if (!u) return setUser(undefined);

			setUser(u);
		});

		return () => unsub();
	}, [auth]);

	if (!user) return <>acceso denegado...</>;

	return (
		<Main>
			<p>Para poder ver una vista previa del catalogo presione: ctrl + p</p>
		</Main>
	);
}
