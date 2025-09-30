import { AcademicLevel, Role } from '../enums';

export interface TeacherResDto {
    teacherId: number;
    username: string;
    firstName: string;
    lastName: string;
    phoneNumber: string;
    email: string;
    subjects: any[]; // List<SubjectResponse>
    department: any; // Department object
    teachingLevel: AcademicLevel[]; // Set<TeachingLevel>
    createdDate: string; // Instant
    lastModifiedDate: string; // Instant
    role: Role;
    isActive: boolean;
    // Legacy compatibility
    id: number;
    phone: string;
    createdAt: string;
}

export interface DepartmentResDto {
    departmentId: number;
    departmentName: string;
    departmentSubjects?: any[]; // Set<SubjectResponse>
    createdDate: string; // Instant
    lastModifiedDate: string; // Instant
    // Pagination fields
    content?: DepartmentResDto[];
    pageNumber?: number;
    pageSize?: number;
    totalElements?: number;
    totalPages?: number;
    lastPage?: boolean;
    // Legacy compatibility
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

// DTO pour les réponses d'étudiant avec pagination - Aligné avec la documentation API
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
    // Pagination fields
    content?: StudentResDto[];
    pageNumber?: number;
    pageSize?: number;
    totalElements?: number;
    totalPages?: number;
    lastPage?: boolean;
}

// DTO pour les réponses de matière avec pagination
export interface SubjectResDto {
    subjectId: number;
    subjectCode: string;
    credits: number; // BigDecimal
    description?: string;
    teacher?: TeacherResDto;
    subjectsLevel: AcademicLevel[]; // List<TeachingLevel>
    Studentcycle: StudyCycle;
    semester?: any; // SemesterResponse
    department?: DepartmentResDto;
    createdDate: string; // Instant
    lastModifiedDate: string; // Instant
    // Pagination fields
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