/* eslint-disable react/display-name */
import { Bebas_Neue } from "next/font/google";
import { MutableRefObject, forwardRef, LegacyRef } from "react";
import styled, {
	CSSObject,
	CSSProperties,
	DefaultTheme,
	ThemedStyledProps,
	css,
} from "styled-components";
import { Roboto } from "next/font/google";
import { color } from "@/common/colors";

const roboto = Roboto({ weight: "400", subsets: ["latin"] });
const BebasNeue = Bebas_Neue({ weight: "400", subsets: ["latin"] });
const BTNDefaultPadding = { padding: "9px 12px" };

export const Container = styled.div`
	padding: 20px;
	width: 100%;
`;

export const ProductContainer = styled.div`
	display: flex;
	justify-content: space-around;
	align-items: flex-start;
	flex-wrap: wrap;
	width: 100%;
`;

export const Background = styled.div`
	position: fixed;
	top: 0;
	left: 0;
	height: 100vh;
	width: 100%;
	background: linear-gradient(45deg, var(--bg-color) 0%, var(--bg-color-2) 100%);
	z-index: -1;
`;

export const Button = styled.button`
	display: inline-block;
	padding: 10px;
	background-color: #fff;
	border: none;
	border-radius: 10px;
	cursor: pointer;
	transition: 200ms;

	&:active {
		transform: translate(0.9);
	}
`;

export const Title = styled.h2`
	font-size: 2rem;
	margin: 0;
	margin-bottom: 20px;
	font-family: ${BebasNeue.style.fontFamily};
	font-weight: ${BebasNeue.style.fontWeight};
	font-style: ${BebasNeue.style.fontStyle};
`;

export const TitleH3 = styled.h3`
	font-size: 1.5rem;
	margin: 0;
	margin-bottom: 5px;
	font-family: ${BebasNeue.style.fontFamily};
	font-weight: ${BebasNeue.style.fontWeight};
	font-style: ${BebasNeue.style.fontStyle};
`;

// Recycled

// Function to process props and convert them into valid css styles
const processStyles = (
	props: ThemedStyledProps<{ styles?: CSSProperties; children?: children }, DefaultTheme>
): CSSObject => {
	const styleProps: CSSObject = {};

	if (!props.styles) return styleProps;

	// checking if the key is valid
	Object.keys(props.styles).forEach((key) => {
		// the camel case will process to the correct syntax, for example: maxWidth => max-width
		const cssKey = key.replace(/([A-Z])/g, "-$1").toLowerCase();
		styleProps[cssKey as string] =
			props.styles && props.styles[key as keyof typeof props.styles];
	});

	return styleProps;
};

/* this function will delete values that I don't want to overwrite when
 I use the destructuring */
function deleteRepeatedValues(props: object) {
	const attributesToDelete = ["children", "font", "className", "theme", "styles"];
	const clone: { [key: string]: unknown } = { ...props };

	for (const attribute in clone) {
		// eslint-disable-next-line no-prototype-builtins
		if (clone.hasOwnProperty(attribute) && attributesToDelete.includes(attribute)) {
			delete clone[attribute];
		}
	}

	return clone;
}

interface DivType extends React.HTMLAttributes<HTMLDivElement> {
	font?: string;
	ref?: MutableRefObject<HTMLDivElement>;
}

// eslint-disable-next-line react/display-name
const Div = forwardRef((props: DivType, ref: LegacyRef<HTMLDivElement> | undefined) => {
	const { children, font, className } = props;
	const clone = deleteRepeatedValues(props);

	return (
		<div ref={ref} className={`${className} ${font ?? roboto.className}`} {...clone}>
			{children}
		</div>
	);
});

export const StyledDiv = styled(Div)<{ styles?: CSSProperties }>((props) => ({
	position: props.styles?.position || "relative",
	...processStyles(props),
}));

interface ButtonType extends React.HTMLAttributes<HTMLButtonElement> {
	font?: string;
}

// main button

const ButtonXDXD = forwardRef(
	(props: ButtonType, ref: LegacyRef<HTMLButtonElement> | undefined) => {
		const { children, font, className } = props;
		const clone = deleteRepeatedValues(props);

		return (
			<button ref={ref} className={`${className} ${font ?? roboto.className}`} {...clone}>
				{children}
			</button>
		);
	}
);

export const StyledButton = styled(ButtonXDXD)<{ styles?: CSSProperties; children?: children }>`
	${(props) => ({
		position: props.styles?.position || "relative",
		display: "inline-block",
		color: "inherit",
		backgroundColor: "transparent",
		borderRadius: "10px",
		border: "none",
		transition: "200ms",
		cursor: "pointer",
		...processStyles(props),
	})}

	&:active {
		background-color: ${color["active-btn"]};
		transform: scale(0.95);
	}

	&:disabled {
		opacity: 0.2;
		cursor: not-allowed;
	}
`;

interface props extends React.HTMLAttributes<HTMLButtonElement> {
	styles?: CSSProperties;
	disabled?: boolean;
}
export const ButtonNormal = styled(({ children, className, styles, ...props }: props) => (
	<StyledButton className={className} styles={{ ...styles, ...BTNDefaultPadding }} {...props}>
		{children}
	</StyledButton>
))`
	${(props: { styles?: CSSProperties; $primary?: boolean; $warn?: boolean }) => {
		if (props.$primary)
			return css`
				color: ${props.styles?.color ?? "#fff"};
				background-color: ${props.styles?.backgroundColor ?? color.primary};
			`;
		else if (props.$warn)
			return css`
				color: ${props.styles?.color ?? "#fff"};
				background-color: ${props.styles?.backgroundColor ?? color.main};
			`;
		else
			return css`
				color: ${props.styles?.color ?? "#000"};
				background-color: {props.styles?.backgroundColor ?? "transparent"};
				border: ${props.styles?.border ?? `1px solid ${color.main}`};
			`;
	}}
`;

export const ContainerGOD = styled(StyledDiv)``;

export const SpaceBeetwenContainer = styled(StyledDiv)`
	display: flex;
	justify-content: space-between;
	flex-wrap: wrap;
`;

export const FlexContainer = styled(StyledDiv)`
	display: flex;
`;

export const Square = styled.div`
	position: relative;
	display: flex;
	justify-content: center;
	align-items: center;
	width: 100%;
	height: 100%;
	overflow: hidden;

	& img {
		width: 100%;
	}
`;

// export const SquareImage = (props: HTMLImageElement) => (
// 	<Square>
// 		{/* eslint-disable-next-line @next/next/no-img-element */}
// 		<img {...props} style={{ objectFit: "cover" }} alt={props.alt} />
// 	</Square>
// );

export const Form = styled.form`
	width: 100%;
	padding: 30px;
	margin-bottom: 20px;
	background-color: #fff;
	border-radius: 20px;
`;

export const Input = styled.input<{ m?: boolean }>`
	display: block;
	margin-bottom: ${({ m }) => (m ? "0" : "20px")};
`;
