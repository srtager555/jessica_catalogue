import { DocumentData, QueryDocumentSnapshot } from "firebase/firestore";
import { Bebas_Neue, Roboto } from "next/font/google";
import { useRouter } from "next/router";
import { useRef, useEffect, useState } from "react";
import { isMobile } from "react-device-detect";
import styled, { css } from "styled-components";

const BebasNeue = Bebas_Neue({ weight: "400", subsets: ["latin"] });
const roboto = Roboto({ weight: "400", subsets: ["latin"] });

const Card = styled.button`
	background-color: transparent;
	border: none;
	cursor: pointer;
	width: 300px;
	justify-self: center;
	margin-bottom: 30px;
	transition: 200ms ease;

	&:active {
		transform: scale(0.9);
	}

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

	& img {
		display: inline-block;
		width: 100%;
	}
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

	& img {
		width: 100px;
	}
`;
const Loader = styled.img`
	position: absolute;
	top: 50%;
	left: 50%;
	transform: translate(-50%, -50%);
`;

interface props {
	data: QueryDocumentSnapshot<product, DocumentData>;
	imagePath?: string;
}

export function ProductCard({ data, imagePath }: props) {
	const { name, price, weight, brand, category: cate } = data.data();
	const [loading, setLoading] = useState(true);
	const [height, setHeight] = useState<number>(0);
	const [move, setMove] = useState({ transform: "translateY(0)" });
	const ref2 = useRef<HTMLDivElement>(null);
	const imgRef = useRef<HTMLImageElement>(null);
	const router = useRouter();

	function productRedirect() {
		router.push("/products/" + data.id);
	}

	useEffect(() => {
		function height() {
			if (!ref2.current) return;

			setHeight(ref2.current.clientWidth);
		}

		height();

		window.addEventListener("resize", height);

		return () => {
			window.removeEventListener("resize", height);
		};
	}, []);

	useEffect(() => {
		function scrollEffect() {
			const img = imgRef.current;
			if (!img) return;

			setMove({
				transform: `translateY(${(img.getBoundingClientRect().top / 10) * -1}px)`,
			});
		}

		if (isMobile) {
			scrollEffect();
			window.addEventListener("scroll", scrollEffect);
		}

		return () => {
			if (isMobile) window.removeEventListener("scroll", scrollEffect);
		};
	}, []);

	return (
		<Card onClick={productRedirect}>
			<DataBox>
				<span className={roboto.className}>{brand}</span>
				<div>
					<span className={roboto.className}>{cate}</span>
					{price && cate ? <> - </> : <></>}
					{price > 0 && <span className={roboto.className}>LPS {price}</span>}
				</div>
			</DataBox>
			<TitleBox>
				<Title className={BebasNeue.className}>{name}</Title>
				<Weight className={BebasNeue.className}>
					{weight} {weight > 1 ? "LBS" : "LB"}
				</Weight>
			</TitleBox>
			<ImageBox ref={ref2} cheight={height}>
				{imagePath && (
					<>
						<LC cargando={loading}>
							{/* eslint-disable-next-line @next/next/no-img-element */}
							<Loader src="/loader.gif" alt="" />
						</LC>
						{/* eslint-disable-next-line @next/next/no-img-element */}
						<img
							src={imagePath}
							onLoad={() => {
								setLoading(false);
							}}
							style={move}
							ref={imgRef}
							alt={name}
						/>
					</>
				)}
			</ImageBox>
		</Card>
	);
}
