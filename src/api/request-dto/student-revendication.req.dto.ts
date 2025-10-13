

export interface StudentRevendicationReqDto {
    period: {
        examId: number;
        examType: string;
    };
    student: {
        studentId: number;
    };
    grade: {
        gradeId: number;
    };
    semester: {
        semesterId: number;
    };
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