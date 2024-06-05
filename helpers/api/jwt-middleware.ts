import { expressjwt } from "express-jwt";
import getConfig from "next/config";
import util from "util";

const { serverRuntimeConfig } = getConfig();

function jwtMiddleware(req: any, res: any, secret: any) {
  const middleware = expressjwt({
    secret: secret,
    algorithms: ["HS256"],
  }).unless({
    path: serverRuntimeConfig.nonProtectedApiRoutes,
  });

  return util.promisify(middleware)(req, res);
}

export { jwtMiddleware };
