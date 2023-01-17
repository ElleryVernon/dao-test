import type { NextApiRequest, NextApiResponse } from "next";
import { caver } from "../../utils/caver";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
	const { address } = req.query;

	if (!address) {
		return res.status(400).json({ message: "address is require" });
	}

	const _balance = await caver.rpc.klay
		.getBalance(address as string)
		.then((res) => caver.utils.convertFromPeb(caver.utils.hexToNumberString(res), "KLAY"));
	res.status(200).json({ balance: _balance });
}
