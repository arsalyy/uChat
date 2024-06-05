import { NextApiRequest, NextApiResponse } from "next";
import { IGiftCard } from "@/interfaces";
import { apiHandler } from "@/helpers/api";
import { giftCardController } from "@/controllers";

export default apiHandler({
  get: findMany,
});

async function findMany(req: NextApiRequest, res: NextApiResponse) {
  const giftCards: IGiftCard[] = await giftCardController.findMany();
  return res.status(200).json(giftCards);
}
