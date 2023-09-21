import { Bebas_Neue, Roboto } from "next/font/google";
import Image from "next/image";
import { useRef, useEffect, useState } from "react";
import styled from "styled-components";

const BebasNeue = Bebas_Neue({ weight: "400", subsets: ["latin"] });
const roboto = Roboto({ weight: "400", subsets: ["latin"] });

const Card = styled.div`
	width: 300px;
	justify-self: center;
	margin-bottom: 30px;

	@media (max-width: 700px) {
		width: 250px;
	}

	@media (max-width: 580px) {
		width: 200px;
	}

	@media (max-width: 480px) {
		width: 100%;
	}
`;

const TitleBox = styled.div`
	/* width: 300px; */
	display: flex;
	justify-content: space-between;
	align-items: flex-end;
`;

const DataBox = styled.div`
	/* width: 300px; */
	display: flex;
	justify-content: space-between;
	align-items: center;
`;

const Title = styled.h3`
	display: inline;
	font-size: 2rem;
	margin: 0;
`;

const Weight = styled.span`
	font-size: 1.5rem;
`;

const ImageBox = styled.div<{ cheight: number }>`
	position: relative;
	width: inherit;
	height: ${({ cheight }) => cheight}px;

	& img {
		width: 100% !important;
		height: 100% !important;
	}
`;

interface props {
	name: string;
	price: number;
	weight: number;
	brand?: string;
	imagePath?: string;
}

export function ProductCard({ name, price, weight, brand, imagePath }: props) {
	const [height, setHeight] = useState<number>(0);
	const ref = useRef<HTMLDivElement>(null);

	useEffect(() => {
		function height() {
			if (!ref.current) return;

			console.log(ref.current.clientWidth);

			setHeight(ref.current.clientWidth);
		}

		window.addEventListener("resize", height);

		return () => {
			window.removeEventListener("resize", height);
		};
	}, []);

	return (
		<Card>
			<DataBox>
				<span className={roboto.className}>{brand}</span>
				<span className={roboto.className}>LPS {price}</span>
			</DataBox>
			<TitleBox>
				<Title className={BebasNeue.className}>{name}</Title>
				<Weight className={BebasNeue.className}>
					{weight} {weight > 1 ? "LBS" : "LB"}
				</Weight>
			</TitleBox>
			<ImageBox ref={ref} cheight={height}>
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
