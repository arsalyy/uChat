import { GiftCardModel, IGiftCardModel } from "@/models";

const findMany = async () => await GiftCardModel.find();

const create = async (params: IGiftCardModel) => {
  const giftCard = new GiftCardModel(params);
  await giftCard.save();
};

export const giftCardController = {
  findMany,
  create,
};
