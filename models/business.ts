import mongoose, { Query } from "mongoose";
import { BusinessBoxModel } from "@/models";

export interface IBusinessModel extends mongoose.Document {
  email: string;
  password: string;
  name: String;
  description: String;
  url: String;
  logo?: String;
}

const businessSchema = new mongoose.Schema<IBusinessModel>(
  {
    email: { type: String, unique: true, required: true, maxlength: 100 },
    password: { type: String, required: true },
    name: { type: String, required: true, maxlength: 100 },
    description: { type: String, required: true, maxlength: 256 },
    url: { type: String, required: true, maxlength: 100 },
    logo: { type: String },
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

businessSchema.post<IBusinessModel>(
  ["findOneAndDelete", "deleteOne"],
  async function () {
    try {
      const businessId = (this as any)._conditions._id;
      await mongoose.model("Business_Box").deleteMany({ businessId });
      await mongoose.model("Gifting_Box").deleteMany({ businessId });
    } catch (error: any) {
      console.log(error);
    }
  }
);

const BusinessModel =
  mongoose.models.Business || mongoose.model("Business", businessSchema);

export { BusinessModel };
