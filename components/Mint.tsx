import { ChangeEvent, useState } from "react";
import { useRouter } from "next/router";
import { useEffect } from "react";
import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import { NewtonsCradle } from "@uiball/loaders";
import NFT from "../utils/name.json";
import PRICE from "../utils/pricing.json";

const Mint = () => {
	const router = useRouter();
	const [isLoading, setIsLoading] = useState<boolean>(true);
	const [address, setAdress] = useState<string | null>(null);
	const [wallet, setWallet] = useState<string | null>(null);
	const [qrvalue, setQrvalue] = useState<string>("");
	const [klay, setKlay] = useState<number>(0);
	const [pricing, setPricing] = useState<number>(-1);
	const { nftId } = router.query;

	const onChangeHandler = (e: ChangeEvent<HTMLSelectElement>) => {
		setPricing(Number(e.currentTarget.value));
	};

	useEffect(() => {
		if (router.isReady && !nftId) {
			router.replace("/gallary");
		}
	}, [router.isReady]);

	useEffect(() => {
		async function getPricing() {
			const {
				data: {
					data: { closing_price },
				},
			} = await axios.get("https://api.bithumb.com/public/ticker/KLAY_KRW");
			setKlay(Number(closing_price));
		}
		getPricing();
	}, [pricing]);

	useEffect(() => {
		const wallet = sessionStorage.getItem("address");
		async function findUser(address: string) {
			const { data } = await axios.get(`/api/user?address=${address}`);
			const {
				data: {
					data: { closing_price },
				},
			} = await axios.get("https://api.bithumb.com/public/ticker/KLAY_KRW");
			if (!data?.user?.id?.length) {
				return router.replace("/agree");
			}
			setKlay(Number(closing_price));
			setIsLoading(false);
		}
		if (wallet?.length) {
			findUser(wallet);
			setWallet(sessionStorage.getItem("wallet"));
			setAdress(wallet);
		} else {
			router.replace("/login");
		}
	}, []);

	const mint = async () => {
		if (pricing === -1) return;
		const prevPrice = PRICE[pricing].pricing;
		const discount = (prevPrice / 100) * PRICE[pricing].discount;
		const reward = PRICE[pricing].reward;
		const priceKRW = prevPrice - discount;
		const price = Math.floor(priceKRW / klay);
		const NFTName = NFT[Number(nftId)].name;
		const volume = PRICE[pricing].name;

		if (wallet === "kaikas") {
			const networkVersion = await window.klaytn.networkVersion;
			if (networkVersion !== 8217) return;
			const result = await window.caver.klay
				.sendTransaction({
					type: "VALUE_TRANSFER",
					from: address,
					to: "0x353EF2E80D0E2fde7F1561f8F8bBe21fB0B7F6F2",
					value: window.caver.utils.toPeb(`${price}`, "KLAY"), // 1 클레이 전송
					gas: 8000000,
				})
				.catch((err: Error) => console.log(err));

			if (!result) {
				router.reload();
			} else {
				await axios.post("/api/order", {
					userId: address,
					NFT_id: nftId,
					NFT_name: NFTName,
					Volume: volume,
					price: prevPrice,
					discount: discount,
					actual_price: priceKRW,
					reward: reward,
					klaytn: price,
				});
				router.push("/");
			}
		} else if (wallet === "klip") {
			try {
				const { data } = await axios.post("https://a2a-api.klipwallet.com/v2/a2a/prepare", {
					bapp: { name: "My BApp" },
					type: "send_klay",
					transaction: {
						from: address,
						to: "0x353EF2E80D0E2fde7F1561f8F8bBe21fB0B7F6F2",
						amount: `${price}`,
					},
				});

				const { request_key } = data;
				const qrcode = `https://klipwallet.com/?target=/a2a?request_key=${request_key}`;
				setQrvalue(qrcode);

				const timerId = setInterval(async () => {
					const res = await axios.get(`https://a2a-api.klipwallet.com/v2/a2a/result?request_key=${request_key}`);
					if (res.data.result?.status == "success") {
						clearInterval(timerId);
						await axios.post("/api/order", {
							userId: address,
							NFT_id: nftId,
							NFT_name: NFTName,
							Volume: volume,
							price: prevPrice,
							discount: discount,
							actual_price: priceKRW,
							reward: reward,
							klaytn: price,
						});
						router.push("/");
					}
				}, 1600);
			} catch (err) {
				router.reload();
			}
		}
	};

	if (isLoading || !nftId) {
		return (
			<div className="flex w-full items-center justify-center p-10 text-xl">
				<NewtonsCradle size={50} color="#3B82F6" />
			</div>
		);
	}

	return (
		<section className="flex-row justify-center gap-x-16 text-gray-800 m-auto mt-10">
			<h1 className="text-2xl font-bold text-center mb-6">NFT 구매</h1>
			<div className="h-[420px] flex items-center justify-center m-auto">
				<div className="w-[300px] h-[420px] bg-transparent cursor-pointer group perspective mx-4">
					<div className="relative preserve-3d group-hover:my-rotate-y-180 w-full h-full duration-1000">
						<div className="absolute backface-hidden border-2 w-full h-full border-gray-300 rounded">
							<Image
								src={`/nft/${Number(nftId) + 1}.png`}
								className="w-full h-full"
								alt="nft image"
								width={300}
								height={420}
								quality={60}
							/>
						</div>
						<div className="absolute my-rotate-y-180  w-full h-full bg-gray-100 backface-hidden">
							<Image
								src={`/nft/${Number(nftId) + 1}-1.png`}
								className="w-full h-full"
								alt="nft image"
								width={300}
								height={420}
								quality={60}
							/>
						</div>
					</div>
				</div>
			</div>
			<div className="border py-14 rounded-md w-[460px] m-auto mt-10">
				<p className="text-center text-gray-400 font-semibold text-sm">NFT Name</p>
				<p className="text-center mt-2 text-gray-900 font-semibold text-2xl">{NFT[Number(nftId)].name}</p>
				<p className="text-center mt-8 text-gray-400 font-semibold text-sm">구매 용량 선택</p>
				<select
					className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:focus:ring-blue-500 dark:focus:border-blue-500 w-[368px] m-auto mt-2"
					onChange={onChangeHandler}
					value={pricing}
				>
					<option selected value={-1}>
						구매 용량을 선택해주세요
					</option>
					<option value={0}>100wp</option>
					<option value={1}>1,000wp (1kWp)</option>
					<option value={2}>10,000wp (10kWp)</option>
					<option value={3}>100,000wp (100kWp)</option>
				</select>
				{pricing !== -1 ? (
					<>
						<p className="text-center mt-8 text-gray-400 font-semibold text-sm">금액</p>
						<p className="text-center mt-2 text-gray-900 font-semibold text-2xl">
							{`${PRICE[pricing].pricing}`.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")} KRW
						</p>
						<p className="text-center mt-8 text-gray-400 font-semibold text-sm">할인율(금액)</p>
						<p className="text-center mt-2 text-gray-900 font-semibold text-2xl">
							{`${PRICE[pricing].discount}`}% (
							{((PRICE[pricing].pricing / 100) * PRICE[pricing].discount)
								.toString()
								.replace(/\B(?=(\d{3})+(?!\d))/g, ",")}{" "}
							KRW)
						</p>
						<p className="text-center mt-8 text-gray-400 font-semibold text-sm">실제 구매 금액</p>
						<p className="text-center mt-2 text-gray-900 font-semibold text-2xl">
							{(PRICE[pricing].pricing - (PRICE[pricing].pricing / 100) * PRICE[pricing].discount)
								.toString()
								.replace(/\B(?=(\d{3})+(?!\d))/g, ",")}{" "}
							KRW
						</p>
						<p className="text-center mt-8 text-gray-400 font-semibold text-sm">추가보상</p>
						<p className="text-center mt-2 text-gray-900 font-semibold text-2xl">
							{`${PRICE[pricing].reward}`.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")} CZERO TOKEN
						</p>
						<p className="text-center mt-8 text-gray-400 font-semibold text-sm">필요한 Klaytn 수량</p>
						<p className="text-center mt-2 text-gray-900 font-semibold text-2xl">{`${Math.floor(
							(PRICE[pricing].pricing - (PRICE[pricing].pricing / 100) * PRICE[pricing].discount) / klay
						)
							.toString()
							.replace(/\B(?=(\d{3})+(?!\d))/g, ",")} KLAY`}</p>
					</>
				) : null}
			</div>
			{qrvalue.length ? (
				<Link href={qrvalue} passHref target="_blank" rel="noopener noreferrer">
					<div
						className={`mx-auto border px-16 py-4 font-semibold text-white rounded-md w-[460px] mt-12 text-center ${
							pricing !== -1
								? "cursor-pointer hover:bg-orange-400 active:bg-orange-600 bg-orange-500 "
								: "bg-orange-200"
						}`}
						onClick={mint}
					>
						{pricing !== -1 ? "Klip으로 구매하기" : "용량을 선택해주세요"}
					</div>
				</Link>
			) : (
				<div
					className={`mx-auto border px-16 py-4 font-semibold text-white rounded-md w-[460px] mt-12 text-center ${
						pricing !== -1 ? "cursor-pointer hover:bg-blue-400 active:bg-blue-600 bg-blue-500 " : "bg-blue-200"
					}`}
					onClick={mint}
				>
					{pricing !== -1 ? "구매하기" : "용량을 선택해주세요"}
				</div>
			)}
		</section>
	);
};

export default Mint;
