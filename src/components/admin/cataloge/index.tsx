import styled from "styled-components";

const Container = styled.div`
	display: none;

	@media print {
		display: block;
	}
`;

export function List() {
	return <Container>ok</Container>;
}
