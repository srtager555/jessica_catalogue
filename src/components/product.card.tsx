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
	display: flex;
	align-items: center;
	position: relative;
	width: inherit;
	height: ${({ cheight }) => cheight}px;
	overflow: hidden;
	background-color: #fff;
`;

interface props {
	name: string;
	price: number;
	weight: number;
	brand?: string;
	cate: string;
	imagePath?: string;
}

export function ProductCard({ name, price, weight, brand, cate, imagePath }: props) {
	const [height, setHeight] = useState<number>(0);
	const ref = useRef<HTMLDivElement>(null);

	useEffect(() => {
		function height() {
			if (!ref.current) return;

			setHeight(ref.current.clientWidth);
		}

		height();

		window.addEventListener("resize", height);

		return () => {
			window.removeEventListener("resize", height);
		};
	}, []);

	return (
		<Card>
			<DataBox>
				<span className={roboto.className}>{brand}</span>
				<div>
					{typeof cate != "undefined" && (
						<span className={roboto.className}>{cate} - </span>
					)}
					<span className={roboto.className}>LPS {price}</span>
				</div>
			</DataBox>
			<TitleBox>
				<Title className={BebasNeue.className}>{name}</Title>
				<Weight className={BebasNeue.className}>
					{weight} {weight > 1 ? "LBS" : "LB"}
				</Weight>
			</TitleBox>
			<ImageBox ref={ref} cheight={height}>
				{imagePath && (
					<Image
						src={imagePath}
						layout="responsive"
						width={1500}
						height={300}
						placeholder="blur"
						blurDataURL={imagePath}
						alt={name}
					/>
				)}
			</ImageBox>
		</Card>
	);
}
