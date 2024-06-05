import { connectDB } from "@/db";
import { errorHandler, jwtMiddleware } from "@/helpers/api";
import getConfig from "next/config";

const { serverRuntimeConfig } = getConfig();

function apiHandler(handler: any, publicApiPath = false) {
  return async (req: any, res: any) => {
    const method = req.method.toLowerCase();

    if (!handler[method])
      return res.status(405).end(`Method ${req.method} Not Allowed`);

    try {
      await jwtMiddleware(
        req,
        res,
        publicApiPath
          ? serverRuntimeConfig.publicSecret
          : serverRuntimeConfig.secret
      );
      await connectDB();
      await handler[method](req, res);
    } catch (err) {
      errorHandler(err, res);
    }
  };
}

export { apiHandler };
