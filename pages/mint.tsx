import { useState } from "react";
import { Header } from "../components";
import { useRouter } from "next/router";
import { useEffect } from "react";

export default function Mint() {
	const router = useRouter();
	const [isLoading, setIsLoading] = useState<boolean>(true);
	const [address, setAdress] = useState<string | null>(null);

	useEffect(() => {
		setAdress(sessionStorage.getItem("address"));
		setIsLoading(false);
	}, []);

	if (isLoading) {
		return <></>;
	}
	return (
		<div>
			<Header />
			<main className="flex-row items-center justify-center space-y-4 text-center"></main>
		</div>
	);
}
