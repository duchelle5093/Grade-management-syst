import { AssessmentType } from '../enums';



export interface AdminRevendicationPeriodResDto {
    revendicationPeriodId: number;
    exam: {
        examPeriodId: number;
        assessmentType: AssessmentType;
    };
    semester: any;
    startDate: string;
    endDate: string;
    color?: string;
    isActive: boolean;
    createdDate: string;
    lastModifiedDate: string;
}