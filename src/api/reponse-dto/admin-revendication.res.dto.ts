import { AssessmentType } from '../enums';

// DTOs pour les réponses de gestion des périodes de réclamation (Admin)

export interface AdminRevendicationPeriodResDto {
    revendicationPeriodId: number;
    exam: {
        examPeriodId: number;
        assessmentType: AssessmentType;
    };
    semester: any; // SemesterResponse object
    startDate: string; // LocalDate
    endDate: string; // LocalDate
    color?: string;
    isActive: boolean;
    createdDate: string; // Instant
    lastModifiedDate: string; // Instant
}