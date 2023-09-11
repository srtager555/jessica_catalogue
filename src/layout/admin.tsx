import { LogIn } from "@/components/Login";
import { Nav } from "@/components/admin/Nav";
import { ProductList } from "@/components/productList";
import { useAuthUserListener } from "@/hooks/useAuth";
import { Container } from "@/styles/index.styles";
import { useRouter } from "next/router";
import { Dispatch, SetStateAction, createContext, useEffect, useState } from "react";
import styled from "styled-components";

const Content = styled.div`
	display: flex;
	max-width: 950px;
	margin: 0 auto;
`;

interface props {
	children: children;
}

export const AdminContext = createContext<{
	productSelector: string | undefined;
	setProductSelector: Dispatch<SetStateAction<string | undefined>>;
} | null>(null);

export function AdminLayout({ children }: props) {
	const [productSelector, setProductSelector] = useState<string>();
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
		<AdminContext.Provider value={{ productSelector, setProductSelector }}>
			<Container>
				<Nav />
				<Content>
					<ProductList setProductSelector={setProductSelector} />
					{children}
				</Content>
			</Container>
		</AdminContext.Provider>
	);
}
