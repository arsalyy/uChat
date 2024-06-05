import {
  BusinessBoxModel,
  BusinessBoxToGiftCardModel,
  IBusinessBoxModel,
  IBusinessBoxToGiftCardModel,
} from "@/models";

const findMany = async () => await BusinessBoxModel.find();

const create = async (params: IBusinessBoxModel) => {
  const businessBox = new BusinessBoxModel(params);
  await businessBox.save();
};

const addGiftCard = async (params: IBusinessBoxToGiftCardModel) => {
  const businessBoxToGiftCard = new BusinessBoxToGiftCardModel(params);
  await businessBoxToGiftCard.save();
};

export const businessBoxController = {
  findMany,
  create,
  addGiftCard,
};
