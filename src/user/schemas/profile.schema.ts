import { Prop, raw, Schema, SchemaFactory } from "@nestjs/mongoose";
import * as mongoose from "mongoose";

@Schema({
    timestamps: true
})
export class Profile {
    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
    userId: string;

    @Prop()
    aboutMe: string;
    
    @Prop()
    height: string;

    @Prop(raw({
        lat: { type: String },
        long: { type: String }
    }))
    location: Record<string, string>;

    @Prop({trim: true})
    sexuality: string
    
    @Prop()
    datingPreferences: [string];

    @Prop()
    datingIntention: string;

    @Prop()
    phone: string;

    @Prop()
    workProfile: string;

    @Prop()
    foodPreferences: [string];

    @Prop()
    religiousBeliefs: [string];

    @Prop()
    drink: boolean;

    @Prop()
    smoke: boolean;

    @Prop()
    tags: [string];

    @Prop()
    photos: [string];

    @Prop()
    blockedUsers: [string];
}

export const ProfileSchema = SchemaFactory.createForClass(Profile);