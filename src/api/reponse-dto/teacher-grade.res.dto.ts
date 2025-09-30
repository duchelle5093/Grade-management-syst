import { AssessmentType, RequestStatus } from '../enums';

// DTOs pour les réponses de notes enseignant selon la nouvelle API

export interface TeacherGradeResDto {
    id: number;
    gradeId: number;
    score: number;
    value: number; // Alias pour score
    maxValue: number;
    comments?: string;
    student: any; // StudentRequest object
    studentId: number;
    studentName: string;
    subject: any; // SubjectRequest object
    subjectId: number;
    subjectName: string;
    subjectCode: string;
    examiner: any; // Teacher object
    semester: any; // SemesterRequest object
    semesterId: number;
    exam: AssessmentType;
    assessmentType: AssessmentType;
    periodLabel: string; // Pour compatibilité
    revendication?: any[]; // List<RevendicationRequest>
    hasPassed: boolean;
    gpa: number;
    content: any; // GradeRequest object
    createdDate: string; // Instant
    lastModifiedDate?: string; // Instant
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