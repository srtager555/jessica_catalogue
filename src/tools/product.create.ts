import { collection, query, where, getDocs, addDoc } from "firebase/firestore";
import { FormEvent, Dispatch, SetStateAction } from "react";
import { uploadFile } from "./storage/uploadFile";
import { Firestore } from "./firestore";

const db = Firestore();

async function createProduct(
	e: FormEvent,
	imageURl: File | undefined,
	setError: Dispatch<SetStateAction<string | undefined>>,
	setRefreshImage: Dispatch<SetStateAction<boolean>>
) {
	e.preventDefault();

	const target = e.currentTarget as typeof e.currentTarget & {
		productName: HTMLInputElement;
		price: HTMLInputElement;
		weight: HTMLInputElement;
		brand: HTMLSelectElement;
		category: HTMLSelectElement;
	};

	const { productName, price, weight, brand, category } = target;

	if (!imageURl) {
		setError("El producto debe de llevar una imagen");

		return;
	}

	const prodColl = collection(db, "/products");

	// comprobation to avoid issues in the images

	const q = query(
		prodColl,
		where("name", "==", productName.value),
		where("brand", "==", brand.value)
	);
	const snapshot = await getDocs(q);

	if (snapshot.docs.length > 0) {
		setError("Ya existe un producto con este nombre y marca");

		return;
	}

	// adding the product to firebase
	const data = await addDoc(prodColl, {
		name: productName.value,
		price: price.value,
		weight: weight.value,
		category: category.value,
		brand: brand.value,
	});

	// uploading the image
	await uploadFile(`products/${data.id}/product`, imageURl);

	// restoring the form, the input image and the Error state
	//@ts-ignore
	e.target.reset();
	setError(undefined);
	setRefreshImage(true);
}

