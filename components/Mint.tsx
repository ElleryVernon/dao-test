import { useState } from "react";
import { useRouter } from "next/router";
import { useEffect } from "react";
import axios from "axios";

const Mint = () => {
	const router = useRouter();
	const [isLoading, setIsLoading] = useState<boolean>(true);
	const [address, setAdress] = useState<string | null>(null);
	const [wallet, setWallet] = useState<string | null>(null);

	useEffect(() => {
		setAdress(sessionStorage.getItem("address"));
		setWallet(sessionStorage.getItem("wallet"));
		setIsLoading(false);
	}, []);

	const mint = async () => {
		if (wallet === "kaikas") {
			window.caver.klay
				.sendTransaction({
					type: "VALUE_TRANSFER",
					from: window.klaytn.selectedAddress,
					to: "0x353EF2E80D0E2fde7F1561f8F8bBe21fB0B7F6F2",
					value: window.caver.utils.toPeb("1", "KLAY"), // 1 클레이 전송
					gas: 8000000,
				})
				.once("transactionHash", (transactionHash: string) => {
					console.log("txHash", transactionHash);
				})
				.once("receipt", (receipt: string) => {
					console.log("receipt", receipt);
				})
				.once("error", (err: string) => {
					router.reload();
				});
		} else if (wallet === "klip") {
            
        }
	};

	if (isLoading) {
		return <></>;
	}
	return (
		<main className="flex-row items-center justify-center space-y-4 text-center">
			<button className="px-4 py-2 border rounded-lg" onClick={mint}>
				민팅!
			</button>
		</main>
	);
};

export default Mint;
