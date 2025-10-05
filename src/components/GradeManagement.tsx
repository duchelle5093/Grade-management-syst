import { useEffect, useMemo, useState } from "react";
import { useAppDispatch, useAppSelector } from "../store";
import { GradesHeader } from "./LicenceHeader";
import { TeacherGradesTable } from "./TeacherGradesTable";

import { usePageTitle } from "../hooks/usePageTitle";
import { useFilteredStudents, useActivePeriodPolling, useClaims } from "../hooks";
import { 
    formatPeriodLabel, 
    periodLabelToColumnKey, 
    parsePeriodLabel, 
    isValidGradeValue,
    getMaxGradeValue 
} from "../utils";
import { translatePeriodName } from "../utils/periodTranslation";
import { calculateSuccessRate, calculateDaysRemaining } from "../utils/statsUtils";
import { fetchTeacherStudents } from "../features/user/actions";
import { fetchTeacherGrades, createGrade, updateGrade } from "../features/grades";
import { fetchAssignedSubjects } from "../features/subjects";

import { AcademicLevel } from "../api/enums";
import { CreateGradeReqDto, UpdateGradeReqDto } from "../api/reponse-dto/grade.res.dto";
import { useNotification } from "../contexts";

interface StudentGradeRow {
    studentId: number;
    studentName: string;
    matricule: string;
    cc1: number | null;
    sn1: number | null;
    cc2: number | null;
    sn2: number | null;
}

interface GradeManagementProps {
    level: AcademicLevel;
    levelName: string;
    levelCode: string;
}

