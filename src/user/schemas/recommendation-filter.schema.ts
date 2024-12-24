import { Prop, raw, Schema, SchemaFactory } from "@nestjs/mongoose";
import * as mongoose from "mongoose";

@Schema({
    timestamps: true
})
export class RecommendationFilter {
    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
    userId: string;
    
    @Prop()
    distance: string;

    @Prop()
    minAge: string;

    @Prop()
    maxAge: string;

    @Prop()
    datingPreferences: [string];
}

export const RecommendationFilterSchema = SchemaFactory.createForClass(RecommendationFilter);