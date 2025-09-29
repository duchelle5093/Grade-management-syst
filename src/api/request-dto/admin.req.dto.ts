// DTOs pour les requêtes d'administration selon la nouvelle API

// DTO pour l'inscription utilisateur (admin)
export interface SignupReqDto {
    username: string;
    email: string;
    password: string;
    firstName: string;
    lastName: string;
    role: string[]; // Set<Roles>
    // Champs étudiants
    level?: string; // TeachingLevel
    matricule?: string;
    speciality?: string;
    cycle?: string; // StudentCycle
    dateOfBirth?: string; // LocalDate
    placeOfBirth?: string;
    // Champs enseignants
    levels?: string[]; // List<TeachingLevel>
    department?: any; // Department object
    phone?: string;
    subjects?: any[]; // List<Subject>
}

export interface CreateTeacherReqDto {
    firstName: string;
    lastName: string;
    password: string;
    department: string;
    subjectIds: number[];
    email: string;
}

// DTO pour mise à jour enseignant
export interface UpdateTeacherReqDto {
    username?: string;
    password?: string;
    firstName: string;
    lastName: string;
    phoneNumber: string;
    email: string;
    subjects?: any[]; // List<Subject>
    department: any; // Department object
    teachingLevel: string[]; // List<TeachingLevel>
    appRole?: string; // Roles
    isActive?: boolean;
}

// DTO pour mise à jour étudiant
export interface UpdateStudentReqDto {
    username?: string;
    password?: string;
    firstName: string;
    lastName: string;
    email: string;
    studentLevel: string; // TeachingLevel
    cycle: string; // StudentCycle
    matricule: string;
    speciality: string;
    dateOfBirth?: string; // LocalDate
    placeOfBirth?: string;
}

// DTO pour matière
export interface SubjectReqDto {
    subjectCode: string;
    credits: number; // BigDecimal
    description?: string;
    teacherId?: number;
    subjectsLevel: string[]; // List<TeachingLevel>
    Studentcycle: string; // StudentCycle
    semesterId: number;
    departmentId: number;
}

export interface CreateDepartmentReqDto {
    departmentName: string;
    subjectIds?: number[];
}

export interface UpdateDepartmentReqDto {
    departmentName: string;
    subjectIds?: number[];
}

export interface BulkSemesterUpdateReqDto {
    id: number;
    name: string;
    startDate: string;
    endDate: string;
    active: boolean;
    orderIndex: number;
}

export interface CreateSemesterReqDto {
    name: string; // 5+ chars required
    startDate: string; // LocalDate required
    endDate: string; // LocalDate required
    active?: boolean; // default: true
}

export interface ImportStudentsReqDto {
    file: File;
}

export interface GenerateReportReqDto {
    studentIds?: number[];
    level?: string;
    semester?: string;
    format: 'pdf' | 'excel';
    type: 'individual' | 'bulk';
}

export interface ExportGradesReqDto {
    level?: string;
    semester?: string;
    subjectId?: number;
    format: 'excel' | 'csv';
}