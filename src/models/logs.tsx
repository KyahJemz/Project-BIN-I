import mongoose, { Document, Schema } from 'mongoose';

interface ILogs extends Document {
  account_id: Schema.Types.ObjectId; 
  collection: Collections;
  action: Actions;
  action_id: Schema.Types.ObjectId;
}

enum Collections {
  News = 'news',
  Accounts = 'accounts',
  Announcements = 'announcements',
  Schedules = 'schedules',
  Events = 'events',
  Routes = 'routes',
  ContactDetails = 'contactDetails',
}

enum Actions {
  Create = 'create',
  Update = 'update',
  Delete = 'delete',
}

const logsSchema: Schema<ILogs> = new Schema(
  {
    _id: {
      type: Schema.Types.ObjectId,
      required: true,
    },
    account_id: {
      type: Schema.Types.ObjectId,
      required: true,
    },
    collection: {
      type: String,
      enum: Object.values(Collections),
      required: true,
    },
    action: {
      type: String,
      enum: Object.values(Actions),
      required: true,
    },
    action_id: {
      type: Schema.Types.ObjectId,
      required: true,
    },
  },
  { timestamps: true }
);

const LogsModel = mongoose.model<ILogs>('Logs', logsSchema);

export default LogsModel;