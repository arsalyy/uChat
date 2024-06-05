import { NextApiRequest, NextApiResponse } from "next";
import { IBusiness } from "@/interfaces";
import { apiHandler } from "@/helpers/api";
import { charityController } from "@/controllers";

export default apiHandler({
  get: findMany,
});

async function findMany(req: NextApiRequest, res: NextApiResponse) {
  const charities: IBusiness[] = await charityController.findMany();
  return res.status(200).json(charities);
}
