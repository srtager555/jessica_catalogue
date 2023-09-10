import { LogIn } from "@/components/Login";
import { Nav } from "@/components/admin/Nav";
import { useAuthUserListener } from "@/hooks/useAuth";
import { Container } from "@/styles/index.styles";
import { getAuth } from "firebase/auth";
import { useEffect } from "react";

export default function Admin() {
	const auth = useAuthUserListener();

	if (!auth) return <LogIn />;

	return (
		<Container>
			<Nav />
		</Container>
	);
}
