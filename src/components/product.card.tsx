import { Bebas_Neue, Roboto } from "next/font/google";
import Image from "next/image";
import { useRef, useEffect, useState } from "react";
import styled, { css } from "styled-components";

import loader from "@/../public/loader.gif";

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

const LC = styled.div<{ cargando: boolean }>`
	position: absolute;
	top: 0%;
	left: 0%;
	width: 100%;
	height: 100%;
	transition: 1000ms ease-in;
	background-color: #fff;

	${({ cargando }) => {
		if (cargando)
			return css`
				opacity: 1;
			`;
		else
			return css`
				opacity: 0;
			`;
	}}
`;
const Loader = styled(Image)`
	position: absolute;
	top: 50%;
	left: 50%;
	transform: translate(-50%, -50%);
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
	const [loading, setLoading] = useState(true);
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
					<>
						<LC cargando={loading}>
							<Loader
								src="/loader.gif"
								width={100}
								height={100}
								style={{
									maxWidth: "100%",
									height: "auto",
								}}
								alt=""
							/>
						</LC>
						<Image
							src={imagePath}
							layout="responsive"
							width={1500}
							height={300}
							onLoad={() => {
								setLoading(false);
							}}
							alt={name}
							style={{
								maxWidth: "100%",
								height: "auto",
							}}
						/>
					</>
				)}
			</ImageBox>
		</Card>
	);
}
