import { Model } from "mongoose";
import { IContactDetailsDocument } from "@/models/contactDetails";
import { ICreateContactDetailsRequest, IUpdateContactDetailsRequest } from "@/validation/contactDetails.validation";

export class ContactDetailsService {
    constructor(private readonly contactDetailsModel: Model<IContactDetailsDocument>) {}
    
    async createContactDetails (request: ICreateContactDetailsRequest) {
        try {
            const contactDetails = await this.contactDetailsModel.create(request);
            if (!contactDetails) {
                throw new Error('Contact Details creation failed');
            }
            return contactDetails;
        } catch (error) {
            throw error;
        }
    }
    async getContactDetailsById (id: string) {
        try {
            const contactDetails = await this.contactDetailsModel.findOne({ _id: id, deletedAt: null }).lean();
            if (!contactDetails) {
                throw new Error('No Contact Details found');
            }
            return contactDetails;
        } catch (error) {
            throw error;
        }
    }
    async getAllContactDetails () {
        try {
            const contactDetails = await this.contactDetailsModel.find({deletedAt: null}).lean();
            if (!contactDetails) {
                throw new Error('No Contact Details found');
            }
            return contactDetails;
        } catch (error) {
            throw error;
        }
    }
    async updateContactDetails(id: string, request: IUpdateContactDetailsRequest) {
        try {
            const contactDetails = await this.contactDetailsModel.findById(id);
            if (!contactDetails) {
                throw new Error('ContactDetails not found');
            }
            if (request.name !== undefined) {
                contactDetails.name = request.name;
            }
            if (request.contactDetails !== undefined) {
                contactDetails.contactDetails = request.contactDetails;
            }
            if (request.type !== undefined) {
                contactDetails.type = request.type;
            }
            if (request.description !== undefined) {
                contactDetails.description = request.description;
            }
            if (request.priorityIndex !== undefined) {
                contactDetails.priorityIndex = +request.priorityIndex;
            }
            const updatedContactDetails = await contactDetails.save();
            return updatedContactDetails.toObject(); 
        } catch (error) {
            throw error;
        }
    }
    async deleteContactDetails (id: string) {
        const contactDetails = await this.contactDetailsModel.findByIdAndUpdate(id, {deletedAt: new Date()}, { new: true }).lean();
        try {
            return contactDetails;
        } catch (error) {
            throw error;
        }
    }
}