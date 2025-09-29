export interface SemesterResDto {
    id: number;
    createdDate: string;
    lastModifiedDate: string;
    name: string;
    startDate: string;
    endDate: string;
    active: boolean;
    orderIndex: number;
}

import { PeriodLabel } from '../enums';

export interface CreateGradeByCodeReqDto {
    studentMatricule: string;
    subjectCode: string;
    semesterId: string;
    value: number;
    type: PeriodLabel;
    comments: string;
    periodLabel: PeriodLabel;
}
