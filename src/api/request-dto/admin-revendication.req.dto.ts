

export interface CreateRevendicationPeriodReqDto {
    examId: number;
    startDate: string;
    endDate: string;
    color?: string;
    isActive?: boolean;
}

export interface UpdateRevendicationPeriodReqDto {
    examId: number;
    startDate: string;
    endDate: string;
    color?: string;
    isActive?: boolean;
}