

export interface StudentRevendicationReqDto {
    period: any;
    student: any;
    grade: any;
    semester: any;
    requestedScore: number;
    description: string;
}

export interface RevendicationPeriodReqDto {
    examId: number;
    startDate: string;
    endDate: string;
    color?: string;
    isActive?: boolean;
}

export interface TranscriptReqDto {
    student: any;
    semester: any;
    format?: string;
    includeComments?: boolean;
    facultyName?: string;
    academicYear?: string;
}