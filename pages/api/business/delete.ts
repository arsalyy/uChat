import { NextApiRequest, NextApiResponse } from "next";
import { apiHandler } from "@/helpers/api";
import { businessController } from "@/controllers";

export default apiHandler({
  delete: remove,
});

async function remove(req: NextApiRequest, res: NextApiResponse) {
  const id: string = req.query.id as string;
  if (!id) return res.status(400).json({ message: "Id is required to remove" });
  const response = await businessController.remove(id);
  return res.status(200).json(response);
}
