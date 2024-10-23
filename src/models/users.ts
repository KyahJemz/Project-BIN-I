import * as bcrypt from 'bcryptjs';
import mongoose, { Schema, Document } from 'mongoose';

export interface IUserDocument extends Document {
	[x: string]: any;
}

const userSchema: Schema<IUserDocument> = new Schema(
	{
		firstName: {
			type: String,
			required: true,
		},
		lastName: {
			type: String,
			required: true,
		},
		middleName: {
			type: String,
			required: false,
		},
		email: {
			type: String,
			required: false,
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
		progress: [
			{
				tutorial_id: {
					type: String,
					required: true,
				},
				count: {
					type: Number,
					default: 0,
					required: false,
				},
				dateCompleted: {
					type: Date,
					required: false,
					default: null,
				},
				certificateLink: {
					type: String,
					required: false,
					default: null,
				}
			}
		],
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

userSchema.pre<IUserDocument>('save', async function (next) {
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

userSchema.index({ email: 1 }, { unique: true });

const UserModel =
	mongoose.models.users ||
	mongoose.model<IUserDocument>('users', userSchema);

export default UserModel;
