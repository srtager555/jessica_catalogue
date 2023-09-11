/* eslint-disable no-mixed-spaces-and-tabs */
import "react-image-crop/dist/ReactCrop.css";
import { Crop, PixelCrop } from "react-image-crop";
import { ChangeEvent, Dispatch, MouseEvent, SetStateAction, useRef, useState } from "react";
import Image from "next/image";
import styled from "styled-components";
import { ButtonNormal, ContainerGOD, FlexContainer, SquareImage } from "@/styles/index.styles";
import {
	ImageContainer,
	InputContainer,
	InputPreview,
	PreviewContainer,
} from "@/styles/input.image.styles";
import { CanvasPreview } from "@/common/images.crop/CanvasPreview";
import { ImageCropper } from "@/common/images.crop/ImageCropper";
import { color } from "@/common/colors";

const Input = styled.input`
	position: absolute;
	width: 100%;
	height: 100%;
	opacity: 0;
	cursor: pointer;
`;

interface props {
	setChangesDetected?: Dispatch<SetStateAction<boolean>>;
	customImageName?: string;
	ratio?: number;
	width?: string;
	height?: string;
	minHeight?: string;
	minWidth?: string;
	borderRadius?: string;
	previewImage?: string;
	previewText?: { show: boolean; text: string };
	setImageUrl: Dispatch<SetStateAction<File | undefined>>;
}

/**
 * @param setChangesDetected An useState to detected if the file has been changed
 * @param customImageName the name to the image, the default is the default name
 * @param ratio the ratio to crop the image, the default is 1 / 1
 * A component to crop and save image in the storage, each param is a string
 * @param width add a value to avoid the default value
 * @param height add a value to avoid the default value
 * @param minHeight Add a custom min-height
 * @param minWidth Add a custom min-width
 * @param borderRadius btuh
 * @param previewImage An image url to show instead of the upload image icon
 * @param setImageUrl The file create wih ImageCropper
 * @returns An input to use images from the storage's device
 */

export function InputImage(props: props) {
	const {
		setChangesDetected,
		customImageName,
		ratio = 1 / 1,
		setImageUrl,
		borderRadius,
		previewImage,
		previewText,
		width,
		minWidth,
		height,
		minHeight,
	} = props;
	const previewCanvasRef = useRef<HTMLCanvasElement>(null);
	const inputFileRef = useRef<HTMLInputElement>(null);
	const [imageName, setImageName] = useState<string>();
	const [imageSrc, setImageSrc] = useState("");
	const [crop, setCrop] = useState<Crop>();
	const [showImageCropper, setShowImageCropper] = useState(true);
	const [showImagePreviewCanvas, setShowImagePreviewCanvas] = useState(false);
	const [completedCrop, setCompletedCrop] = useState<PixelCrop>();

	function handlerOnChange(e: ChangeEvent<HTMLInputElement>) {
		e.preventDefault();

		if (e.target.files && e.target.files.length > 0) {
			// detect changes
			if (setChangesDetected) setChangesDetected(true);

			setImageName(e.target.files[0].name.split(".")[0]);
			setCrop(undefined); // Makes crop preview update between images.
			const reader = new FileReader();

			reader.addEventListener("load", () => setImageSrc(reader.result?.toString() || ""));
			reader.readAsDataURL(e.target.files[0]);

			if (!showImageCropper) setShowImageCropper(true);
		}
	}

	function changeCurrentImage(e: MouseEvent<HTMLButtonElement>) {
		e.preventDefault();

		if (!inputFileRef.current) return;

		inputFileRef.current.click();
	}

	return (
		<>
			<ImageCropper
				customImageName={customImageName}
				imageName={imageName}
				show={(imageSrc && showImageCropper) === true}
				setImageUrl={setImageUrl}
				imageSrc={imageSrc}
				setImageSrc={setImageSrc}
				previewCanvasRef={previewCanvasRef}
				setShowImageCropper={setShowImageCropper}
				setShowImagePreviewCanvas={setShowImagePreviewCanvas}
				crop={crop}
				setCrop={setCrop}
				completedCrop={completedCrop}
				setCompletedCrop={setCompletedCrop}
				aspect={ratio}
			/>
			<InputContainer styles={{ width: width ?? "auto", height: height ?? "auto" }}>
				<PreviewContainer
					styles={{ width: width ?? "auto", height: height ?? "auto" }}
					showImagePreviewCanvas={showImagePreviewCanvas}
				>
					<ImageContainer
						styles={{
							width: width ? "100%" : "110px",
							height: height ? "100%" : "110px",
							margin: "0 auto 10px",
							borderRadius,
							minWidth,
							minHeight,
							pointerEvents: "none",
						}}
					>
						<ContainerGOD
							styles={{
								width: "90%",
								height: "90%",
								borderRadius: "inherit",
								overflow: "hidden",
							}}
						>
							<CanvasPreview
								show={showImagePreviewCanvas}
								canvasRef={previewCanvasRef}
							/>
						</ContainerGOD>
					</ImageContainer>
					<ButtonNormal onClick={changeCurrentImage}>Cambiar imagen</ButtonNormal>
				</PreviewContainer>
				<InputPreview
					styles={{ width: width ?? "auto", height: height ?? "auto" }}
					showImagePreviewCanvas={showImagePreviewCanvas}
				>
					<ImageContainer
						styles={{
							color: color.main,
							fontSize: "2.3rem",
							borderRadius,
							width: width ? "100%" : "110px",
							height: height ? "100%" : "110px",
							margin: "0 auto",
						}}
					>
						<FlexContainer
							styles={{
								justifyContent: "center",
								alignItems: "center",
								width: `90%`,
								height: "90%",
								borderRadius: "inherit",
								overflow: "hidden",
							}}
						>
							{previewImage ? (
								<SquareImage src={previewImage} alt="" />
							) : (
								<Image
									width="48"
									height="48"
									src="/svg/uploadImage.svg"
									alt="upload image"
								/>
							)}
						</FlexContainer>
						<Input
							ref={inputFileRef}
							onChange={handlerOnChange}
							type="file"
							accept=".jpg, .png, .jpeg"
						/>
					</ImageContainer>
					{!previewImage &&
						(previewText ? !previewText.show && previewText.text : "Agrega una imagen")}
				</InputPreview>
			</InputContainer>
		</>
	);
}
