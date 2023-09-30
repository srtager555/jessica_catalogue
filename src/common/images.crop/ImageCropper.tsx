/* eslint-disable @next/next/no-img-element */
import { ButtonNormal, ContainerGOD, SpaceBeetwenContainer } from "@/styles/index.styles";
import { Dispatch, MouseEvent, MutableRefObject, SetStateAction, useRef } from "react";
import { Crop, PixelCrop, ReactCrop, centerCrop, makeAspectCrop } from "react-image-crop";
import { canvasPreviewData } from "./CanvasPreview";

function centerAspectCrop(mediaWidth: number, mediaHeight: number, aspect: number) {
	return centerCrop(
		makeAspectCrop(
			{
				unit: "%",
				width: 90,
			},
			aspect,
			mediaWidth,
			mediaHeight
		),
		mediaWidth,
		mediaHeight
	);
}

interface props {
	customImageName?: string;
	imageName?: string;
	show: boolean;
	setImageUrl: Dispatch<SetStateAction<File | undefined>>;
	imageSrc: string;
	setImageSrc: Dispatch<SetStateAction<string>>;
	previewCanvasRef: MutableRefObject<HTMLCanvasElement | null>;
	setShowImageCropper: Dispatch<SetStateAction<boolean>>;
	setShowImagePreviewCanvas: Dispatch<SetStateAction<boolean>>;
	crop: Crop | undefined;
	setCrop: Dispatch<SetStateAction<Crop | undefined>>;
	completedCrop: PixelCrop | undefined;
	setCompletedCrop: Dispatch<SetStateAction<PixelCrop | undefined>>;
	aspect: number | undefined;
}

export function ImageCropper({
	customImageName,
	imageName,
	show,
	setImageUrl,
	imageSrc,
	setImageSrc,
	previewCanvasRef,
	setShowImageCropper,
	setShowImagePreviewCanvas,
	crop,
	aspect,
	setCrop,
	completedCrop,
	setCompletedCrop,
}: props) {
	const imgRef = useRef<HTMLImageElement>(null);
	// const blobUrlRef = useRef("");

	function onImageLoad(e: React.SyntheticEvent<HTMLImageElement>) {
		if (aspect) {
			const { width, height } = e.currentTarget;
			setCrop(centerAspectCrop(width, height, aspect));
		}
	}

	function CancelCrop() {
		setImageSrc("");
	}

	function UseImage(e: MouseEvent<HTMLButtonElement>) {
		e.preventDefault();

		if (
			completedCrop?.width &&
			completedCrop?.height &&
			imgRef.current &&
			previewCanvasRef.current
		) {
			// We use canvasPreview as it's much faster than imgPreview.
			canvasPreviewData(imgRef.current, previewCanvasRef.current, completedCrop);

			previewCanvasRef.current.toBlob((blob) => {
				if (!blob) throw new Error("Failed to create blob");

				const blobExtesion = blob.type.split("/")[1];

				const file = new File([blob], `${customImageName ?? imageName}.${blobExtesion}`, {
					lastModified: new Date().getTime(),
					type: blob.type,
				});

				setImageUrl(file);
			});

			setShowImageCropper(false);
			setShowImagePreviewCanvas(true);
		}
	}

	return (
		<ContainerGOD
			styles={{
				position: "fixed",
				bottom: "0px",
				left: "0px",
				width: "100%",
				height: "100vh",
				display: "flex",
				justifyContent: "space-between",
				alignItems: "center",
				flexDirection: "column",
				padding: "20px 20px 0px",
				zIndex: "1000",
				backgroundColor: "#fff",
				opacity: show ? "1" : "0",
				pointerEvents: show ? "auto" : "none",
				transition: "200ms ease-in",
			}}
		>
			<ReactCrop
				style={{ maxWidth: "90%" }}
				crop={crop}
				onChange={(_, percentCrop) => setCrop(percentCrop)}
				onComplete={(c) => setCompletedCrop(c)}
				aspect={aspect}
			>
				<img
					style={{ maxHeight: "80vh" }}
					ref={imgRef}
					alt="Crop me"
					src={imageSrc}
					onLoad={onImageLoad}
				/>
			</ReactCrop>
			<SpaceBeetwenContainer
				styles={{
					flexDirection: "row-reverse",
					width: "100%",
					padding: "15px 20px",
					backgroundColor: "#fff",
				}}
			>
				<ButtonNormal $primary styles={{ width: "47%" }} onClick={UseImage}>
					Utilizar
				</ButtonNormal>
				<ButtonNormal styles={{ width: "47%" }} onClick={CancelCrop}>
					Cancelar
				</ButtonNormal>
			</SpaceBeetwenContainer>
		</ContainerGOD>
	);
}
