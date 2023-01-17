import type { NextApiRequest, NextApiResponse } from "next";
import { caver, countContract } from "../../utils/caver";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
	if (req.method === "GET") {
		const _count = await countContract.methods.count().call();
		return res.status(200).json({ count: _count });
	} else if (req.method === "POST") {
		const { count } = req.query;

		if (!count) {
			return res.status(400).json({ message: "count is require" });
		}

		const deployer = caver.wallet.keyring.createFromPrivateKey(process.env.PRIVATE_KEY as string);
		caver.wallet.add(deployer);
		const _receipt = await countContract.methods.setCount(count).send({
			from: deployer.address,
			gas: "0x4bfd200",
		});
		return res.status(200).json({ receipt: _receipt });
	}
}
