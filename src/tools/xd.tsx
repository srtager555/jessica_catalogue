import { Firestore } from "@/tools/firestore";
import { lol } from "@/tools/product.create";
import { useEffect } from "react";

export default function Xd() {
	const db = Firestore();
	useEffect(() => {
		lol();
	});
	return <>{"?"}</>;
}
