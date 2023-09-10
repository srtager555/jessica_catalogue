import Link from "next/link";

export function Nav() {
	return (
		<div>
			<Link href="/admin">Añadir productos</Link>
			<Link href="/admin/edit">Editar productos</Link>
			<Link href="/admin/featured">productos Destacados</Link>
		</div>
	);
}
