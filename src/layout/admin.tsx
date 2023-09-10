import { LogIn } from "@/components/Login";
import { Nav } from "@/components/admin/Nav";
import { useAuthUserListener } from "@/hooks/useAuth";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

interface props {
	children: children;
}

export function AdminLayout({ children }: props) {
	const [show, setShow] = useState(false);
	const router = useRouter();
	const auth = useAuthUserListener();

	useEffect(() => {
		const path = router.asPath;
		const matches = [
			"/admin",
			"/admin/",
			"/admin/edit",
			"/admin/edit/",
			"/admin/featured",
			"/admin/featured/",
		];
		const conditional = matches.some((el) => path.match(el));

		if (conditional) setShow(true);
		else setShow(false);
	}, [router.asPath]);

	if (!show) return <>{children}</>;

	if (show && !auth) return <LogIn />;

	return (
		<>
			<Nav />
			{children}
		</>
	);
}
