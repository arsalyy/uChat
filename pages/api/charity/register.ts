import { NextApiRequest, NextApiResponse } from "next";
import { apiHandler } from "@/helpers/api";
import { charityController } from "@/controllers";

export default apiHandler({
  post: register,
});

async function register(req: NextApiRequest, res: NextApiResponse) {
  const charity = await charityController.create(req.body);
  return res.status(200).json(charity);
}
