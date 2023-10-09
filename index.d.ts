type children = React.ReactNode | React.ReactNode[] | string | undefiend;

interface product {
	id: string;
	name: string;
	price: number;
	weight: number;
	featured?: boolean;
	category: string;
	brand?: string;
	img?: string;
	minValue?: number;
}
