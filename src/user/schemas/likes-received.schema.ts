import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import * as mongoose from "mongoose";

@Schema({
    timestamps: true
})
export class LikesReceived {
    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
    userId: string;

    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
    like_received_from: string;
}

export const LikesReceivedSchema = SchemaFactory.createForClass(LikesReceived);