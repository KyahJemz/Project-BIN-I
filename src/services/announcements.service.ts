import { Model } from "mongoose";
import { IAnnouncementDocument } from "@/models/announcements";
import { ICreateAnnouncementRequest, IUpdateAnnouncementRequest } from "@/validation/announcements.validation";

export class AnnouncementService {
    constructor(private readonly announcementModel: Model<IAnnouncementDocument>) {}
    
    async createAnnouncement (request: ICreateAnnouncementRequest) {
        try {
            const announcement = await this.announcementModel.create(request);
            if (!announcement) {
                throw new Error('announcement creation failed');
            }
            return announcement;
        } catch (error) {
            throw error;
        }
    }
    async getAnnouncementById (id: string) {
        try {
            const announcement = await this.announcementModel.findOne({ _id: id, deletedAt: null }).lean();
            if (!announcement) {
                throw new Error('No announcement found');
            }
            return announcement;
        } catch (error) {
            throw error;
        }
    }
    async getAllAnnouncements () {
        try {
            const announcement = await this.announcementModel.find({deletedAt: null}).lean();
            if (!announcement) {
                throw new Error('No announcement found');
            }
            return announcement;
        } catch (error) {
            throw error;
        }
    }
    async updateAnnouncement(id: string, request: IUpdateAnnouncementRequest) {
        try {
            const announcement = await this.announcementModel.findById(id);
            if (!announcement) {
                throw new Error('Announcement not found');
            }
            if (request.title !== undefined) {
                announcement.title = request.title;
            }
            if (request.author !== undefined) {
                announcement.author = request.author;
            }
            if (request.content !== undefined) {
                announcement.content = request.content;
            }
            if (request.image !== undefined) {
                announcement.image = request.image;
            }
            const updatedAnnouncement = await announcement.save();
            return updatedAnnouncement.toObject(); 
        } catch (error) {
            throw error;
        }
    }
    async deleteAnnouncement (id: string) {
        const announcement = await this.announcementModel.findByIdAndUpdate(id, {deletedAt: new Date()}, { new: true }).lean();
        try {
            return announcement;
        } catch (error) {
            throw error;
        }
    }
}