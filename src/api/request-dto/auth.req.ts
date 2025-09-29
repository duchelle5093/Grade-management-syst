import { Role, AcademicLevel, StudyCycle } from "../enums";

export interface LoginreqDto {
    username: string; // 3-50 chars, required
    password: string; // 5-100 chars, required
}

export interface RegisterReqDto {
    username: string; // 3-50 chars, required
    email: string; // valid email, max 100 chars, required
    password: string; // 6-100 chars, required
    firstName: string; // 2-50 chars, required
    lastName: string; // 2-50 chars, required
    role: Role;
    
    // Student fields (when role = STUDENT)
    levelId?: number;
    matricule?: string;
    speciality?: string;
    cycle?: StudyCycle;
    dateOfBirth?: string; // LocalDate
    placeOfBirth?: string;
    
    // Teacher fields (when role = TEACHER)
    levelIds?: number[];
    departmentId?: number;
    phone?: string;
    subjectIds?: number[];
}

