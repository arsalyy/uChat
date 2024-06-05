import { NextApiRequest, NextApiResponse } from "next";
import { apiHandler } from "@/helpers/api";
import { giftCardController } from "@/controllers";

export default apiHandler({
  post: create,
});

async function create(req: NextApiRequest, res: NextApiResponse) {
  const giftCard = await giftCardController.create(req.body);
  return res.status(200).json(giftCard);
}
