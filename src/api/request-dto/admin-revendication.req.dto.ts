// DTOs pour les requêtes de gestion des périodes de réclamation (Admin)

export interface CreateRevendicationPeriodReqDto {
    examId: number; // required
    startDate: string; // LocalDate, required
    endDate: string; // LocalDate, required
    color?: string;
    isActive?: boolean; // default: false
}

export interface UpdateRevendicationPeriodReqDto {
    examId: number; // required
    startDate: string; // LocalDate, required
    endDate: string; // LocalDate, required
    color?: string;
    isActive?: boolean; // default: false
}