import type { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";
import { now } from "../../utils";

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
	const { address } = req.query;
	const { method } = req;

	if (!address) return res.status(400).json({ success: false });

	switch (method) {
		case "GET":
			try {
				const user = await prisma.user.findUnique({
					where: {
						id: address as string,
					},
				});
				res.status(200).json({ success: true, user: user });
			} catch (error) {
				res.status(400).json({ success: false, error: error });
			}
			break;
		case "POST":
			const user = await prisma.user.findUnique({
				where: {
					id: address as string,
				},
			});
			if (user?.id.length) return res.status(400).json({ success: false });
			try {
				const user = await prisma.user.create({
					data: {
						id: address as string,
						agree: true,
						created_at: now(),
					},
				});
				res.status(201).json({ success: true, user: user });
			} catch (error) {
				res.status(400).json({ success: false });
			}
			break;
		default:
			res.status(400).json({ success: false });
			break;
	}
}
