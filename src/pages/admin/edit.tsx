import { FormProduct } from "@/components/admin/form.product";
import { Title } from "@/styles/index.styles";

export default function Edit() {
	function edit() {}

	return (
		<div>
			<Title>Editar un productor</Title>
			<FormProduct callback={edit} />
		</div>
	);
}
