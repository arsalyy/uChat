import { NextApiRequest, NextApiResponse } from "next";
import { apiHandler } from "@/helpers/api";
import { charityController } from "@/controllers";

export default apiHandler({
  post: authenticate,
});

async function authenticate(req: NextApiRequest, res: NextApiResponse) {
  const charity = await charityController.authenticate(req.body);
  return res.status(200).json(charity);
}
