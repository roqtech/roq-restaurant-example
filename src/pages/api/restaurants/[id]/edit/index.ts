import type { NextApiRequest, NextApiResponse } from "next";
import { withAuth } from "@roq/nextjs";
import { prisma } from "server/db";

async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "PUT") {
    res.status(405).send({ message: "Method not allowed" });
    res.end();
  }

  const { id } = req.query as { id: string };

  try {
    const restaurant = await prisma.restaurant.update({
      where: { id: id },
      data: { ...req.body },
    });
    res.status(200).json(restaurant);
  } catch (e) {
    res.status(200).json({ files: [], totalCount: 0 });
  }
}

export default function filesHandler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  return withAuth(req, res)(handler);
}
