import { NextApiRequest, NextApiResponse } from "next";
import { IBusiness } from "@/interfaces";
import { apiHandler } from "@/helpers/api";
import { businessController } from "@/controllers";

export default apiHandler({
  get: findMany,
});

async function findMany(req: NextApiRequest, res: NextApiResponse) {
  const businesses: IBusiness[] = await businessController.findMany();
  return res.status(200).json(businesses);
}
