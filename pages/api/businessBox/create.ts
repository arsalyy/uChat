import { NextApiRequest, NextApiResponse } from "next";
import { apiHandler } from "@/helpers/api";
import { businessBoxController } from "@/controllers";

export default apiHandler({
  post: create,
});

async function create(req: NextApiRequest, res: NextApiResponse) {
  const businessBox = await businessBoxController.create(req.body);
  return res.status(200).json(businessBox);
}
