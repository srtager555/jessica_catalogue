import { getApp } from "firebase/app";
import { User, getAuth, onAuthStateChanged } from "firebase/auth";
import { useEffect, useState } from "react";

export function useAuthUserListener() {
	const [user, setUser] = useState<User | null>(null);
	const auth = getAuth();

	useEffect(() => {
		const unsubcribe = onAuthStateChanged(auth, (snap) => {
			setUser(snap);
		});

		return function () {
			unsubcribe();
		};
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	return user;
}
