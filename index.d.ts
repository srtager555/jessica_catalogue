type children = React.ReactNode | React.ReactNode[] | string | undefiend;

interface product {
	id: string;
	name: string;
	price: number;
	weight: number;
	imagePath: string;
	featured?: boolean;
	category: string;
}
