import { LogIn } from "@/components/Login";
import { useAuthUserListener } from "@/hooks/useAuth";
import { getAuth } from "firebase/auth";
import { useEffect } from "react";

export default function Admin() {
	const auth = useAuthUserListener();

	if (!auth) return <LogIn />;

	return <>Admin</>;
}
