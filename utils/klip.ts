import axios from "axios";
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
				sessionStorage.setItem("wallet", "klip");
				clearInterval(timerId);
			}
		}, 1600);
	} catch (err) {
		console.error(err);
		typeof window !== "undefined" && sessionStorage.clear();
		clearInterval(timerId);
	}
};

export { getAdderess };
