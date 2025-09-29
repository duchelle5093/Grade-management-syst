// DTOs pour les requêtes de notes enseignant selon la nouvelle API

export interface TeacherGradeReqDto {
    studentId: number;
    subjectId: number;
    examId: number;
    semesterId: number;
    ccScore?: number; // 0-30
    snScore?: number; // 0-70
    comments?: string; // 5-255 chars
    assessmentType: 'CC' | 'SN';
}

export interface TeacherRevendicationApprovalReqDto {
    comment?: string;
}

export interface TeacherRevendicationRejectionReqDto {
    reason?: string;
}