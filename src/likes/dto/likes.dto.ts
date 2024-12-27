import { User } from "src/user/schemas/user.schema";

export class LikesDTO {
    _id: string;
    userId: string;
    likes_sent_to: User[];
}