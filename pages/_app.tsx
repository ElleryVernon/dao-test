import "../styles/globals.css";
import type { AppProps } from "next/app";
import Head from "next/head";
import { AddressProvider } from "../context/address";

export default function App({ Component, pageProps }: AppProps) {
	return (
		<>
			<Head>
				<title>CZERO DAO</title>
				<meta name="description" content="CZERO DAO" />
				<meta name="viewport" content="width=device-width, initial-scale=1" />
				<link rel="icon" href="/favicon.ico" />
			</Head>
			<AddressProvider>
				<Component {...pageProps} />
			</AddressProvider>
		</>
	);
}
