import { NextApiRequest, NextApiResponse } from "next";
import { apiHandler } from "@/helpers/api";
import { businessController } from "@/controllers";

export default apiHandler({
  post: authenticate,
});

async function authenticate(req: NextApiRequest, res: NextApiResponse) {
  const business = await businessController.authenticate(req.body);
  return res.status(200).json(business);
}
