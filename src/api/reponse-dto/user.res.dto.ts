import { Role, AcademicLevel, StudyCycle } from '../enums';

interface Subject {
    id?: number;
    subjectId?: number;
    name?: string;
    subjectName?: string;
    code?: string;
    subjectCode?: string;
    credits?: number | { source: string; parsedValue: number };
    description?: string;
    active?: boolean;
    level?: AcademicLevel;
    cycle?: StudyCycle;
    semesterId?: number;
    semesterName?: string;
    departmentId?: number;
    departmentName?: string;
    teacherId?: number;
    teacherName?: string;
    teacher?: any;
    subjectsLevel?: Array<{
        teachingLevelId: number;
        studentLevel: string;
    }>;
    studentCycle?: string;
    createdDate?: string | null;
    lastModifiedDate?: string | null;
}

export interface userProfileResDto {
    id: number;
    teacherId?: number;
    username: string;
    firstName: string;
    lastName: string;
    email: string;
    phoneNumber?: string;
    role: Role;
    subjects?: Subject[];
    teachingLevel?: Array<{
        teachingLevelId: number;
        studentLevel: string;
    }>;
    department?: {
        departmentId: number;
        departmentName: string;
        createdDate: string;
        lastModifiedDate: string;
    };
    isActive?: boolean;
    createdDate?: string;
    lastModifiedDate?: string;
    grades?: any[];
    studentLevel?: {
        teachingLevelId: number;
        studentLevel: string;
    };
    cycle?: string;
    matricule?: string;
    speciality?: string;
    dateOfBirth?: string;
    placeOfBirth?: string;
}
//
// interface Topic {
//     code: string,
//     title: string,
//     cc: number,
//     sn: number,
//     semester: string,
//     credits:number
// }

// export interface studentResDto {
//     id: number;
//     firstName: string;
//     lastName: string;
//     email: string;
//     username: string;
//     role: string;
//     level: string;
//     topics: Topic[];
//     [index: string]: any
// }

