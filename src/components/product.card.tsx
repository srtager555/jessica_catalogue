import { Bebas_Neue, Roboto } from "next/font/google";
import Image from "next/image";
import styled from "styled-components";

const BebasNeue = Bebas_Neue({ weight: "400", subsets: ["latin"] });
const roboto = Roboto({ weight: "400", subsets: ["latin"] });

const Card = styled.div`
	width: 300px;
	justify-self: center;
`;

const TitleBox = styled.div`
	/* width: 300px; */
	display: flex;
	justify-content: space-between;
	align-items: flex-end;
`;

const Title = styled.h3`
	display: inline;
	font-size: 2rem;
	margin: 0;
`;

const Weight = styled.span`
	font-size: 1.5rem;
`;

const Price = styled.span`
	display: block;
	text-align: end;
`;

const ImageBox = styled.div`
	position: relative;
	width: 300px;
	height: 300px;
`;

interface props {
	name: string;
	price: number;
	weight: number;
	imagePath: string;
}

export function ProductCard({ name, price, weight, imagePath }: props) {
	return (
		<Card>
			<Price className={roboto.className}>LPS {price}</Price>
			<TitleBox>
				<Title className={BebasNeue.className}>{name}</Title>
				<Weight className={BebasNeue.className}>
					{weight} {weight > 1 ? "LBS" : "LB"}
				</Weight>
			</TitleBox>
			<ImageBox>
				<Image
					src={
						imagePath ??
						"https://i.ibb.co/VN0q6r2/9-C4-FB247-B3067-AE137-DACCFFBF98-E5-C2-DF85505-D.jpg"
					}
					fill
					alt={name}
				/>
			</ImageBox>
		</Card>
	);
}
