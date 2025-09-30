// Ce fichier est obsolète - utiliser les DTOs officiels à la place :
// - GradeClaimResDto pour les réclamations
// - TeacherGradeResDto pour les notes enseignant
// - StudentGradeResDto pour les notes étudiant

// Les réclamations sont gérées via les actions Redux :
// - submitGradeClaim
// - processGradeClaim  
// - listGradeClaims

// Interface legacy - utiliser GradeClaimResDto à la place
export interface ClaimData {
    id: string;
    period: 'CC_1' | 'CC_2' | 'SN_1' | 'SN_2';
    status: "PENDING" | "APPROVED" | "REJECTED";
    requestedScore: number;
    cause: string;
    description: string;
    createdAt: string;
}

// Interfaces legacy - utiliser les DTOs officiels à la place
export interface GradeWithClaims {
    subjectCode: string;
    subjectName: string;
    cc1: number | null;
    cc2: number | null;
    sn1: number | null;
    sn2: number | null;
    claims?: ClaimData[];
}

export interface StudentWithClaims {
    id: number;
    firstName: string;
    lastName: string;
    studentId: string;
    grades: GradeWithClaims[];
}