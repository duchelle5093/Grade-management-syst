import { AssessmentType, RequestStatus } from '../enums';

export interface TeacherGradeResDto {
    gradeId: number;
    ccScore: number | null;
    snScore: number | null;
    totalScore: number | null;
    maxValue: number;
    comments: string;
    student: {
        id: number;
        username: string;
        firstName: string;
        lastName: string;
        email: string;
        matricule: string;
    };
    subject: {
        id: number;
        subjectName: string;
        subjectCode: string;
        credits: number;
    };
    examiner: {
        id: number;
        username: string;
        firstName: string;
        lastName: string;
        email: string;
    };
    semester: {
        id: number;
        name: string;
        active: boolean;
    };
    exam: "CC_1" | "CC_2" | "SN_1" | "SN_2";
    revendication: any[];
    hasPassed: boolean;
    gpa: number;
    createdDate: string;
    lastModifiedDate: string;
    // Propriétés dérivées pour compatibilité
    studentId: number;
    subjectId: number;
    value: number;
    type: AssessmentType;
}

export interface TeacherRevendicationResDto {
    revendicationId: number;
    student: any; // StudentResponse object
    grade: any; // GradeResponse object
    semester: any; // SemesterResponse object
    requestedScore: number;
    description: string;
    teacherComment?: string;
    status: RequestStatus;
    createdDate: string; // Instant
    lastModifiedDate: string; // Instant
    // Pagination fields
    content?: any[];
    pageNumber?: number;
    pageSize?: number;
    totalElements?: number;
    totalPages?: number;
    lastPage?: boolean;
}