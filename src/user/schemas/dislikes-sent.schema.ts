import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import * as mongoose from "mongoose";

@Schema({
    timestamps: true
})
export class DislikesSent {
    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
    userId: string;

    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
    disliked_user_id: string;
}

export const DislikesSentSchema = SchemaFactory.createForClass(DislikesSent);