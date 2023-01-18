import { Header } from "../components";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Image from "next/image";
import NFT from "../utils/name.json";

export default function Home() {
	const router = useRouter();
	const [index, setIndex] = useState<number>(0);
	const [isLoading, setIsLoading] = useState<boolean>(true);
	const [address, setAdress] = useState<string | null>(null);

	const increaseIdx = () => {
		if (index < 9) {
			setIndex(index + 1);
		} else {
			setIndex(0);
		}
	};

	const decreaseIdx = () => {
		if (index > 0) {
			setIndex(index - 1);
		} else {
			setIndex(9);
		}
	};

	useEffect(() => {
		setAdress(sessionStorage.getItem("address"));
		setIsLoading(false);
	}, []);

	if (isLoading) {
		return <></>;
	}

	return (
		<div className="flex-row items-center justify-center">
			<Header />
			<h1 className="text-center text-2xl mt-10 font-bold text-gray-800">NFT 갤러리</h1>
			<p className="text-center mt-2 text-gray-600 font-semibold text-xl">{NFT[Number(index)].name}</p>
			<section className="flex-row justify-center gap-x-16 text-gray-800 m-auto mt-8">
				<div className="h-[420px] flex items-center justify-center m-auto">
					<button
						className="text-gray-700 border px-4 py-2 rounded-md hover:bg-gray-200 transition active:bg-gray-400"
						onClick={decreaseIdx}
					>
						이전
					</button>
					<div className="w-[300px] h-[420px] bg-transparent cursor-pointer group perspective mx-4">
						<div className="relative preserve-3d group-hover:my-rotate-y-180 w-full h-full duration-1000">
							<div className="absolute backface-hidden border-2 w-full h-full border-gray-300 rounded">
								<Image
									src={`/nft/${index + 1}.png`}
									className="w-full h-full"
									alt="nft image"
									width={300}
									height={420}
									quality={60}
								/>
							</div>
							<div className="absolute my-rotate-y-180  w-full h-full bg-gray-100 backface-hidden">
								<Image
									src={`/nft/${index + 1}-1.png`}
									className="w-full h-full"
									alt="nft image"
									width={300}
									height={420}
									quality={60}
								/>
							</div>
						</div>
					</div>
					<button
						className="text-gray-700 border px-4 py-2 rounded-md hover:bg-gray-200 transition active:bg-gray-400"
						onClick={increaseIdx}
					>
						다음
					</button>
				</div>
				<p className="text-center mt-4 font-semibold text-gray-600">{`${index + 1}/10`}</p>
				<div className="border py-14 rounded-md w-[460px] m-auto mt-10">
					<p className="text-center text-gray-400 font-semibold">현재 민팅 모집 금액</p>
					<p className="text-center mt-2 text-gray-900 font-semibold text-3xl">1,500,000,000</p>
					<p className="text-center mt-12 text-gray-400 font-semibold">판매용량</p>
					<p className="text-center mt-2 text-gray-900 font-semibold text-3xl">0.7MWP</p>
					<p className="text-center mt-12 text-gray-400 font-semibold">발행(판매) 수량</p>
					<p className="text-center mt-2 text-gray-900 font-semibold text-3xl">1,000 EA</p>
				</div>
				<Link href={`/mint?nftId=${index}`}>
					<div className="mx-auto border px-16 py-4 font-semibold text-white bg-blue-500 rounded-md w-[460px] mt-12 text-center cursor-pointer hover:bg-blue-400 active:bg-blue-600">
						현재 NFT 구매
					</div>
				</Link>
			</section>
		</div>
	);
}
