import mongoose, { Schema } from "mongoose";

interface IEvent extends Document {
  title: string;
  author: string;
  content: Record<string, any>; // Adjust type if more specific structure is known
  image: string;
  eventDate: Date;
  eventTime: string; // Adjust type if necessary (e.g., Date or string)
  status: string;
  deletedAt?: Date;
}

const eventsSchema: Schema<IEvent> = new Schema(
  {
    _id: Schema.Types.ObjectId,
    title: { type: String, required: true },
    author: { type: String, required: true },
    content: { type: Schema.Types.Mixed, required: true }, // Use Mixed for JSON content
    image: { type: String, required: true },
    eventDate: { type: Date, required: true },
    eventTime: { type: String, required: true },
    status: { type: String, required: true },
    deletedAt: { type: Date, default: null },
  },
  { timestamps: true }
);

const EventsModel = mongoose.model<IEvent>('Event', eventsSchema);

export default EventsModel;
