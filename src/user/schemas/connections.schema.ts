import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import * as mongoose from "mongoose";

@Schema({
    timestamps: true
})
export class Connections {
    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
    userId: string;

    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
    connection_user_id: string;
}

export const ConnectionsSchema = SchemaFactory.createForClass(Connections);