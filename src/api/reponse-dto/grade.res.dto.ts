import { PeriodLabel } from "../enums";

export interface GradeResDto {
    id: number;
    studentId: number;
    subjectId: number;
    semesterId: number;
    value: number;
    type: PeriodLabel;
    enteredByTeacherId: number;
    periodLabel: PeriodLabel;
    comments?: string;
    createdAt?: string;
    updatedAt?: string;
}

export interface CreateGradeReqDto {
    studentId: number;
    subjectId: number;
    semesterId: number;
    value: number;
    maxValue?: number;
    type: PeriodLabel;
    enteredBy: number;
    periodType: PeriodLabel;
    comments?: string;
}

export interface CreateGradeByCodeReqDto {
    studentMatricule: string;
    subjectCode: string;
    semesterId: number;
    value: number;
    maxValue?: number;
    type: PeriodLabel;
    comments?: string;
    periodType: PeriodLabel;
}

export interface UpdateGradeReqDto {
    value: number;
    maxValue?: number;
    type: PeriodLabel;
    comments?: string;
}

export interface TeacherGradeResDto {
    id: number;
    createdDate: string;
    lastModifiedDate: string;
    studentId: number;
    studentName: string;
    subjectId: number;
    subjectName: string;
    subjectCode: string;
    semesterId: number;
    semesterName: string;
    value: number;
    type: PeriodLabel;
    periodLabel: PeriodLabel;
    comments: string;
    enteredBy: number;
    enteredByName: string;
    passed: boolean;
    creditsEarned: number;
}
