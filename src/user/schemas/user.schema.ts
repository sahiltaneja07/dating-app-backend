import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";

export type UserDocument = HydratedDocument<User>;

@Schema({
    timestamps: true
})
export class User {    
    @Prop({
        unique: true,
        required: [true, 'Email is mandatory field'],
        trim: true
    })
    email: string;

    @Prop({default: true})
    isNewUser: boolean;
    
    @Prop({default: Date.now})
    lastSeen: Date;

    @Prop({
        select: false
    })
    refreshToken: string;

    @Prop({trim: true})
    firstName: string
    
    @Prop({trim: true})
    lastName:  string;

    @Prop()
    dob: Date;

    @Prop()
    gender: string;

    @Prop()
    hometown: string;

    @Prop({default: false})
    isPremiumUser: boolean;
}

export const UserSchema = SchemaFactory.createForClass(User);