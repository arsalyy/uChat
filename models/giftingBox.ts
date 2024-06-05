import mongoose from "mongoose";

export interface IGiftingBoxModel extends mongoose.Document {
  businessId: String;
  businessBoxId: String;
}

const giftingBoxSchema = new mongoose.Schema<IGiftingBoxModel>(
  {
    businessId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Business",
      required: true,
    },
    businessBoxId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "BusinessBox",
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

giftingBoxSchema.pre<IGiftingBoxModel>("save", async function (next) {
  try {
    const businessExists = await mongoose
      .model("Business")
      .exists({ _id: this.businessId });
    if (!businessExists) {
      throw new Error(`Business with id ${this.businessId} does not exist.`);
    }

    const businessBoxExists = await mongoose
      .model("Business_Box")
      .exists({ _id: this.businessBoxId });
    if (!businessBoxExists) {
      throw new Error(
        `Business Box with id ${this.businessBoxId} does not exist.`
      );
    }

    next();
  } catch (error: any) {
    next(error);
  }
});

giftingBoxSchema.post<IGiftingBoxModel>(
  ["findOneAndDelete", "deleteOne"],
  async function () {
    try {
      const giftingBoxId = (this as any)._conditions._id;
      await mongoose
        .model("Charity_To_Gifting_Box")
        .deleteMany({ giftingBoxId });
    } catch (error: any) {
      console.log(error);
    }
  }
);

const GiftingBoxModel =
  mongoose.models.Gifting_Box ||
  mongoose.model("Gifting_Box", giftingBoxSchema);

export { GiftingBoxModel };
