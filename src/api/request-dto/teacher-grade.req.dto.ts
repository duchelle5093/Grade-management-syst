import { AssessmentType } from '../enums';



export interface TeacherGradeReqDto {
    studentId: number;
    subjectId: number;
    examId: number;
    semesterId: number;
    ccScore?: number;
    snScore?: number;
    comments?: string;
    assessmentType: AssessmentType;
}

export interface TeacherRevendicationApprovalReqDto {
    comment?: string;
}

export interface TeacherRevendicationRejectionReqDto {
    reason?: string;
}