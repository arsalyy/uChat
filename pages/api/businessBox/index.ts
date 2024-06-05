import { NextApiRequest, NextApiResponse } from "next";
import { IBusinessBox } from "@/interfaces";
import { apiHandler } from "@/helpers/api";
import { businessBoxController } from "@/controllers";

export default apiHandler({
  get: findMany,
});

async function findMany(req: NextApiRequest, res: NextApiResponse) {
  const businessBoxes: IBusinessBox[] = await businessBoxController.findMany();
  return res.status(200).json(businessBoxes);
}
