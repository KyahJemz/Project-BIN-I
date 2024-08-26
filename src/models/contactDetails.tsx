import mongoose, { Schema } from "mongoose";

interface IContactDetail extends Document {
  name: string;
  contactDetails: string;
  type: string;
  description?: string;
  priorityIndex: number;
  deletedAt?: Date;
}

const contactDetailsSchema: Schema<IContactDetail> = new Schema(
  {
    _id: Schema.Types.ObjectId,
    name: { type: String, required: true },
    contactDetails: { type: String, required: true },
    type: { type: String, required: true },
    description: { type: String, default: null },
    priorityIndex: { type: Number, required: true },
    deletedAt: { type: Date, default: null },
  },
  { timestamps: true }
);

const ContactDetailsModel = mongoose.model<IContactDetail>('ContactDetail', contactDetailsSchema);

export default ContactDetailsModel;
