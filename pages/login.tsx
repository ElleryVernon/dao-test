import QRCode from "qrcode.react";
import { useState } from "react";
import { Header } from "../components";
import { useRouter } from "next/router";
import * as KlipAPI from "../utils/klip";
import { useEffect } from "react";

export default function login() {
	const router = useRouter();
	const [isLoading, setIsLoading] = useState<boolean>(true);
	const [address, setAdress] = useState<string | null>(null);
	const [qrvalue, setQrvalue] = useState("");

	useEffect(() => {
		setAdress(sessionStorage.getItem("address"));
		setIsLoading(false);
	}, []);

	const logIn = async (address: string) => {
		sessionStorage.setItem("address", address);
		router.reload();
	};
	const kaikasLogIn = async () => {
		if (window?.klaytn?.isKaikas) {
			router.push("https://chrome.google.com/webstore/detail/kaikas/jblndlipeogpafnldhgmapagcccfchpi");
		}
		if (window?.klaytn?.isKaikas && !address?.length) {
			const accounts = await window?.klaytn?.enable();
			const account = accounts[0];
			console.log(account);
			sessionStorage.setItem("address", account);
		}

		router.reload();
	};

	const handleOnClick = () => {
		KlipAPI.getAdderess(setQrvalue, logIn);
	};

	if (address?.length) {
		router.replace("/");
	}

	if (isLoading) {
		return <></>;
	}
	return (
		<div>
			<Header />
			<main className="flex-row items-center justify-center space-y-4 text-center">
				{qrvalue.length ? (
					<div className="flex-row justify-center items-center space-y-4">
						<h1 className="text-2xl font-semibold mt-8">Klip으로 로그인하기</h1>
						<QRCode value={qrvalue} size={196} className="m-auto" />
						<a href={qrvalue} target="_blank" rel="noopener noreferrer">
							<button className="m-2 p-2 border hover:bg-gray-200 transition px-12 text-lg mt-4">모바일 로그인</button>
						</a>
					</div>
				) : (
					<div className="mt-6">
						<h1 className="text-2xl my-4 font-semibold text-gray-800">지갑으로 로그인하여 시작</h1>
						<button
							onClick={handleOnClick}
							className="p-3 border m-2 px-5 hover:bg-gray-200 transition text-sm rounded-lg"
						>
							Klip으로 로그인하기
						</button>
						<button
							className="p-3 border m-2 px-5 hover:bg-gray-200 transition text-sm rounded-lg"
							onClick={() => kaikasLogIn()}
						>
							Kaikas로 로그인하기
						</button>
					</div>
				)}
			</main>
		</div>
	);
}
