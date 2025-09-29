import { PeriodLabel, RequestStatus } from '../enums';

export interface GradeClaimResDto {
    id: number;
    gradeId: number;
    studentId: number;
    subjectCode: string;
    period: PeriodLabel;
    currentScore: number;
    requestedScore: number;
    cause: string;
    description: string;
    status: RequestStatus;
    teacherComment?: string;
    resolvedAt?: string;
}