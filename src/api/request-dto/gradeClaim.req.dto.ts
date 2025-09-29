import { PeriodLabel } from '../enums';

export interface GradeClaimReqDto {
    gradeId: number;
    requestedScore: number;
    cause: string;
    period: PeriodLabel;
    description: string;
}