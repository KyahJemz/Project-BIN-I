import { IContactDetail } from "@/types/IContactDetail.dto";
import mongoose, { Schema, Document } from "mongoose";

export interface IContactDetailsDocument extends IContactDetail, Document {}

const contactDetailsSchema: Schema<IContactDetailsDocument> = new Schema(
  {
    name: { 
      type: String, 
      required: true 
    },
    contactDetails: { 
      type: String, 
      required: true 
    },
    type: { 
      type: String, 
      required: true 
    },
    description: { 
      type: String,
      default: null 
    },
    priorityIndex: { 
      type: Number, 
      required: true 
    },
    deletedAt: { 
      type: Date, 
      default: null 
    },
  },
  { 
    timestamps: true,
    versionKey: false,
  }
);

const ContactDetailsModel = mongoose.model<IContactDetailsDocument>('ContactDetail', contactDetailsSchema);

export default ContactDetailsModel;
