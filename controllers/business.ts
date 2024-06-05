import getConfig from "next/config";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { BusinessModel, IBusinessBoxModel, IBusinessModel } from "@/models";

const { serverRuntimeConfig } = getConfig();

const authenticate = async ({ email, password }: IBusinessModel) => {
  const business = await BusinessModel.findOne({ email });
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

const create = async (params: IBusinessModel) => {
  if (await BusinessModel.findOne({ email: params.email })) {
    throw 'Email "' + params.email + '" is already taken';
  }
  const business = new BusinessModel(params);
  if (params.password) {
    business.password = bcrypt.hashSync(params.password, 10);
  }
  await business.save();
};

const findMany = async (): Promise<IBusinessModel[]> =>
  await BusinessModel.find();

const remove = async (id: string) => {
  const res = await BusinessModel.deleteOne({ _id: id });
  if (res.deletedCount <= 0) throw "Id " + id + " did not exists.";
};

export const businessController = {
  authenticate,
  create,
  findMany,
  remove,
};
