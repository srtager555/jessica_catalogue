import { useGetProducts } from "@/hooks/useGetProducts";
import { Dispatch, SetStateAction } from "react";

interface props {
	setProductSelector: Dispatch<SetStateAction<string | undefined>>;
}

export function ProductList({ setProductSelector }: props) {
	const productsListener = useGetProducts().snap;

	function onClick(id: string) {
		setProductSelector(id);
	}

	return (
		<div>
			{productsListener.map((el, i) => {
				const data = el.data();

				return (
					<button key={i} onClick={() => onClick(el.id)}>
						{data.name} | {data.price}
					</button>
				);
			})}
		</div>
	);
}
