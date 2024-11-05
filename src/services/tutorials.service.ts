import { ITutorialDocument } from '@/models/tutorials';
import { Model } from 'mongoose';
import { MongoDbConnect } from '@/utils/mongodb';
import { IUpdateTutorialStatusRequest } from '@/validation/tutorials.validation';

export class TutorialsService {
	private readonly rqst: any;
	constructor(
		private readonly tutorialModel: Model<ITutorialDocument>,
		private readonly rqst: any,
	) {
		this.rqst = rqst;
	}

	async getTutorialById(id: string) {
		try {
			await MongoDbConnect();
			const tutorial = await this.tutorialModel
				.findOne({ _id: id, deletedAt: null });
			if (!tutorial) {
				throw new Error('No tutorial found');
			}
			return tutorial;
		} catch (error) {
			throw error;
		}
	}
	
	async getAllTutorials() {
		try {
			await MongoDbConnect();
			const tutorial = await this.tutorialModel
				.find({ deletedAt: null })
				.sort({ createdAt: -1 })
				.lean();
			if (!tutorial) {
				throw new Error('No tutorials found');
			}
			return tutorial;
		} catch (error) {
			throw error;
		}
	}

	async getCertificateById(id: string) {
		try {
			await MongoDbConnect();
			const tutorial = await this.tutorialModel
				.findOne({ _id: id, deletedAt: null })
				.lean();
			if (!tutorial) {
				throw new Error('No tutorial found');
			}
			return tutorial;
		} catch (error) {
			throw error;
		}
	}

	async updateTutorialStatus(id: string, request: IUpdateTutorialStatusRequest) {
		try {
			await MongoDbConnect();
			const tutorial = await this.tutorialModel.findById(id);
			if (!tutorial) {
				throw new Error('Tutorial not found');
			}
			if (request.tutorial_status) {
				tutorial.tutorial_status.completers = request.tutorial_status.completers ?? tutorial.tutorial_status.completers;
				tutorial.tutorial_status.ongoing = request.tutorial_status.ongoing ?? tutorial.tutorial_status.ongoing;
			}	
			const updatedTutorial = await tutorial.save();
			return updatedTutorial.toObject();
		} catch (error) {
			throw error;
		}
	}

