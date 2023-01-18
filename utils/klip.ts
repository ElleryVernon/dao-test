import axios from "axios";
import ABI from "./abi.json";
import { Dispatch, SetStateAction } from "react";

const getAdderess = async (setQrvalue: Dispatch<SetStateAction<string>>, logIn: Function) => {
	let timerId: string | number | NodeJS.Timeout | undefined = "";
	try {
		const { data } = await axios.post("https://a2a-api.klipwallet.com/v2/a2a/prepare", {
			bapp: {
				name: "CZERO DAO",
			},
			type: "auth",
		});

		const { request_key } = data;
		const qrcode = `https://klipwallet.com/?target=/a2a?request_key=${request_key}`;
		setQrvalue(qrcode);

		timerId = setInterval(async () => {
			const res = await axios.get(`https://a2a-api.klipwallet.com/v2/a2a/result?request_key=${request_key}`);
			if (res.data.result?.klaytn_address.length) {
				logIn(res.data.result.klaytn_address);
				clearInterval(timerId);
			}
		}, 1600);
	} catch (err) {
		console.error(err);
		typeof window !== "undefined" && sessionStorage.clear();
		clearInterval(timerId);
	}
};

const transaction = async (count: number, setQrvalue: Dispatch<SetStateAction<string>>) => {
	try {
		const { data } = await axios.post("https://a2a-api.klipwallet.com/v2/a2a/prepare", {
			bapp: {
				name: "CZERO DAO",
				callback: {},
			},
			type: "execute_contract",
			transaction: {
				to: "0x1e6669681757A93a27dDa896db3F9998652D4BB3",
				value: "0",
				abi: `{ "constant": false, "inputs": [ { "internalType": "uint256", "name": "_count", "type": "uint256" } ], "name": "setCount", "outputs": [], "payable": false, "stateMutability": "nonpayable", "type": "function" }`,
				params: `[\"${count}\"]`,
			},
		});

		const { request_key } = data;
		const qrcode = `https://klipwallet.com/?target=/a2a?request_key=${request_key}`;
		setQrvalue(qrcode);

		const timerId = setInterval(async () => {
			const res = await axios.get(`https://a2a-api.klipwallet.com/v2/a2a/result?request_key=${request_key}`);
			console.log(`Result: ${JSON.stringify(res.data.result)}`);
			if (res.data.result?.status == "success") {
				clearInterval(timerId);
			}
		}, 1600);
	} catch (err) {
		console.log(err);
	}
};

export { getAdderess, transaction };
