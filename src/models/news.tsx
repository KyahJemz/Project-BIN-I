import mongoose, { Schema, Document } from 'mongoose';

interface INews extends Document {
  title: string;
  author: string;
  content: Record<string, any>; 
  image: string;
  deletedAt?: Date;
}

const newsSchema: Schema<INews> = new Schema(
  {
    _id: Schema.Types.ObjectId,
    title: { type: String, required: true },
    author: { type: String, required: true },
    content: { type: Schema.Types.Mixed, required: true },
    image: { type: String, required: true },
    deletedAt: { type: Date, default: null },
  },
  { timestamps: true }
);

const NewsModel = mongoose.model<INews>('News', newsSchema);

export default NewsModel;
