import { RouteStatusEnum } from "@/enums/routeStatus.enum";
import { IRoute } from "@/types/IRoute.dto";
import mongoose, { Schema } from "mongoose";

export interface IRouteDocument extends IRoute, Document {}

const routesSchema: Schema<IRouteDocument> = new Schema(
  {
    schedule_id: { 
      type: Schema.Types.ObjectId, 
      required: true 
    },
    routeName: { 
      type: String, 
      required: true 
    },
    pickupPoints: { 
      type: [{ lat: Number, lng: Number }], 
      required: true 
    },
    description: { 
      type: String, 
      default: null 
    },
    status: { 
      type: String,
      enum: Object.values(RouteStatusEnum),
      required: true 
    },
    notes: { 
      type: String, 
      default: null 
    },
    deletedAt: { 
      type: Date, 
      default: null 
    },
  },
  { 
    timestamps: true,
    versionKey: false
  }
);

const RoutesModel = mongoose.model<IRouteDocument>('Route', routesSchema);

export default RoutesModel;
