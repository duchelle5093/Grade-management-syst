// DTOs pour les réponses de notes enseignant selon la nouvelle API

export interface TeacherGradeResDto {
    gradeId: number;
    score: number;
    maxValue: number;
    comments?: string;
    student: any; // StudentRequest object
    subject: any; // SubjectRequest object
    examiner: any; // Teacher object
    semester: any; // SemesterRequest object
    exam: string; // AssessmentType
    revendication?: any[]; // List<RevendicationRequest>
    hasPassed: boolean;
    gpa: number;
    content: any; // GradeRequest object
    createdDate: string; // Instant
    lastModifiedDate: string; // Instant
}

export interface TeacherRevendicationResDto {
    revendicationId: number;
    student: any; // StudentResponse object
    grade: any; // GradeResponse object
    semester: any; // SemesterResponse object
    requestedScore: number;
    description: string;
    teacherComment?: string;
    status: 'PENDING' | 'APPROVED' | 'REJECTED'; // RequestStatus
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