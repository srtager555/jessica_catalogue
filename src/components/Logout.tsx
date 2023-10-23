import { Button } from "@/styles/index.styles";
import { getAuth, signOut } from "firebase/auth";
import styled from "styled-components";

const Container = styled.div`
	position: fixed;
	top: 0%;
	right: 0%;
`;

export function Logout() {
	const auth = getAuth();

	function logout() {
		signOut(auth);
	}

	return (
		<Container>
			<Button onClick={logout}>Cerrar sesion</Button>
		</Container>
	);
}