const products = [
	{
		name: "Pollo Entero",
		brand: "San Antonio",
		peso: "libra",
		img: "/img/products/p.entero_sa.jpg",
	},
	{
		name: "Piezas Mixto",
		brand: "San Antonio",
		peso: "libra",
		img: "/img/products/pollo_mixto_sa.jpg",
	},
	{
		name: "Pierna con Muslo",
		brand: "San Antonio",
		peso: "libra",
		img: "/img/products/p.muslo_sa.jpg",
	},
	{ name: "Pechuga", brand: "San Antonio", peso: "libra", img: "/img/products/p.pechuga_sa.jpg" },
	{
		name: "Gallina Entera",
		brand: "San Antonio",
		peso: "libra",
		img: "/img/products/p.gallina_sa.webp",
	},

	{
		name: "Pechuga deshuesada",
		brand: "San Antonio",
		peso: "libra",
		img: "/img/products/p.pechuga_dh_sa.webp",
	},
	{
		name: "Menudos de pollo",
		brand: "San Antonio",
		peso: "libra",
		img: "/img/products/m.pollo_sa.jpg",
	},
	{
		name: "Patas de Pollo",
		brand: "San Antonio",
		peso: "libra",
		img: "/img/products/p.pollo_sa_1.jpg",
	},
	{ name: "Molleja", brand: "San Antonio", peso: "libra", img: "/img/products/molleja_1.jpg" },
	{ name: "Carcasas", brand: "San Antonio", peso: "libra", img: "/img/products/carcasa_xd.jpg" },

	{
		name: "Chuleta de Cerdo",
		brand: "Del Corral",
		peso: "10 libras",
		img: "/img/products/ch_dc_10.jpg",
	},
	{
		name: "Chuleta de Cerdo ahumada",
		brand: "El porteño",
		peso: "libra",
		img: "/img/products/chuleta_ah.jpg",
	},
	{
		name: "Costilla ahumada",
		brand: "El porteño",
		peso: "5 libras",
		img: "/img/products/c.ah.jpg",
	},
	{
		name: "Costilla Ahumada condimentada",
		brand: "Del Corral",
		peso: "libra",
		img: "/img/products/c.ah_1.jpg",
	},

	{
		name: "Costilla en cubos",
		brand: "Del Corral",
		peso: "libra",
		img: "/img/products/cos.cubo_dc_10.jpg",
	},
	{
		name: "Carne Molida en media",
		brand: "Del Corral",
		peso: "5 libras",
		img: "/img/products/car.molida_dc.jpg",
	},
	{
		name: "Carne Molida en libra",
		brand: "Del Corral",
		peso: "5 libras",
		img: "/img/products/car.molida_dc_1.jpg",
	},

	{ name: "Costilla Premium", peso: "10 libras", img: "/img/products/c.c_30.avif" },
	{ name: "Costilla Premium Caja", peso: "30 libras", img: "/img/products/c.c_10.avif" },

	{
		name: "Patas de Cerdo",
		brand: "El porteño",
		peso: "10 libras",
		img: "/img/products/p.cerdo.jpg",
	},

	{ name: "Chuleta de Res", peso: "libra", img: "/img/products/ch.res.jpg" },
	{ name: "Costilla de Res", peso: "libra", img: "/img/products/cos.res.jpg" },
	{ empty: true },
	{ empty: true },

	{ name: "Pollo Entero", brand: "Norteño", peso: "libra", img: "/img/products/pollo.e_n.jpg" },
	{
		name: "Piezas Mixto",
		brand: "Norteño",
		peso: "libra",
		img: "/img/products/pollo_pieza_n.jpg",
	},
	{
		name: "Pollo En Mitades",
		brand: "Norteño",
		peso: "libra",
		img: "/img/products/pollo_mitad_n.jpg",
	},
	{
		name: "Pierna con Muslo",
		brand: "Norteño",
		peso: "libra",
		img: "/img/products/pier.muslo_n.jpg",
	},

	{
		name: "Pechuga deshuesada",
		brand: "Norteño",
		peso: "libra",
		img: "/img/products/pech_dh_n.jpg",
	},
	{
		name: "Menudos de pollo",
		brand: "Norteño",
		peso: "libra",
		img: "/img/products/m.pollo_n_1.webp",
	},
	{
		name: "Patas de Pollo",
		brand: "Norteño",
		peso: "libra",
		img: "/img/products/p.pollo_n_1.jpg",
	},

	{
		name: "Alitas de pollo",
		brand: "Norteño",
		peso: "5 libras",
		img: "/img/products/alitas_n.jpg",
	},

	// embutidos
	{
		name: "Chorizo barbacoa",
		brand: "Delicia",
		peso: "1 libra",
		img: "/img/products/c.bb_d_1.webp",
	},
	{
		name: "Chorizo barbacoa",
		brand: "Delicia",
		peso: "3 libras",
		img: "/img/products/c.bb_d_3.jpg",
	},
	{
		name: "Chorizo parrillero",
		brand: "Delicia",
		peso: "1 libra",
		img: "/img/products/c.parrillero_d_1.jpg",
	},
	{
		name: "Chorizo Casero",
		brand: "Mi Casa",
		peso: "5 libras",
		img: "/img/products/micasa.casero.jpg",
	},

	{
		name: "Chorizo Cervecero",
		brand: "El porteño",
		peso: "3 libras",
		img: "/img/products/c.cervecero_ep_3.jpg",
	},
	{
		name: "Chorizo Cervecero",
		brand: "El porteño",
		peso: "1 libra",
		img: "/img/products/c.cervecero_ep_1.webp",
	},

	{ name: "Hot Dog", brand: "Delicia", peso: "3 libras", img: "/img/products/hd_d_3.jpg" },
	{ name: "Big Dog", brand: "Delicia", peso: "1 libra", img: "/img/products/hd_d_1.jpg" },
	{
		name: "H.D de Queso",
		brand: "Delicia",
		peso: "1 libra",
		img: "/img/products/hd_queso_d_1.jpg",
	},
	{
		name: "H.D de Pollo",
		brand: "Delicia",
		peso: "1 libra",
		img: "/img/products/hd_pollo_d_1.webp",
	},

	{ name: "Hot Dog", brand: "Kimby", peso: "3 libras", img: "/img/products/hd_k_3.jpg" },
	{ name: "Hot Dog", brand: "Toledo", peso: "3 libras", img: "/img/products/hd_t_3.jpg" },
	{ name: "H.D Queso", brand: "Toledo", peso: "1 libra", img: "/img/products/hd_queso_t_1.jpg" },
	{
		name: "H.D Pollo",
		brand: "Pollo Rey",
		peso: "1 libra",
		img: "/img/products/hd_pollo_pr.webp",
	},

	{
		name: "Extremeño",
		brand: "Norteño",
		peso: "3 libra",
		img: "/img/products/c.extremeno_n_3.jpg",
	},
	{ name: "Copetín", brand: "Delicia", peso: "3 libra", img: "/img/products/c.copetin_d_3.jpg" },
	{ name: "Extremeño", brand: "Kimby", peso: "3 libras", img: "/img/products/c.extreme_k_3.jpg" },
	{ name: "Copetín", brand: "Kimby", peso: "3 libras", img: "/img/products/c.copetin_k_3.jpg" },

	{
		name: "Mortadela Bloque",
		brand: "Delicia",
		peso: "5 libras",
		img: "/img/products/mortadela.bloque.webp",
	},
	{
		name: "Mortadela Barra",
		brand: "Toledo",
		peso: "7 libras",
		img: "/img/products/mortadela_t_7.jpg",
	},
	{ name: "Mortadela", peso: "7 libras", img: "/img/products/bolonga.png" },

	{
		name: "Longaniza",
		brand: "Delicia",
		peso: "3 libras",
		img: "/img/products/longaniza_d_3.jpg",
	},
	{
		name: "Longaniza",
		brand: "El porteño",
		peso: "3 libras",
		img: "/img/products/longaniza_p_3.jpg",
	},

	{
		name: "Choripollo",
		brand: "Toledo",
		peso: "1 libra",
		img: "/img/products/chorripollo_t_1.jpg",
	},
	{
		name: "Choripollo",
		brand: "Norteño",
		peso: "1 libra",
		img: "/img/products/choripollo_n.jpg",
	},
	{
		name: "Jamon de norteño",
		brand: "Norteño",
		peso: "1 libra",
		img: "/img/products/j.pollo_n.webp",
	},
	{
		name: "Jamon de Pollo",
		brand: "Delicia",
		peso: "1 libra",
		img: "/img/products/j.pollo_d.webp",
	},
	{
		name: "Jamon de normal",
		brand: "Delicia",
		peso: "1 libra",
		img: "/img/products/j.normal.webp",
	},
	{ name: "Papas", brand: "El porteño", peso: "5.5 libras", img: "/img/products/papas.jpg" },
	{
		name: "Frijoles Licuados",
		brand: "Delicia",
		peso: "10 libras",
		img: "/img/products/frijoles.gutti.jpg",
	},

	{
		name: "Nuggets de Pollo",
		brand: "El porteño",
		peso: "0.75 libras",
		img: "/img/products/nuggets.pollo.webp",
	},
	{
		name: "Alitas de Pollo",
		brand: "El porteño",
		peso: "0.75 libras",
		img: "/img/products/alistas.pollo.webp",
	},
	{
		name: "Strips de Pollo",
		brand: "El porteño",
		peso: "0.75 libras",
		img: "/img/products/strips.pollo.jpg",
	},

	{ name: "Queso", brand: "El porteño", peso: "5 libras", img: "/img/products/queso.duro.jpg" },
];
