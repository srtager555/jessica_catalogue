import type { AppProps } from "next/app";
import { initializeApp } from "firebase/app";
import { connectAuthEmulator, getAuth } from "firebase/auth";

import "@/styles/globals.css";
import { Background } from "@/styles/index.styles";
import { AdminLayout } from "@/layout/admin";
import Head from "next/head";

export default function App({ Component, pageProps }: AppProps) {
	initializeApp({
		apiKey: "AIzaSyCSuEWPP31OJI8FOpMAPsGBwpy9fN1ZrPc",
		authDomain: "catalog-36868.firebaseapp.com",
		projectId: "catalog-36868",
		storageBucket: "catalog-36868.appspot.com",
		messagingSenderId: "101053902414",
		appId: "1:101053902414:web:1b7b0f6236a9488c7d1d1f",
		measurementId: "G-D8Q5G1W51K",
	});

	const auth = getAuth();
	const authConfig = auth.config as typeof auth.config & {
		emulator: unknown;
	};

	if (process.env.NODE_ENV === "development")
		if (!authConfig.emulator) {
			connectAuthEmulator(auth, "http://localhost:9099", {
				disableWarnings: true,
			});
		}

	return (
		<>
			<Head>
				<title>Carnicería Rodriguez</title>
				<link rel="icon" type="image/x-icon" href="/redpoint.png" />
				<meta
					name="description"
					content="Carnes, lacteos y mas en nuestro catálogo en linea"
				/>
			</Head>
			<Background />
			<AdminLayout>
				<Component {...pageProps} />
			</AdminLayout>
		</>
	);
}
