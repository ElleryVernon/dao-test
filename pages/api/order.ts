import type { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";
import { now } from "../../utils";

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
	const { address } = req.query;
	const { method } = req;

	switch (method) {
		case "GET":
			if (!address) return res.status(400).json({ success: false });
			res.status(200).json({ success: true });
			break;
		case "POST":
			try {
				const { userId, NFT_id, NFT_name, Volume, price, discount, actual_price, reward, klaytn } = req.body;
				console.log(userId, NFT_id, NFT_name, Volume, price, discount, actual_price, reward, klaytn);
				const order = await prisma.order.create({
					data: {
						userId: String(userId),
						NFT_id: String(NFT_id),
						NFT_name: String(NFT_name),
						Volume: String(Volume),
						price: String(price),
						discount: String(discount),
						actual_price: String(actual_price),
						reward: String(reward),
						klaytn: String(klaytn),
						created_at: now(),
					},
					include: {
						User: true,
					},
				});
				res.status(201).json({ success: true, order: order });
			} catch (error) {
				console.log(error);
				res.status(400).json({ success: false, error: error });
			}
			break;
		default:
			res.status(400).json({ success: false });
			break;
	}
}
