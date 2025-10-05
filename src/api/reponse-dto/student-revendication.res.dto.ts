import { RequestStatus, TranscriptStatus, AcademicLevel, StudyCycle } from '../enums';



export interface StudentRevendicationResDto {
    revendicationId: number;
    student: any;
    grade: any;
    semester: any;
    requestedScore: number;
    description: string;
    teacherComment?: string;
    status: RequestStatus;
    createdDate: string;
    lastModifiedDate: string;
}

export interface RevendicationPeriodResDto {
    revendicationPeriodId: number;
    exam: any;
    semester: any;
    startDate: string;
    endDate: string;
    color?: string;
    isActive: boolean;
    createdDate: string;
    lastModifiedDate: string;
}

export interface TranscriptResDto {
    transcriptId: number;
    studentFirstName: string;
    studentLastName: string;
    studentMatricule: string;
    subjectResults: any[];
    status: TranscriptStatus;
    studentLevel: AcademicLevel;
    studentCycle: StudyCycle;
    semesterName: string;
    studentGrades: any[];
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
    createdDate: string;
    lastModifiedDate: string;
}