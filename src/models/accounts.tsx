import mongoose, { Document, Schema } from 'mongoose';

interface IAccount extends Document {
  firstName: string;
  lastName: string;
  position?: string;
  department?: string;
  email: string;
  type: AccountType;
  password: string;
  deletedAt?: string;
}

enum AccountType {
  Admin = 'admin',
  DefaultAdmin = 'defaultAdmin',
}

const accountsSchema: Schema<IAccount> = new Schema(
  {
    _id: {
      type: Schema.Types.ObjectId,
      required: true,
    },
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    position: {
      type: String,
      required: false,
    },
    department: {
      type: String,
      required: false,
    },
    email: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      required: true,
      default: AccountType.Admin,
      enum: Object.values(AccountType),
    },
    password: {
      type: String,
      required: true,
    },
    deletedAt: {
      type: String,
      required: false,
    },
  },
  { timestamps: true }
);

const AccountModel = mongoose.model<IAccount>('Account', accountsSchema);

export default AccountModel;