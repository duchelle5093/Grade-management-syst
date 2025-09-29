import { AcademicLevel, StudyCycle } from '../enums';

export interface SubjectResDto {
    id: number;
    name: string;
    code: string;
    credits: number;
    description: string;
    active: boolean;
    level: AcademicLevel;
    cycle: StudyCycle;
    semesterId: number;
    semesterName: string;
    departmentId: number;
    departmentName: string;
    teacherId?: number;
    teacherName?: string;
}

export interface AssignedSubjectResDto {
    id: number;
    name: string;
    code: string;
    credits: number;
    description: string;
    active: boolean;
    level: AcademicLevel;
    cycle: StudyCycle;
    semesterId: number;
    semesterName: string;
    departmentId: number;
    departmentName: string;
}

export interface CreateSubjectReqDto {
    name: string;
    code: string;
    description?: string;
    credits: number;
    teacherId?: number;
    departmentId: number;
    level: AcademicLevel;
    cycle: StudyCycle;
    semesterId: number;
    active?: boolean;
}

export interface UpdateSubjectReqDto {
    name: string;
    code: string;
    description: string;
    credits: number;
    teacherId: number;
    level: AcademicLevel;
    cycle: StudyCycle;
    semesterId: number;
    active: boolean;
}
