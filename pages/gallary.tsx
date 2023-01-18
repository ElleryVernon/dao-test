import { Header } from "../components";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Image from "next/image";

export default function Home() {
	const router = useRouter();
	const [index, setIndex] = useState<number>(1);
	const [isLoading, setIsLoading] = useState<boolean>(true);
	const [address, setAdress] = useState<string | null>(null);

	const increaseIdx = () => {
		if (index < 10) {
			setIndex(index + 1);
		} else {
			setIndex(1);
		}
	};

	const decreaseIdx = () => {
		if (index > 1) {
			setIndex(index - 1);
		} else {
			setIndex(10);
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
		<>
			<Header />
			<section className="h-screen flex justify-center gap-x-16 text-gray-800 m-auto mt-16">
				<div className="h-[420px] flex items-center">
					<button
						className="text-gray-700 border px-4 py-2 rounded-md hover:bg-gray-200 transition active:bg-gray-400"
						onClick={decreaseIdx}
					>
						이전
					</button>
					<div className="w-[300px] h-[420px] bg-transparent cursor-pointer group perspective mx-4">
						<div className="relative preserve-3d group-hover:my-rotate-y-180 w-full h-full duration-1000">
							<div className="absolute backface-hidden border-2 w-full h-full border-gray-300 rounded">
								<Image src={`/nft/${index}.png`} className="w-full h-full" alt="nft image" width={300} height={420} />
							</div>
							<div className="absolute my-rotate-y-180  w-full h-full bg-gray-100 backface-hidden">
								<Image src={`/nft/${index}-1.png`} className="w-full h-full" alt="nft image" width={300} height={420} />
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
			</section>
		</>
	);
}
