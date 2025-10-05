

import { Role, AcademicLevel, StudyCycle } from '../enums';


export interface SignupReqDto {
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

export interface CreateTeacherReqDto {
    firstName: string;
    lastName: string;
    password: string;
    department: string;
    subjectIds: number[];
    email: string;
}


export interface UpdateTeacherReqDto {
    username?: string;
    password?: string;
    firstName: string;
    lastName: string;
    phoneNumber: string;
    email: string;
    subjects?: any[];
    department: any;
    teachingLevel: AcademicLevel[];
    appRole?: Role;
    isActive?: boolean;
}


export interface UpdateStudentReqDto {
    username?: string;
    password?: string;
    appRole?: Role;
    firstName: string;
    lastName: string;
    email?: string;
    studentLevel: AcademicLevel;
    cycle: StudyCycle;
    matricule: string;
    speciality: string;
    dateOfBirth: string;
    placeOfBirth: string;
}


export interface SubjectReqDto {
    subjectCode: string;
    credits: number;
    description?: string;
    teacherId?: number;
    subjectsLevel: AcademicLevel[];
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
    name: string;
    startDate: string;
    endDate: string;
    active?: boolean;
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