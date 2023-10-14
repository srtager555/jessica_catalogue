import { getAuth } from "firebase/auth";
import { useRouter } from "next/router";
import { useEffect } from "react";

export function Cataloge() {
	const auth = getAuth();
	const router = useRouter();

	useEffect(() => {
		if (!auth.currentUser) router.push("/");
	}, [auth.currentUser, router]);

	if (!auth.currentUser) return <>Redirrecionando...</>;

	return <>HOOOLA</>;
}
