import Caver, { AbiItem, HttpProviderOptions } from "caver-js";
import ABI from "./abi.json";

const CHAIN_ID = 8217; // 1001
const KEY = process.env.ACCESS_KEY + ":" + process.env.SECRET_KEY;
const option = {
	headers: [
		{
			name: "Authorization",
			value: `Basic ${Buffer.from(KEY).toString("base64")}`,
		},
		{
			name: "x-chain-id",
			value: CHAIN_ID,
		},
	],
};

const caver = new Caver(
	new Caver.providers.HttpProvider("https://node-api.klaytnapi.com/v1/klaytn", option as HttpProviderOptions)
);

const countContract = new caver.contract(ABI as AbiItem[], process.env.MAIN_CONTRACT_ADDRESS as string);

export { countContract, caver };
