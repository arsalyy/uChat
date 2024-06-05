import mongoose from "mongoose";

export interface ICharityModel extends mongoose.Document {
  email: string;
  password: string;
  name: String;
  description: String;
  url: String;
  logo?: String;
}

const charitySchema = new mongoose.Schema<ICharityModel>(
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

charitySchema.post<ICharityModel>(
  ["findOneAndDelete", "deleteOne"],
  async function () {
    try {
      const charityId = (this as any)._conditions._id;
      await mongoose.model("Donor_To_Charity").deleteMany({ charityId });
      await mongoose.model("Charity_To_Gifting_Box").deleteMany({ charityId });
    } catch (error: any) {
      console.log(error);
    }
  }
);

const CharityModel =
  mongoose.models.Charity || mongoose.model("Charity", charitySchema);

export { CharityModel };
