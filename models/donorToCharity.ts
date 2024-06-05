import mongoose from "mongoose";

export interface IDonorToCharityModel extends mongoose.Document {
  charityId: String;
  donorId: String;
  giftMeURL: String;
  isActive?: Boolean;
  giftCardId?: String;
}

const donorToCharitySchema = new mongoose.Schema<IDonorToCharityModel>(
  {
    charityId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Charity",
      required: true,
    },
    donorId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Donor",
      required: true,
    },
    giftMeURL: { type: String, required: true, maxlength: 100 },
    isActive: { type: Boolean, default: true },
    giftCardId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "GiftCard",
      default: null,
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

donorToCharitySchema.pre<IDonorToCharityModel>("save", async function (next) {
  try {
    const charityExists = await mongoose
      .model("Charity")
      .exists({ _id: this.charityId });
    if (!charityExists) {
      throw new Error(`Charity with id ${this.charityId} does not exist.`);
    }

    const donorExists = await mongoose
      .model("Donor")
      .exists({ _id: this.donorId });
    if (!donorExists) {
      throw new Error(`Donor with id ${this.donorId} does not exist.`);
    }

    if (this.giftCardId) {
      const giftCardExists = await mongoose
        .model("Gift_Card")
        .exists({ _id: this.giftCardId });
      if (!giftCardExists) {
        throw new Error(`Gift Card id ${this.giftCardId} does not exist.`);
      }
    }

    next();
  } catch (error: any) {
    next(error);
  }
});

const DonorToCharityModel =
  mongoose.models.Donor_To_Charity ||
  mongoose.model("Donor_To_Charity", donorToCharitySchema);

export { DonorToCharityModel };
