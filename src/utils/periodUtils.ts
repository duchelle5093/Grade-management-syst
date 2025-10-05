
export const getEditableColumnsByPeriod = (periodLabel: string): string[] => {
    const normalized = normalizePeriodLabel(periodLabel);
    
    const map: Record<string, string[]> = {
        "CC_1": ["cc1"],
        "SN_1": ["sn1"],
        "CC_2": ["cc2"],
        "SN_2": ["sn2"],
        "ALL": ["cc1", "sn1", "cc2", "sn2"],
    };

    return map[normalized] || ["cc1"];
};


export const normalizePeriodLabel = (periodLabel?: string): string => {
    if (!periodLabel) return "CC_1";
    
    const clean = periodLabel.toUpperCase().replace(/[\s_-]/g, "_");
    

    const variations: Record<string, string> = {
        "CC1": "CC_1",
        "CC_1": "CC_1",
        "SN1": "SN_1", 
        "SN_1": "SN_1",
        "CC2": "CC_2",
        "CC_2": "CC_2",
        "SN2": "SN_2",
        "SN_2": "SN_2"
    };
    
    return variations[clean] || "CC_1";
};


export const periodLabelToColumnKey = (periodLabel?: string): string => {
    const normalized = normalizePeriodLabel(periodLabel);
    
    const mapping: Record<string, string> = {
        "CC_1": "cc1",
        "SN_1": "sn1",
        "CC_2": "cc2",
        "SN_2": "sn2"
    };
    
    return mapping[normalized] || "cc1";
};


export const parsePeriodLabel = (periodLabel?: string): { type: string; semester: number } => {
    const normalized = normalizePeriodLabel(periodLabel);
    
    const mapping: Record<string, { type: string; semester: number }> = {
        "CC_1": { type: "CC", semester: 1 },
        "SN_1": { type: "SN", semester: 1 },
        "CC_2": { type: "CC", semester: 2 },
        "SN_2": { type: "SN", semester: 2 }
    };
    
    return mapping[normalized] || { type: "CC", semester: 1 };
};


export const formatPeriodLabel = (periodLabel?: string): string => {
    const normalized = normalizePeriodLabel(periodLabel);

    const formatMap: Record<string, string> = {
        "CC_1": "Contrôle Continu #1",
        "SN_1": "Session Normale #1",
        "CC_2": "Contrôle Continu #2",
        "SN_2": "Session Normale #2",
    };

    return formatMap[normalized] || "Période non définie";
};


export const isValidGradeValue = (value: any, periodLabel?: string): boolean => {
    if (value === null || value === undefined || value === "") return false;
    const num = Number(value);
    if (Number.isNaN(num) || num < 0) return false;
    

    const { type } = parsePeriodLabel(periodLabel);
    const maxValue = type === "CC" ? 30 : 70;
    
    return num <= maxValue;
};


export const findExistingGrade = (grades: any[], studentId: number, periodLabel: string): any => {
    const normalized = normalizePeriodLabel(periodLabel);
    return grades.find(g => 
        g.studentId === studentId && 
        normalizePeriodLabel(g.periodLabel) === normalized
    );
};


export const getMaxGradeValue = (periodLabel?: string): number => {
    const { type } = parsePeriodLabel(periodLabel);
    return type === "CC" ? 30 : 70;
};

interface AcademicPeriod {
    id: string;
    name: string;
    shortName: string;
    type: 'CC' | 'SN';
    semester: 1 | 2;
    startDate: string;
    endDate: string;
    color: string;
    isActive: boolean;
    order: number;
}


export const getCurrentPeriod = (periods: AcademicPeriod[]): AcademicPeriod | null => {
    return periods.find(p => p.isActive) || null;
};


export const getNextPeriod = (periods: AcademicPeriod[], currentOrder: number): AcademicPeriod | null => {
    return periods.find(p => p.order === currentOrder + 1) || null;
};


export const getPreviousPeriod = (periods: AcademicPeriod[], currentOrder: number): AcademicPeriod | null => {
    return periods.find(p => p.order === currentOrder - 1) || null;
};


export const isPeriodActive = (startDate: string, endDate: string): boolean => {
    const now = new Date();
    const start = new Date(startDate);
    const end = new Date(endDate);

    return now >= start && now <= end;
};


export const getPeriodsBySemester = (periods: AcademicPeriod[], semester: 1 | 2): AcademicPeriod[] => {
    return periods.filter(p => p.semester === semester);
};


export const getPeriodsByType = (periods: AcademicPeriod[], type: 'CC' | 'SN'): AcademicPeriod[] => {
    return periods.filter(p => p.type === type);
};
