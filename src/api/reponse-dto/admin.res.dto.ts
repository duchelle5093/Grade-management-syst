import { AcademicLevel, Role } from '../enums';

export interface TeacherResDto {
    teacherId: number;
    username: string;
    firstName: string;
    lastName: string;
    phoneNumber: string;
    email: string;
    subjects: any[];
    department: any;
    teachingLevel: AcademicLevel[];
    createdDate: string;
    lastModifiedDate: string;
    role: Role;
    isActive: boolean;

    id: number;
    phone: string;
    createdAt: string;
}

export interface DepartmentResDto {
    departmentId: number;
    departmentName: string;
    departmentSubjects?: any[];
    createdDate: string;
    lastModifiedDate: string;

    content?: DepartmentResDto[];
    pageNumber?: number;
    pageSize?: number;
    totalElements?: number;
    totalPages?: number;
    lastPage?: boolean;

    id: number;
    name: string;
    subjects: {
        id: number;
        name: string;
        code: string;
        credits: number;
        description: string;
        active: boolean;
        level: string;
        cycle: string;
        semesterId: number;
        semesterName: string;
        departmentId: number;
        departmentName: string;
    }[];
}

import { AcademicLevel, StudyCycle } from '../enums';


export interface StudentResDto {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
    studentLevel: AcademicLevel;
    cycle: StudyCycle;
    matricule: string;
    speciality: string;
    dateOfBirth: string;
    placeOfBirth: string;
    grades: any[];
    createdDate: string;
    lastModifiedDate: string;
    isActive: boolean;
    semesterId?: number;

    content?: StudentResDto[];
    pageNumber?: number;
    pageSize?: number;
    totalElements?: number;
    totalPages?: number;
    lastPage?: boolean;
}


export interface SubjectResDto {
    subjectId: number;
    subjectCode: string;
    credits: number;
    description?: string;
    teacher?: TeacherResDto;
    subjectsLevel: AcademicLevel[];
    Studentcycle: StudyCycle;
    semester?: any;
    department?: DepartmentResDto;
    createdDate: string;
    lastModifiedDate: string;

    content?: SubjectResDto[];
    pageNumber?: number;
    pageSize?: number;
    totalElements?: number;
    totalPages?: number;
    lastPage?: boolean;
}

export interface AdminStatsResDto {
    totalStudents: number;
    totalTeachers: number;
    totalSubjects: number;
    totalDepartments: number;
    activeStudents: number;
    activeTeachers: number;
    studentsPerLevel: {
        level: string;
        count: number;
    }[];
    subjectsPerDepartment: {
        department: string;
        count: number;
    }[];
}

export interface ImportResultResDto {
    success: number;
    errors: string[];
    warnings?: string[];
}

export interface ExportResultResDto {
    downloadUrl: string;
    filename: string;
    size: number;
}

export interface ReportGenerationResDto {
    jobId: string;
    status: 'pending' | 'processing' | 'completed' | 'failed';
    downloadUrl?: string;
    filename?: string;
    progress?: number;
    error?: string;
}