import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const Header = () => {
	const router = useRouter();
	const [isLoading, setIsLoading] = useState<boolean>(true);
	const [address, setAdress] = useState<string | null>(null);

	useEffect(() => {
		setAdress(sessionStorage.getItem("address"));
		setIsLoading(false);
	}, []);
	const logOut = () => {
		sessionStorage.removeItem("address");
		sessionStorage.removeItem("wallet");
		router.reload();
	};

	return (
		<header className="sticky top-0 z-50 flex bg-white py-2 shadow-sm justify-between px-4 lg:px-12">
			<Link href="/">
				<div className="flex flex-shrink-1 cursor-pointer items-start justify-start my-3 text-xl font-semibold hover:bg-gray-200 px-4 py-2 rounded-sm trasnition">
					CZERO DAO
				</div>
			</Link>
			<div className="flex space-x-2 items-center">
				<Link href="/mint">
					<button className="px-2 h-12 w-16 bg-blue-400 hover:bg-blue-300 font-semibold text-white rounded-xl text-xs">
						MINT
					</button>
				</Link>
				{address?.length ? (
					<button
						className="items-center flex space-x-2 border border-gray-300 my-1 cursor-pointer rounded-xl hover:bg-gray-300 px-4 transition bg-white text-gray-900 h-12 font-semibold active:bg-white text-xs"
						onClick={() => logOut()}
					>
						<div className="text-xs flex-1">
							<p className="truncate">
								{address.slice(0, 4)}...{address.slice(address.length - 4)}
							</p>
							<p className="text-gray-400 font-normal">로그아웃</p>
						</div>
					</button>
				) : (
					<Link href="/login">
						<button className="items-center flex space-x-2 border border-blue-300 my-1 cursor-pointer rounded-xl hover:bg-blue-300 hover:text-white px-4 transition bg-white text-blue-400 h-12 font-semibold active:bg-blue-500 text-xs">
							지갑 연결하기
						</button>
					</Link>
				)}
			</div>
		</header>
	);
};

export default Header;
