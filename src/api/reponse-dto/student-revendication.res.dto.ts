import { RequestStatus, TranscriptStatus, AcademicLevel, StudyCycle } from '../enums';

// DTOs pour les réponses de réclamations étudiant selon la nouvelle API

export interface StudentRevendicationResDto {
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
}

export interface RevendicationPeriodResDto {
    revendicationPeriodId: number;
    exam: any; // ExamResponse object
    semester: any; // SemesterResponse object
    startDate: string; // LocalDate
    endDate: string; // LocalDate
    color?: string;
    isActive: boolean;
    createdDate: string; // Instant
    lastModifiedDate: string; // Instant
}

export interface TranscriptResDto {
    transcriptId: number;
    studentFirstName: string;
    studentLastName: string;
    studentMatricule: string;
    subjectResults: any[]; // List<SubjectResponse>
    status: TranscriptStatus;
    studentLevel: AcademicLevel;
    studentCycle: StudyCycle;
    semesterName: string;
    studentGrades: any[]; // List<GradeResponse>
    annualAverage: number;
    pdfPath?: string;
    creditsEarned: number;
    totalCreditsRequired: number;
    semester1Credits: number;
    semester2Credits: number;
    semester1Average: number;
    semester2Average: number;
    facultyName?: string;
    academicYear?: string;
    createdDate: string; // Instant
    lastModifiedDate: string; // Instant
}