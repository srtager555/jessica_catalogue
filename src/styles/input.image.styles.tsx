import styled, { css } from "styled-components";
import { FlexContainer, StyledDiv } from "./index.styles";
import { color } from "@/common/colors";

export const InputContainer = styled(StyledDiv)`
	/* margin-bottom: 20px; */
	text-align: center;
`;

export const PreviewContainer = styled(StyledDiv)<{ showImagePreviewCanvas: boolean }>(
	({ showImagePreviewCanvas }) =>
		!showImagePreviewCanvas && { visibility: "hidden", display: "none !important" }
);

export const ImageContainer = styled(FlexContainer)`
	justify-content: center;
	align-items: center;
	border: dashed 3px ${color.main};
	${({ styles }) =>
		styles?.borderRadius
			? css`
					border-radius: ${styles?.borderRadius};
			  `
			: css`
					border-radius: 100%;
			  `};
`;

export const InputPreview = styled(StyledDiv)<{
	showImagePreviewCanvas: boolean;
}>(
	({ showImagePreviewCanvas }) =>
		showImagePreviewCanvas && {
			opacity: "0",
			display: "none",
			visibility: "hidden",
		}
);
