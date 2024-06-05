import mongoose from "mongoose";

export interface IBusinessBoxToGiftCardModel extends mongoose.Document {
  giftCardId: String;
  businessBoxId: String;
  quantity: Number;
}

const businessBoxToGiftCardSchema =
  new mongoose.Schema<IBusinessBoxToGiftCardModel>(
    {
      giftCardId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "GiftCard",
        required: true,
      },
      businessBoxId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "BusinessBox",
        required: true,
      },
      quantity: {
        type: Number,
        required: true,
        min: 1,
      },
    },
    {
      timestamps: true,
      toJSON: {
        transform: function (doc, ret) {
          delete ret.createdAt;
          delete ret.updatedAt;
          delete ret.__v;
        },
      },
    }
  );

businessBoxToGiftCardSchema.index(
  { businessBoxId: 1, giftCardId: 1 },
  { unique: true }
);

businessBoxToGiftCardSchema.pre<IBusinessBoxToGiftCardModel>(
  "save",
  async function (next) {
    try {
      const businessBoxExists = await mongoose
        .model("Business_Box")
        .exists({ _id: this.businessBoxId });
      if (!businessBoxExists) {
        throw new Error(
          `Business Box with id ${this.businessBoxId} does not exist.`
        );
      }

      const giftCardExists = await mongoose
        .model("Gift_Card")
        .exists({ _id: this.giftCardId });
      if (!giftCardExists) {
        throw new Error(`Gift Card with id ${this.giftCardId} does not exist.`);
      }

      next();
    } catch (error: any) {
      next(error);
    }
  }
);

const BusinessBoxToGiftCardModel =
  mongoose.models.Business_Box_To_Gift_Card ||
  mongoose.model("Business_Box_To_Gift_Card", businessBoxToGiftCardSchema);

export { BusinessBoxToGiftCardModel };
