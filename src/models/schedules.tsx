import mongoose, { Schema } from "mongoose";

interface ISchedule extends Document {
  schedule: string;
  location: string;
  wasteType: string;
  status: string;
  notes?: string;
  deletedAt?: string;
}

const schedulesSchema: Schema<ISchedule> = new Schema(
  {
    _id: Schema.Types.ObjectId,
    schedule: { type: String, required: true },
    location: { type: String, required: true },
    wasteType: { type: String, required: true },
    status: { type: String, required: true },
    notes: { type: String, default: null },
    deletedAt: { type: String, default: null },
  },
  { timestamps: true }
);

const SchedulesModel = mongoose.model<ISchedule>('Schedule', schedulesSchema);

export default SchedulesModel;
