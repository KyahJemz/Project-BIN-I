import mongoose, { Schema, Document } from 'mongoose';

export interface ITutorialDocument extends Document {
	[x: string]: any;
}

const tutorialSchema: Schema<ITutorialDocument> = new Schema(
	{
		title: {
			type: String,
			required: true,
		},
		tasks: [{
			title: {
				type: String,
				required: true,
			},
			videoLink: {
				type: String,
				required: true,
			},
			description: {
				type: String,
				required: true,
			}
		}],
		certificate: {
			type: String,
			required: false,
		},
		tutorial_status: {
			completers: {
				type: Number,
				default: 0,
				required: false,
			},
			ongoing: {
				type: Number,
				default: 0,
				required: false,
			}
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

tutorialSchema.index({ email: 1 }, { unique: true });

const TutorialModel =
	mongoose.models.tutorials ||
	mongoose.model<ITutorialDocument>('tutorials', tutorialSchema);

export default TutorialModel;
