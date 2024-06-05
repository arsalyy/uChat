import mongoose from "mongoose";

export interface IDonorModel extends mongoose.Document {
  email: String;
  firstName: String;
  lastName: String;
  phone: String;
}

const donorSchema = new mongoose.Schema<IDonorModel>(
  {
    email: { type: String, unique: true, required: true, maxlength: 100 },
    firstName: { type: String, required: true, maxlength: 50 },
    lastName: { type: String, required: true, maxlength: 50 },
    phone: { type: String, required: true, maxlength: 50 },
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

donorSchema.post<IDonorModel>(
  ["findOneAndDelete", "deleteOne"],
  async function () {
    try {
      const donorId = (this as any)._conditions._id;
      await mongoose.model("Donor_To_Charity").deleteMany({ donorId });
    } catch (error: any) {
      console.log(error);
    }
  }
);

const DonorModel =
  mongoose.models.Donor || mongoose.model("Donor", donorSchema);

export { DonorModel };
