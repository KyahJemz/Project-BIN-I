import { Schema } from "inspector";
import mongoose, { Schema } from "mongoose";

interface IRoute extends Document {
  schedule_id: Schema.Types.ObjectId;
  routeName: string;
  pickupPoints: [number, number][];
  description?: string;
  status: string;
  notes?: string;
  deletedAt?: Date;
}

const routesSchema: Schema<IRoute> = new Schema(
  {
    _id: Schema.Types.ObjectId,
    schedule_id: { type: Schema.Types.ObjectId, required: true },
    routeName: { type: String, required: true },
    pickupPoints: { type: [[Number]], required: true }, // Array of [number, number][]
    description: { type: String, default: null },
    status: { type: String, required: true },
    notes: { type: String, default: null },
    deletedAt: { type: Date, default: null },
  },
  { timestamps: true }
);

const RoutesModel = mongoose.model<IRoute>('Route', routesSchema);

export default RoutesModel;
