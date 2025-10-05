import { Role, AcademicLevel } from '../enums';

export interface LoginResDto{
    id: number;
    username: string;
    roles: Role[];
    token: string;
    createdDate: string;
    lastModifiedDate: string;

    refreshToken: null;
    type: string;
    firstName: string;
    lastName: string;
    email: string;
    role: string;
    authorities: [],
    mustChangePassword: boolean;
    levels?: AcademicLevel[];
}

export interface ChangePasswordReqDto{
   newPassword: string ;
   confirmPassword: string;
}