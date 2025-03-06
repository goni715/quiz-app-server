

export interface IUser {
    fullName: string;
    email: string;
    country: string;
    university: string;
    profession: string;
    password: string;
    role: 'user' | 'admin';
}

