import { PeriodLabel, AcademicLevel, StudyCycle, Role } from "../enums";

export interface StudentGradeResDto {
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

export interface StudentTopicResDto {
    code: string;
    title: string;
    cc: number | null;
    sn: number | null;
    semester: 1 | 2;
    credit: number;
}

interface StudentSubject {
    id: number | null;
    name: string;
    code: string;
    credits: number;
    description: string | null;
    active: boolean | null;
    level: AcademicLevel | null;
    cycle: StudyCycle | null;
    semesterId: number;
    semesterName: string;
    departmentId: number | null;
    departmentName: string | null;
    teacherId: number | null;
    teacherName: string | null;
    createdDate: string | null;
    lastModifiedDate: string | null;
}

export interface StudentDataResDto {
    id?: number;
    studentId?: number;
    studentName?: string;
    semesterId: number | null;
    semesterName: string | null;
    grades: StudentGradeResDto[];
    gpa?: number;
    status: string | null;
    firstName: string;
    lastName: string;
    email: string;
    username?: string;
    matricule?: string;
    level?: AcademicLevel;
    studentLevel?: {
        teachingLevelId: number;
        studentLevel: string;
    };
    cycle?: string;
    speciality?: string;
    dateOfBirth?: string;
    placeOfBirth?: string;
    role: Role;
    subjects?: StudentSubject[];
    isActive?: boolean;
    createdDate?: string;
    lastModifiedDate?: string;
}

































































export interface StudentListResDto {
    id: number;
    username: string;
    firstName: string;
    lastName: string;
    email: string;
    role: Role;
    subjects: StudentSubject[];
}


export interface StudentReqDto {
    username: string;
    firstName: string;
    lastName: string;
    email: string;
    level: AcademicLevel;
}


