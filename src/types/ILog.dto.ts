import { ActionsEnum } from "@/enums/actions.enum";
import { CollectionsEnum } from "@/enums/collections.enum";
import { Schema } from "mongoose";

export interface ILog {
    account_id: Schema.Types.ObjectId; 
    collection: CollectionsEnum;
    action: ActionsEnum;
    action_id: Schema.Types.ObjectId;
}