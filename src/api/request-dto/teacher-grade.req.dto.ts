import { PeriodLabel } from '../enums';

// DTOs pour les requêtes de notes enseignant selon la nouvelle API

export interface TeacherGradeReqDto {
    studentId: number; // required
    subjectId: number; // required
    examId: number; // required
    semesterId: number; // required
    ccScore?: number; // 0-30
    snScore?: number; // 0-70
    comments?: string; // 5-255 chars
    assessmentType: PeriodLabel; // AssessmentType, required
}

export interface TeacherRevendicationApprovalReqDto {
    comment?: string;
}

export interface TeacherRevendicationRejectionReqDto {
    reason?: string;
}