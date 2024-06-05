import { NextApiRequest, NextApiResponse } from "next";
import { apiHandler } from "@/helpers/api";
import { businessBoxController } from "@/controllers";

export default apiHandler({
  post: addGiftCard,
});

async function addGiftCard(req: NextApiRequest, res: NextApiResponse) {
  const businessBoxToGiftCard = await businessBoxController.addGiftCard(
    req.body
  );
  return res.status(200).json(businessBoxToGiftCard);
}
