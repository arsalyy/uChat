import mongoose, { Schema, Document } from "mongoose";

export interface IBusinessBoxModel extends Document {
  businessId: mongoose.Types.ObjectId;
}

const businessBoxSchema = new Schema<IBusinessBoxModel>(
  {
    businessId: {
      type: Schema.Types.ObjectId,
      ref: "Business",
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

businessBoxSchema.pre<IBusinessBoxModel>("save", async function (next) {
  try {
    const businessExists = await mongoose
      .model("Business")
      .exists({ _id: this.businessId });
    if (!businessExists) {
      throw new Error(`Business with id ${this.businessId} does not exist.`);
    }
    next();
  } catch (error: any) {
    next(error);
  }
});

businessBoxSchema.post<IBusinessBoxModel>(
  ["findOneAndDelete", "deleteOne"],
  async function () {
    try {
      const businessBoxId = (this as any)._conditions._id;
      await mongoose
        .model("Business_Box_To_Gift_Card")
        .deleteMany({ businessBoxId });
      await mongoose.model("Gifting_Box").deleteMany({ businessBoxId });
    } catch (error: any) {
      console.log(error);
    }
  }
);

const BusinessBoxModel =
  mongoose.models.Business_Box ||
  mongoose.model<IBusinessBoxModel>("Business_Box", businessBoxSchema);

export { BusinessBoxModel };