	async createTutorials() {
		await MongoDbConnect();
		const tutorial = await this.tutorialModel.insertMany([
			{
			  title: "Plastic Recycling",
			  tasks: [
				{
				  title: "1. Understanding Plastic Types and Codes",
				  videoLink: "https://www.youtube.com/watch?v=irA5aLrL3tk",
				  description: "Discover the different types of plastic, their recycling symbols, and how to identify recyclable plastics."
				},
				{
				  title: "2. Common Contaminants in Plastic Recycling",
				  videoLink: "https://www.youtube.com/watch?v=GVGxYFgJhKw",
				  description: "Learn about items that contaminate the recycling stream and how to avoid them."
				},
				{
				  title: "3. Preparing Plastics for Recycling",
				  videoLink: "https://www.youtube.com/watch?v=DFOa0uVde6U",
				  description: "Learn the best practices for cleaning and preparing plastics before recycling."
				},
				{
				  title: "4. Innovations in Plastic Recycling",
				  videoLink: "https://www.youtube.com/watch?v=uVsVp-wtK_M",
				  description: "Explore modern techniques in plastic recycling, such as chemical recycling and bioplastics."
				}
			  ],
			  certificate: ""
			},
			{
			  title: "Paper Recycling",
			  tasks: [
				{
				  title: "1. Types of Paper and Cardboard You Can Recycle",
				  videoLink: "https://www.youtube.com/watch?v=7yb3EfkZYkI",
				  description: "Identify which types of paper and cardboard are accepted in recycling programs."
				},
				{
				  title: "2. Preparing Paper for Recycling",
				  videoLink: "https://www.youtube.com/watch?v=VYONpgrxH8Y",
				  description: "Learn how to properly prepare paper products for recycling to improve efficiency."
				},
				{
				  title: "3. Avoiding Paper Contamination",
				  videoLink: "https://www.youtube.com/watch?v=GrRRw7R-ttI",
				  description: "Understand what makes paper and cardboard unrecyclable and how to avoid contaminants."
				},
				{
				  title: "4. The Process of Paper Recycling",
				  videoLink: "https://www.youtube.com/watch?v=fT2TAA2x9GU",
				  description: "Follow the journey of recycled paper from collection to becoming new paper products."
				}
			  ],
			  certificate: ""
			},
			{
			  title: "E-Waste Recycling",
			  tasks: [
				{
				  title: "1. What Qualifies as E-Waste",
				  videoLink: "https://www.youtube.com/watch?v=e4z4d5I_o44",
				  description: "Learn what electronic items count as e-waste and why proper disposal is important."
				},
				{
				  title: "2. Preparing Electronics for Disposal",
				  videoLink: "https://www.youtube.com/watch?v=oWddifRrT8I",
				  description: "Discover the steps to take before recycling electronics, like data deletion and safe packaging."
				},
				{
				  title: "3. Where to Recycle E-Waste",
				  videoLink: "https://www.youtube.com/watch?v=lcnFhX_oIOY",
				  description: "Find out where you can recycle electronics safely and effectively."
				},
				{
				  title: "4. The E-Waste Recycling Process",
				  videoLink: "https://www.youtube.com/watch?v=qGkhuE4zB-Q",
				  description: "Understand the process electronics undergo when recycled, from dismantling to material recovery."
				}
			  ],
			  certificate: ""
			},
			{
			  title: "Composting at Home",
			  tasks: [
				{
				  title: "1. Composting Basics for Beginners",
				  videoLink: "https://www.youtube.com/watch?v=lBfb8MeXRuA",
				  description: "Learn the basics of starting a compost pile, from setting up a bin to balancing materials."
				},
				{
				  title: "2. Troubleshooting Compost Issues",
				  videoLink: "https://www.youtube.com/watch?v=JRUxw9AY4xg",
				  description: "Explore solutions for common composting problems like odors and pests."
				},
				{
				  title: "3. Indoor Composting Techniques",
				  videoLink: "https://www.youtube.com/watch?v=ZK8JmYgLvbM",
				  description: "Discover methods for composting indoors if you lack outdoor space."
				},
				{
				  title: "4. Benefits of Composting for Your Garden",
				  videoLink: "https://www.youtube.com/watch?v=F8GbtxjBZ60",
				  description: "Learn how compost can enrich your soil and boost garden health."
				}
			  ],
			  certificate: ""
			},
			{
			  title: "Creating a Zero-Waste Household",
			  tasks: [
				{
				  title: "1. Swapping for Reusable Alternatives",
				  videoLink: "https://www.youtube.com/watch?v=wlwHEBu1XBM",
				  description: "Reduce waste by switching from single-use items to reusable ones."
				},
				{
				  title: "2. DIY Zero-Waste Projects",
				  videoLink: "https://www.youtube.com/watch?v=8G3n7mPDdUg",
				  description: "Learn easy DIY projects to reduce waste at home, from cloth bags to beeswax wraps."
				},
				{
				  title: "3. Reducing Food Waste",
				  videoLink: "https://www.youtube.com/watch?v=YXskH9Z06cc",
				  description: "Cut down on food waste by learning meal planning, storage tips, and composting leftovers."
				},
				{
				  title: "4. Zero-Waste Shopping Tips",
				  videoLink: "https://www.youtube.com/watch?v=4YMY6y5knN8",
				  description: "Tips for reducing waste while shopping, including buying in bulk and avoiding packaging."
				}
			  ],
			  certificate: ""
			}
		  ]);
		return await tutorial;
	}
}
