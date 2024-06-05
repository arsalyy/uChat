import mongoose, { ObjectId } from "mongoose";

export interface IGiftCardModel {
  id: string;
  value: number;
  expiry: Date;
  description: string;
}

const giftCardSchema = new mongoose.Schema<IGiftCardModel>(
  {
    value: {
      type: Number,
      required: true,
      min: 0,
    },
    expiry: {
      type: Date,
      required: true,
    },
    description: {
      type: String,
      required: true,
      maxLength: 100,
    },
  },
  {
    timestamps: true,
    toJSON: {
      transform: function (doc, ret) {
        ret.id = ret._id;
        delete ret._id;
        delete ret.createdAt;
        delete ret.updatedAt;
        delete ret.__v;
      },
    },
  }
);

giftCardSchema.post<IGiftCardModel>(
  ["findOneAndDelete", "deleteOne"],
  async function () {
    try {
      const giftCardId = (this as any)._conditions._id;

      await mongoose
        .model("Business_Box_To_Gift_Card")
        .deleteMany({ giftCardId });

      await mongoose.model("Donor_To_Charity").deleteMany({ giftCardId });
    } catch (error: any) {
      console.log(error);
    }
  }
);

const GiftCardModel =
  mongoose.models.Gift_Card || mongoose.model("Gift_Card", giftCardSchema);

export { GiftCardModel };
