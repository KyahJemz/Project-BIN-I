import { Schema } from "mongoose";
import { Coordinates } from "./Coordinates.dto";
import { RouteStatusEnum } from "@/enums/routeStatus.enum";

export interface IRoute {
    schedule_id: Schema.Types.ObjectId;
    routeName: string;
    pickupPoints: Coordinates[];
    description?: string | null;
    status: RouteStatusEnum;
    notes?: string | null;
    deletedAt?: Date | null;
}