import { Prop, raw, Schema, SchemaFactory } from "@nestjs/mongoose";

@Schema()
export class Otp {
    @Prop({required: true})
    email: string;
    
    @Prop({required: true})
    otp: string;

    @Prop({
        default: Date.now,
        index: {
            expires: 60*30
        }
    })
    createdAt: Date;
}

export const OtpSchema = SchemaFactory.createForClass(Otp);