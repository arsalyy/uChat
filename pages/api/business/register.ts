import { NextApiRequest, NextApiResponse } from "next";
import { apiHandler } from "@/helpers/api";
import { businessController } from "@/controllers";

export default apiHandler({
  post: register,
});

async function register(req: NextApiRequest, res: NextApiResponse) {
  const business = await businessController.create(req.body);
  return res.status(200).json(business);
}
