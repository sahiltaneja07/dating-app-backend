import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import * as mongoose from "mongoose";

export type LikesSentDocument = mongoose.HydratedDocument<LikesSent>;

@Schema({
    timestamps: true
})
export class LikesSent {
    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
    userId: string;

    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
    like_sent_to: string;
}

export const LikesSentSchema = SchemaFactory.createForClass(LikesSent);