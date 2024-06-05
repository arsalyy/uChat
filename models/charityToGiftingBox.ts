import mongoose from "mongoose";

export interface ICharityToGiftingBoxModel extends mongoose.Document {
  charityId: String;
  giftingBoxId: String;
}

const charityToGiftingBoxSchema =
  new mongoose.Schema<ICharityToGiftingBoxModel>(
    {
      charityId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Charity",
        required: true,
      },
      giftingBoxId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Gifting_Box",
        required: true,
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

charityToGiftingBoxSchema.index(
  { charityId: 1, giftingBoxId: 1 },
  { unique: true }
);

charityToGiftingBoxSchema.pre<ICharityToGiftingBoxModel>(
  "save",
  async function (next) {
    try {
      const charityExists = await mongoose
        .model("Charity")
        .exists({ _id: this.charityId });
      if (!charityExists) {
        throw new Error(`Charity with id ${this.charityId} does not exist.`);
      }

      const giftingBoxExists = await mongoose
        .model("Gifting_Box")
        .exists({ _id: this.giftingBoxId });
      if (!giftingBoxExists) {
        throw new Error(
          `Gifting Box with id ${this.giftingBoxId} does not exist.`
        );
      }

      next();
    } catch (error: any) {
      next(error);
    }
  }
);

const CharityToGiftingBoxModel =
  mongoose.models.Charity_To_Gifting_Box ||
  mongoose.model("Charity_To_Gifting_Box", charityToGiftingBoxSchema);

export { CharityToGiftingBoxModel };
