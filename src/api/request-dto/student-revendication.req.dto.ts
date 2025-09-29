// DTOs pour les requêtes de réclamations étudiant selon la nouvelle API

export interface StudentRevendicationReqDto {
    period: any; // Exam object
    student: any; // Student object
    grade: any; // Grades object
    semester: any; // Semester object
    requestedScore: number;
    description: string;
}

export interface RevendicationPeriodReqDto {
    examId: number;
    startDate: string; // LocalDate format
    endDate: string; // LocalDate format
    color?: string;
    isActive?: boolean; // default: false
}

export interface TranscriptReqDto {
    student: any; // Student object
    semester: any; // Semester object
    format?: string; // default: "PDF"
    includeComments?: boolean; // default: true
    facultyName?: string;
    academicYear?: string;
}