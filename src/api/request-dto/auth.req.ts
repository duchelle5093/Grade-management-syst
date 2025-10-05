import { Role, AcademicLevel, StudyCycle } from "../enums";

export interface LoginreqDto {
    username: string;
    password: string;
}

export interface RegisterReqDto {
    username: string;
    email: string;
    password: string;
    firstName: string;
    lastName: string;
    role: Role;
    

    levelId?: number;
    matricule?: string;
    speciality?: string;
    cycle?: StudyCycle;
    dateOfBirth?: string;
    placeOfBirth?: string;
    

    levelIds?: number[];
    departmentId?: number;
    phone?: string;
    subjectIds?: number[];
}

