import mongoose, { Schema } from "mongoose";

interface IAnnouncement extends Document {
  title: string;
  author: string;
  content: Record<string, any>; // Adjust type if more specific structure is known
  image: string;
}

const announcementsSchema: Schema<IAnnouncement> = new Schema(
  {
    _id: Schema.Types.ObjectId,
    title: { type: String, required: true },
    author: { type: String, required: true },
    content: { type: Schema.Types.Mixed, required: true }, // Use Mixed for JSON content
    image: { type: String, required: true },
  },
  { timestamps: true }
);

const AnnouncementsModel = mongoose.model<IAnnouncement>('Announcement', announcementsSchema);

export default AnnouncementsModel;
