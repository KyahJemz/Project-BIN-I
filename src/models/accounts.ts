import { AccountTypeEnum } from '@/enums/accountType.enum';
import { IAccount } from '@/types/IAccount.dto';
import * as bcrypt from 'bcryptjs';
import mongoose, { Schema, Document } from 'mongoose';

export interface IAccountDocument extends IAccount, Document {
	[x: string]: any;
}

const accountsSchema: Schema<IAccountDocument> = new Schema(
	{
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
			unique: true,
		},
		type: {
			type: String,
			required: true,
			default: AccountTypeEnum.Admin,
			enum: Object.values(AccountTypeEnum),
		},
		password: {
			type: String,
			required: true,
		},
		token: {
			type: String,
			default: null,
			required: false,
		},
		deletedAt: {
			type: Date,
			required: false,
			default: null,
		},
	},
	{
		timestamps: true,
		versionKey: false,
	},
);

accountsSchema.pre<IAccountDocument>('save', async function (next) {
	if (this.isModified('password')) {
		try {
			this.password = await bcrypt.hash(this.password, 10);
			next();
		} catch (error: any) {
			next(new Error(`Error hashing password: ${error.message}`));
		}
	} else {
		next();
	}
});

accountsSchema.index({ email: 1 }, { unique: true });

const AccountModel =
	mongoose.models.Account ||
	mongoose.model<IAccountDocument>('Account', accountsSchema);

export default AccountModel;
