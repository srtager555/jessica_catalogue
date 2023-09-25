import {
	collection,
	addDoc,
	getFirestore,
	connectFirestoreEmulator,
	CollectionReference,
} from "firebase/firestore";
import { initializeApp } from "firebase/app";

initializeApp({
	apiKey: "AIzaSyCSuEWPP31OJI8FOpMAPsGBwpy9fN1ZrPc",
	authDomain: "catalog-36868.firebaseapp.com",
	projectId: "catalog-36868",
	storageBucket: "catalog-36868.appspot.com",
	messagingSenderId: "101053902414",
	appId: "1:101053902414:web:1b7b0f6236a9488c7d1d1f",
	measurementId: "G-D8Q5G1W51K",
});

const db = getFirestore();

connectFirestoreEmulator(db, "localhost", 8080);

async function createProduct(
	{ name, weight, brand, category }: Omit<Omit<product, "price">, "id">,
	imageURl: string
) {
	const prodColl = collection(db, "/products") as CollectionReference<product>;

	const content = {
		name,
		weight,
		category,
		brand,
		img: imageURl,
	};

	// console.log(content);

	// return;

	// adding the product to firebase

	await addDoc(prodColl, content as product);
}

const products = [
	{
		name: "Pollo Entero",
		brand: "San Antonio",
		peso: 1,
		img: "/img/products/p.entero_sa.jpg",
		cate: "Pollo",
	},
	{
		name: "Piezas Mixto",
		brand: "San Antonio",
		peso: 1,
		img: "/img/products/pollo_mixto_sa.jpg",
		cate: "Pollo",
	},
	{
		name: "Pierna con Muslo",
		brand: "San Antonio",
		peso: 1,
		img: "/img/products/p.muslo_sa.jpg",
		cate: "Pollo",
	},
	{
		name: "Pechuga",
		brand: "San Antonio",
		peso: 1,
		img: "/img/products/p.pechuga_sa.jpg",
		cate: "Pollo",
	},
	{
		name: "Gallina Entera",
		brand: "San Antonio",
		peso: 1,
		img: "/img/products/p.gallina_sa.webp",
		cate: "Pollo",
	},

	{
		name: "Pechuga deshuesada",
		brand: "San Antonio",
		peso: 1,
		img: "/img/products/p.pechuga_dh_sa.webp",
		cate: "Pollo",
	},
	{
		name: "Menudos de pollo",
		brand: "San Antonio",
		peso: 1,
		img: "/img/products/m.pollo_sa.jpg",
		cate: "Pollo",
	},
	{
		name: "Patas de Pollo",
		brand: "San Antonio",
		peso: 1,
		img: "/img/products/p.pollo_sa_1.jpg",
		cate: "Pollo",
	},
	{
		name: "Molleja",
		brand: "San Antonio",
		peso: 1,
		img: "/img/products/molleja_1.jpg",
		cate: "Pollo",
	},
	{
		name: "Carcasas",
		brand: "San Antonio",
		peso: 1,
		img: "/img/products/carcasa_xd.jpg",
		cate: "Pollo",
	},

	{
		name: "Chuleta de Cerdo",
		brand: "Del Corral",
		peso: 10,
		img: "/img/products/ch_dc_10.jpg",
		cate: "Cerdo",
	},
	{
		name: "Chuleta de Cerdo ahumada",
		brand: "El porteño",
		peso: 1,
		img: "/img/products/chuleta_ah.jpg",
		cate: "Cerdo",
	},
	{
		name: "Costilla ahumada",
		brand: "El porteño",
		peso: 5,
		img: "/img/products/c.ah.jpg",
		cate: "Cerdo",
	},
	{
		name: "Costilla Ahumada condimentada",
		brand: "Del Corral",
		peso: 1,
		img: "/img/products/c.ah_1.jpg",
		cate: "Cerdo",
	},

	{
		name: "Costilla en cubos",
		brand: "Del Corral",
		peso: 1,
		img: "/img/products/cos.cubo_dc_10.jpg",
		cate: "Cerdo",
	},
	{
		name: "Carne Molida en media",
		brand: "Del Corral",
		peso: 5,
		img: "/img/products/car.molida_dc.jpg",
		cate: "Res",
	},
	{
		name: "Carne Molida en libra",
		brand: "Del Corral",
		peso: 5,
		img: "/img/products/car.molida_dc_1.jpg",
		cate: "Res",
	},

	{ name: "Costilla Premium", peso: 10, img: "/img/products/c.c_30.avif", cate: "Res" },
	{
		name: "Costilla Premium Caja",
		peso: 30,
		img: "/img/products/c.c_10.avif",
		cate: "Res",
	},

	{
		name: "Patas de Cerdo",
		brand: "El porteño",
		peso: 10,
		img: "/img/products/p.cerdo.jpg",
		cate: "Cerdo",
	},

	{ name: "Chuleta de Res", peso: 1, img: "/img/products/ch.res.jpg", cate: "Res" },
	{ name: "Costilla de Res", peso: 1, img: "/img/products/cos.res.jpg", cate: "Res" },
	{
		name: "Pollo Entero",
		brand: "Norteño",
		peso: 1,
		img: "/img/products/pollo.e_n.jpg",
		cate: "Pollo",
	},
	{
		name: "Piezas Mixto",
		brand: "Norteño",
		peso: 1,
		img: "/img/products/pollo_pieza_n.jpg",
		cate: "Pollo",
	},
	{
		name: "Pollo En Mitades",
		brand: "Norteño",
		peso: 1,
		img: "/img/products/pollo_mitad_n.jpg",
		cate: "Pollo",
	},
	{
		name: "Pierna con Muslo",
		brand: "Norteño",
		peso: 1,
		img: "/img/products/pier.muslo_n.jpg",
		cate: "Pollo",
	},

	{
		name: "Pechuga deshuesada",
		brand: "Norteño",
		peso: 1,
		img: "/img/products/pech_dh_n.jpg",
		cate: "Pollo",
	},
	{
		name: "Menudos de pollo",
		brand: "Norteño",
		peso: 1,
		img: "/img/products/m.pollo_n_1.webp",
		cate: "Pollo",
	},
	{
		name: "Patas de Pollo",
		brand: "Norteño",
		peso: 1,
		img: "/img/products/p.pollo_n_1.jpg",
		cate: "Pollo",
	},

	{
		name: "Alitas de pollo",
		brand: "Norteño",
		peso: 5,
		img: "/img/products/alistas.pollo.webp",
		cate: "Pollo",
	},

	// embutidos
	{
		name: "Chorizo barbacoa",
		brand: "Delicia",
		peso: 1,
		img: "/img/products/c.bb_d_1.webp",
		cate: "Embutidos",
	},
	{
		name: "Chorizo barbacoa",
		brand: "Delicia",
		peso: 3,
		img: "/img/products/c.bb_d_3.jpg",
		cate: "Embutidos",
	},
	{
		name: "Chorizo parrillero",
		brand: "Delicia",
		peso: 1,
		img: "/img/products/c.parrillero_d_1.jpg",
		cate: "Embutidos",
	},
	{
		name: "Chorizo Casero",
		brand: "Mi Casa",
		peso: 5,
		img: "/img/products/micasa.casero.jpg",
		cate: "Embutidos",
	},

	{
		name: "Chorizo Cervecero",
		brand: "El porteño",
		peso: 3,
		img: "/img/products/c.cervecero_ep_3.jpg",
		cate: "Embutidos",
	},
	{
		name: "Chorizo Cervecero",
		brand: "El porteño",
		peso: 1,
		img: "/img/products/c.cervecero_ep_1.webp",
		cate: "Embutidos",
	},

	{
		name: "Hot Dog",
		brand: "Delicia",
		peso: 3,
		img: "/img/products/hd_d_3.jpg",
		cate: "Embutidos",
	},
	{
		name: "Big Dog",
		brand: "Delicia",
		peso: 1,
		img: "/img/products/hd_d_1.jpg",
		cate: "Embutidos",
	},
	{
		name: "H.D de Queso",
		brand: "Delicia",
		peso: 1,
		img: "/img/products/hd_queso_d_1.jpg",
		cate: "Embutidos",
	},
	{
		name: "H.D de Pollo",
		brand: "Delicia",
		peso: 1,
		img: "/img/products/hd_pollo_d_1.webp",
		cate: "Embutidos",
	},

	{
		name: "Hot Dog",
		brand: "Kimby",
		peso: 3,
		img: "/img/products/hd_k_3.jpg",
		cate: "Embutidos",
	},
	{
		name: "Hot Dog",
		brand: "Toledo",
		peso: 3,
		img: "/img/products/hd_t_3.jpg",
		cate: "Embutidos",
	},
	{
		name: "H.D Queso",
		brand: "Toledo",
		peso: 1,
		img: "/img/products/hd_queso_t_1.jpg",
		cate: "Embutidos",
	},
	{
		name: "H.D Pollo",
		brand: "Pollo Rey",
		peso: 1,
		img: "/img/products/hd_pollo_pr.webp",
		cate: "Embutidos",
	},

	{
		name: "Extremeño",
		brand: "Norteño",
		peso: 3,
		img: "/img/products/c.extremeno_n_3.jpg",
		cate: "Embutidos",
	},
	{
		name: "Copetín",
		brand: "Delicia",
		peso: 3,
		img: "/img/products/c.copetin_d_3.jpg",
		cate: "Embutidos",
	},
	{
		name: "Extremeño",
		brand: "Kimby",
		peso: 3,
		img: "/img/products/c.extreme_k_3.jpg",
		cate: "Embutidos",
	},
	{
		name: "Copetín",
		brand: "Kimby",
		peso: 3,
		img: "/img/products/c.copetin_k_3.jpg",
		cate: "Embutidos",
	},

	{
		name: "Mortadela Bloque",
		brand: "Delicia",
		peso: 5,
		img: "/img/products/mortadela.bloque.webp",
		cate: "Embutidos",
	},
	{
		name: "Mortadela Barra",
		brand: "Toledo",
		peso: 7,
		img: "/img/products/mortadela_t_7.jpg",
		cate: "Embutidos",
	},
	{ name: "Mortadela", peso: 7, img: "/img/products/bolonga.png", cate: "Embutidos" },

	{
		name: "Longaniza",
		brand: "Delicia",
		peso: 3,
		img: "/img/products/longaniza_d_3.jpg",
		cate: "Embutidos",
	},
	{
		name: "Longaniza",
		brand: "El porteño",
		peso: 3,
		img: "/img/products/longaniza_p_3.jpg",
		cate: "Embutidos",
	},

	{
		name: "Choripollo",
		brand: "Toledo",
		peso: 1,
		img: "/img/products/chorripollo_t_1.jpg",
		cate: "Embutidos",
	},
	{
		name: "Choripollo",
		brand: "Norteño",
		peso: 1,
		img: "/img/products/choripollo_n.jpg",
		cate: "Embutidos",
	},
	{
		name: "Jamon de norteño",
		brand: "Norteño",
		peso: 1,
		img: "/img/products/j.pollo_n.webp",
		cate: "Embutidos",
	},
	{
		name: "Jamon de Pollo",
		brand: "Delicia",
		peso: 1,
		img: "/img/products/j.pollo_d.webp",
		cate: "Embutidos",
	},
	{
		name: "Jamon de normal",
		brand: "Delicia",
		peso: 1,
		img: "/img/products/j.normal.webp",
		cate: "Embutidos",
	},
	{ name: "Papas", brand: "El porteño", peso: 5.5, img: "/img/products/papas.jpg" },
	{
		name: "Frijoles Licuados",
		brand: "Delicia",
		peso: 10,
		img: "/img/products/frijoles.gutti.jpg",
	},

	{
		name: "Nuggets de Pollo",
		brand: "El porteño",
		peso: 0.75,
		img: "/img/products/nuggets.pollo.webp",
		cate: "Pollo",
	},
	{
		name: "Alitas de Pollo",
		brand: "El porteño",
		peso: 0.75,
		img: "/img/products/alitas_n.jpg",
		cate: "Pollo",
	},
	{
		name: "Strips de Pollo",
		brand: "El porteño",
		peso: 0.75,
		img: "/img/products/strips.pollo.jpg",
		cate: "Pollo",
	},

	{ name: "Queso", brand: "El porteño", peso: 5, img: "/img/products/queso.duro.jpg" },
];

export function lol() {
	products.forEach(async (el) => {
		if (!el.img) return;

		async function convertImageToFile(imagePath: string) {
			return await fetch(imagePath) // Cargamos la imagen desde la ruta
				.then((response) => response.blob()) // Convertimos la respuesta en un blob
				.then((blob) => {
					// Creamos un objeto File a partir del blob
					return new File([blob], "product.png", {
						type: "image/png",
					});
				});
		}

		createProduct(
			{
				name: el.name,
				category: el.cate ?? "",
				brand: el.brand ?? "",
				weight: el.peso,
			},
			el.img
		);
	});
}
