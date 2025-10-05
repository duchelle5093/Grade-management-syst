export interface ExportGradesReqDto {
    level?: string;
    subjectId?: number;
    documentType: string;
    periodLabel?: string;
    semesterId?: number;
    studentIds?: number[];
}

export interface ExportResultResDto {
    message: string;
    status: string;
    data: any;
    downloadUrl?: string;
}