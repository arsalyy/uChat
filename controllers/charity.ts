import getConfig from "next/config";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { CharityModel, ICharityModel } from "@/models";

const { serverRuntimeConfig } = getConfig();

const authenticate = async ({ email, password }: ICharityModel) => {
  const business = await CharityModel.findOne({ email });
  if (!(business && bcrypt.compareSync(password, business.password))) {
    throw "Email or password is incorrect";
  }
  const token = jwt.sign({ sub: business.id }, serverRuntimeConfig.secret, {
    expiresIn: "7d",
  });
  return {
    ...business.toJSON(),
    token,
  };
};

const create = async (params: ICharityModel) => {
  if (await CharityModel.findOne({ email: params.email })) {
    throw 'Email "' + params.email + '" is already taken';
  }
  const business = new CharityModel(params);
  if (params.password) {
    business.password = bcrypt.hashSync(params.password, 10);
  }
  await business.save();
};

const findMany = async () => await CharityModel.find();

export const charityController = {
  authenticate,
  create,
  findMany,
};
