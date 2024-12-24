import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";

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
    isUserActive: boolean;
    
    @Prop({default: Date.now})
    lastSeen: Date;

    @Prop()
    authToken: string;

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