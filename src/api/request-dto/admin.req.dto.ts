// DTOs pour les requêtes d'administration selon la nouvelle API

import { Role, AcademicLevel, StudyCycle } from '../enums';

// DTO pour l'inscription utilisateur (admin) - Aligné avec la documentation API
export interface SignupReqDto {
    username: string; // 3-50 chars, required
    email: string; // valid email, max 100 chars, required
    password: string; // 6-100 chars, required
    firstName: string; // 2-50 chars, required
    lastName: string; // 2-50 chars, required
    role: Role;
    
    // Student fields (when role = STUDENT)
    levelId?: number; // Long
    matricule?: string;
    speciality?: string;
    cycle?: StudyCycle;
    dateOfBirth?: string; // LocalDate
    placeOfBirth?: string;
    
    // Teacher fields (when role = TEACHER)
    levelIds?: number[]; // List<Long>
    departmentId?: number; // Long
    phone?: string;
    subjectIds?: number[]; // List<Long>
}

export interface CreateTeacherReqDto {
    firstName: string;
    lastName: string;
    password: string;
    department: string;
    subjectIds: number[];
    email: string;
}

// DTO pour mise à jour enseignant - Aligné avec la documentation API
export interface UpdateTeacherReqDto {
    username?: string;
    password?: string;
    firstName: string;
    lastName: string;
    phoneNumber: string;
    email: string;
    subjects?: any[]; // List<Subject>
    department: any; // Department object
    teachingLevel: AcademicLevel[]; // List<TeachingLevel>
    appRole?: Role;
    isActive?: boolean;
}

// DTO pour mise à jour étudiant - Aligné avec la documentation API
export interface UpdateStudentReqDto {
    username?: string; // 3-50 chars
    password?: string; // 6-100 chars
    appRole?: Role;
    firstName: string; // 2-50 chars, required
    lastName: string; // 2-50 chars, required
    email?: string; // valid email, max 100 chars
    studentLevel: AcademicLevel; // required
    cycle: StudyCycle; // required
    matricule: string; // pattern: 2 digits + 1 uppercase letter + 4 digits, required
    speciality: string; // 3-100 chars, required
    dateOfBirth: string; // LocalDate, required
    placeOfBirth: string; // 2-100 chars, required
}

// DTO pour matière - Aligné avec la documentation API
export interface SubjectReqDto {
    subjectCode: string;
    credits: number; // BigDecimal
    description?: string;
    teacherId?: number;
    subjectsLevel: AcademicLevel[]; // List<TeachingLevel>
    Studentcycle: StudyCycle;
    semesterId: number;
    departmentId: number;
}

export interface CreateDepartmentReqDto {
    departmentName: string;
    subjectIds?: number[];
}

export interface UpdateDepartmentReqDto {
    departmentName: string;
    subjectIds?: number[];
}

export interface BulkSemesterUpdateReqDto {
    id: number;
    name: string;
    startDate: string;
    endDate: string;
    active: boolean;
    orderIndex: number;
}

export interface CreateSemesterReqDto {
    name: string; // 5+ chars required
    startDate: string; // LocalDate required
    endDate: string; // LocalDate required
    active?: boolean; // default: true
}

export interface ImportStudentsReqDto {
    file: File;
}

export interface GenerateReportReqDto {
    studentIds?: number[];
    level?: string;
    semester?: string;
    format: 'pdf' | 'excel';
    type: 'individual' | 'bulk';
}

export interface ExportGradesReqDto {
    level?: string;
    semester?: string;
    subjectId?: number;
    format: 'excel' | 'csv';
}