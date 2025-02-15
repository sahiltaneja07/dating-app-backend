export class UserDTO {
    _id?: string;
    email: string;
    isNewUser: boolean;
    lastSeen: Date;
    refreshToken: string;
    firstName: string;
    lastName: string;
    dob: Date;
    gender: string;
    hometown: string;
    isPremiumUser: boolean;
}