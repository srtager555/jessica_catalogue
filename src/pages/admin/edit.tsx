import { FormProduct } from "@/components/admin/form.product";
import { Title } from "@/styles/index.styles";
import { Roboto } from "next/font/google";
import styled from "styled-components";

const roboto = Roboto({ weight: "400", subsets: ["latin"] });

const Box = styled.div`
	width: 60%;
	font-family: ${roboto.style.fontFamily};
	font-style: ${roboto.style.fontStyle};
	font-weight: ${roboto.style.fontWeight};
`;

export default function Edit() {
	function edit() {}

	return (
		<Box>
			<Title>Editar un productor</Title>
			<FormProduct callback={edit} edit />
		</Box>
	);
}