export const GradeManagement = ({ level, levelName, levelCode }: GradeManagementProps) => {
    const dispatch = useAppDispatch();
    const { notify } = useNotification();

    const { teacherGrades } = useAppSelector((s) => s.grades);
    const { activeSemester } = useAppSelector((s) => s.semesters);
    const user = useAppSelector((s) => s.user.profile);

    const { activePeriod, editableColumns } = useActivePeriodPolling({ enabled: true, interval: 60000 });
    const currentPeriodLabel = activePeriod?.shortName || "CC_1";
    const formattedPeriod = translatePeriodName(activePeriod?.name) || formatPeriodLabel(currentPeriodLabel);
    const { filteredStudents, teacherSubjectsForLevel } = useFilteredStudents({
        currentLevel: level,
    });

    const [isTableEditable, setIsTableEditable] = useState(false);
    const [searchValue, setSearchValue] = useState("");
    const [editedData, setEditedData] = useState<StudentGradeRow[]>([]);
    const [selectedSubject, setSelectedSubject] = useState<{ id: number; name: string; code: string } | null>(null);
    
    const { getPendingClaimsCount, getAllPendingClaimsCount } = useClaims(selectedSubject?.id);

    usePageTitle(isTableEditable ? `Edition des notes de ${levelName}` : `Notes ${levelName}`);

    useEffect(() => {
        if (!selectedSubject && teacherSubjectsForLevel.length > 0) {
            setSelectedSubject(teacherSubjectsForLevel[0]);
        }
    }, [teacherSubjectsForLevel, selectedSubject]);

    const mergedRows = useMemo((): StudentGradeRow[] => {
        if (!filteredStudents?.length) return [];
        

        
        return filteredStudents.map((student) => {
            const studentId = student.id;
            const studentName = [student.firstName, student.lastName].filter(Boolean).join(" ") ||
                student.username ||
                `Étudiant ${studentId}`;

            const allStudentGrades = (teacherGrades || []).filter((grade) => 
                (grade.studentId || grade.student?.id) === studentId && 
                (grade.subjectId || grade.subject?.id) === selectedSubject?.id
            );
            
            const studentGrades = allStudentGrades.filter((grade) => 
                (grade.semester?.active === true)
            );
            


            const gradeMap: Record<string, number | null> = {
                cc1: null, sn1: null, cc2: null, sn2: null,
            };
            
            studentGrades.forEach((grade) => {
                const examType = grade.exam || grade.type;

                const ccScore = typeof grade.ccScore === 'object' ? grade.ccScore?.parsedValue : grade.ccScore;
                const snScore = typeof grade.snScore === 'object' ? grade.snScore?.parsedValue : grade.snScore;
                
                switch (examType) {
                    case 'CC_1':
                        gradeMap.cc1 = ccScore ? Math.round(ccScore) : (grade.value ? Math.round(grade.value) : null);
                        break;
                    case 'CC_2':
                        gradeMap.cc2 = ccScore ? Math.round(ccScore) : (grade.value ? Math.round(grade.value) : null);
                        break;
                    case 'SN_1':
                        gradeMap.sn1 = snScore ? Math.round(snScore) : (grade.value ? Math.round(grade.value) : null);
                        break;
                    case 'SN_2':
                        gradeMap.sn2 = snScore ? Math.round(snScore) : (grade.value ? Math.round(grade.value) : null);
                        break;
                }
            });

            return {
                studentId,
                studentName,
                matricule: student.matricule || `${studentId}`,
                cc1: gradeMap.cc1,
                sn1: gradeMap.sn1,
                cc2: gradeMap.cc2,
                sn2: gradeMap.sn2,
            };
        });
    }, [filteredStudents, teacherGrades, selectedSubject?.id]);

    const displayRows = useMemo(() => {
        if (!searchValue?.trim()) return mergedRows || [];
        return (mergedRows || []).filter((r) =>
            r.studentName?.toLowerCase().includes(searchValue.toLowerCase())
        );
    }, [mergedRows, searchValue]);


    const successRate = useMemo(() => {
        if (!mergedRows?.length) return 0;
        
        const studentsWithValidGrades = mergedRows.filter(student => {
            const grades = [student.cc1, student.sn1, student.cc2, student.sn2].filter(g => g !== null && g !== undefined);
            if (grades.length === 0) return false;
            
            const total = grades.reduce((sum, grade) => sum + grade, 0);
            return total >= 60;
        });
        
        return Math.round((studentsWithValidGrades.length / mergedRows.length) * 100);
    }, [mergedRows]);


    const daysRemaining = useMemo(() => {
        if (!activePeriod?.endDate) return 0;
        
        const today = new Date();
        const endDate = new Date(activePeriod.endDate);
        const diffTime = endDate.getTime() - today.getTime();
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        
        return Math.max(0, diffDays);
    }, [activePeriod?.endDate]);

    const handleEdit = () => {
        setEditedData(displayRows || []);
        setIsTableEditable(true);
    };

    const handleConfirm = async () => {
        try {
            if (!selectedSubject?.id) {
                notify({ type: "error", message: "Erreur", description: "Aucune matière disponible" });
                return;
            }

            const { type: periodType, semester } = parsePeriodLabel(currentPeriodLabel);
            const columnKey = periodLabelToColumnKey(currentPeriodLabel);
            
            if (!editableColumns.includes(columnKey)) {
                notify({ 
                    type: "error", 
                    message: "Période non éditable", 
                    description: `La période ${currentPeriodLabel} n'est pas actuellement éditable` 
                });
                return;
            }
            
            const payloads: Array<CreateGradeReqDto | { gradeId: number; gradeData: UpdateGradeReqDto }> = [];

            for (const row of (editedData || [])) {
                const gradeValue = row[columnKey as keyof StudentGradeRow];
                
                if (!isValidGradeValue(gradeValue, currentPeriodLabel)) continue;
                
                const value = Number(gradeValue);
                const existing = (teacherGrades || []).find(grade => 
                    (grade.studentId || grade.student?.id) === row.studentId && 
                    (grade.subjectId || grade.subject?.id) === selectedSubject.id &&
                    (grade.exam || grade.type) === currentPeriodLabel
                );


                const originalRow = mergedRows.find(r => r.studentId === row.studentId);
                const originalValue = originalRow?.[columnKey as keyof StudentGradeRow];
                if (existing && originalValue === value) continue;

                if (existing) {
                    payloads.push({
                        gradeId: existing.gradeId || existing.id,
                        gradeData: {
                            studentId: row.studentId,
                            subjectId: selectedSubject.id,
                            examId: 1,
                            semesterId: activeSemester?.id || 1,
                            ccScore: currentPeriodLabel.includes('CC') ? value : undefined,
                            snScore: currentPeriodLabel.includes('SN') ? value : undefined,
                            comments: `Note ${periodType} S${semester} mise à jour`,
                            assessmentType: currentPeriodLabel,
                        }
                    });
                } else {
                    payloads.push({
                        studentId: row.studentId,
                        subjectId: selectedSubject.id,
                        examId: 1,
                        semesterId: activeSemester?.id || 1,
                        ccScore: currentPeriodLabel.includes('CC') ? value : undefined,
                        snScore: currentPeriodLabel.includes('SN') ? value : undefined,
                        comments: `Note ${periodType} S${semester} ajoutée`,
                        assessmentType: currentPeriodLabel,
                    });
                }
            }

            if (payloads.length === 0) {
                notify({ type: "warning", message: "Attention", description: "Aucune note valide à enregistrer" });
                setIsTableEditable(false);
                return;
            }

            const results = await Promise.allSettled(
                payloads.map(payload =>
                    "gradeId" in payload
                        ? dispatch(updateGrade(payload)).unwrap()
                        : dispatch(createGrade(payload)).unwrap()
                )
            );

            const successful = results.filter(r => r.status === 'fulfilled').length;
            const failed = results.filter(r => r.status === 'rejected').length;

            await dispatch(fetchTeacherGrades());
            setIsTableEditable(false);

            if (successful > 0 && failed === 0) {
                notify({
                    type: "success",
                    message: "Succès",
                    description: "Note(s) enregistrée(s) avec succès"
                });
            }
        } catch (error) {
            console.error(error);
            notify({
                type: "error",
                message: "Erreur",
                description: "Impossible d'enregistrer les notes",
            });
        }
    };

    useEffect(() => {
        dispatch(fetchAssignedSubjects());
        dispatch(fetchTeacherGrades());
        dispatch(fetchTeacherStudents());
    }, [dispatch]);

    if (teacherSubjectsForLevel.length === 0) {
        return (
            <div className="text-center py-8">
                <h2 className="text-xl font-semibold text-gray-600 mb-4">
                    Aucune matière assignée pour le niveau {levelName}
                </h2>
                <p className="text-gray-500">
                    Vous n'avez pas de matières assignées pour ce niveau.
                    Contactez l'administration pour vérifier vos assignations.
                </p>
            </div>
        );
    }

    if (!filteredStudents || filteredStudents.length === 0) {
        return (
            <div className="text-center py-8">
                <h2 className="text-xl font-semibold text-gray-600 mb-4">
                    Aucun étudiant trouvé en {levelName}
                </h2>
                <p className="text-gray-500">
                    Il n'y a aucun étudiant inscrit dans cette classe pour la matière sélectionnée.
                </p>
            </div>
        );
    }

    return (
        <div>
            <GradesHeader
                title={levelCode}
                period={formattedPeriod}
                topic={selectedSubject?.name || "Matière"}
                code={selectedSubject?.code || "CODE"}
                level={levelName}
                successRate={successRate}
                daysRemaining={daysRemaining}
                studentCount={filteredStudents.length}
                claimsCount={getPendingClaimsCount()}
            />

            <div className="mt-8">
                <TeacherGradesTable
                    data={displayRows || []}
                    studentsWithClaims={[]}
                    isEditable={isTableEditable}
                    onGradesChange={setEditedData}
                    onEdit={handleEdit}
                    onConfirm={handleConfirm}
                    isDataEditable={isTableEditable}
                    setIsDataEditable={setIsTableEditable}
                    onSearch={setSearchValue}
                    currentSubjectId={selectedSubject?.id}
                />
            </div>
        </div>
    );
};