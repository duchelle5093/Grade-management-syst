import { useMemo } from 'react';
import { useAppSelector } from '../store';


interface UseFilteredStudentsProps {
    currentLevel: string; // level1, level2, level3, level4, level5
}

export const useFilteredStudents = ({ currentLevel }: UseFilteredStudentsProps) => {
    const teacherProfile = useAppSelector(state => state.user.profile);
    const students = useAppSelector(state => state.user.students);

    const filteredStudents = useMemo(() => {
        if (!students || typeof students !== 'object') return [];
        
        // Si students est un objet groupé par niveau
        if (students[currentLevel]) {
            return students[currentLevel];
        }
        
        // Fallback pour l'ancien format (array)
        if (Array.isArray(students)) {
            return students.filter((student: any) => {
                const studentLevel = student.studentLevel?.studentLevel || student.level;
                return studentLevel === currentLevel;
            });
        }
        
        return [];
    }, [students, currentLevel]);

    const teacherSubjectsForLevel = useMemo(() => {
        if (!teacherProfile?.subjects?.length) {
            return [];
        }
        
        // Filtrer selon la structure API réelle
        const filtered = teacherProfile.subjects.filter(subject => {
            // Vérifier dans subjectsLevel si la matière est pour ce niveau
            return subject.subjectsLevel?.some((levelObj: any) => 
                levelObj.studentLevel === currentLevel
            );
        });
        
        // Transformer pour compatibilité
        return filtered.map(subject => ({
            id: subject.subjectId || subject.id,
            name: subject.subjectName || subject.name,
            code: subject.subjectCode || subject.code,
            level: currentLevel,
            credits: subject.credits?.parsedValue || subject.credits
        }));
    }, [teacherProfile?.subjects, currentLevel]);

    return {
        filteredStudents,
        teacherSubjectsForLevel,
        hasStudents: filteredStudents.length > 0,
        studentCount: filteredStudents.length
    };
};
