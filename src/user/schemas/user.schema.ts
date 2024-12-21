import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";

@Schema({
    timestamps: true
})
export class User {
    @Prop()
    email: string;
}

export const UserSchema = SchemaFactory.createForClass(User);