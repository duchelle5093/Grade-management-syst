import { useMemo } from 'react';
import { useAppSelector } from '../store';

export const useRecentGrades = () => {
    const { teacherGrades } = useAppSelector(state => state.grades);
    
    return useMemo(() => {
        if (!teacherGrades?.length) {
            return { count: 0, grades: [] };
        }
        
        const gradesWithValues = teacherGrades.filter(grade => {
            const ccScore = typeof grade.ccScore === 'object' ? grade.ccScore?.parsedValue : grade.ccScore;
            const snScore = typeof grade.snScore === 'object' ? grade.snScore?.parsedValue : grade.snScore;
            return ccScore > 0 || snScore > 0 || grade.totalScore > 0;
        });
        
        return {
            count: gradesWithValues.length,
            grades: gradesWithValues.slice(0, 5)
        };
    }, [teacherGrades]);
};

export const useStudentsByLevel = () => {
    const students = useAppSelector(state => state.user?.students || []);
    
    return useMemo(() => {
        if (!Array.isArray(students) || students.length === 0) {
            return { levels: [], total: 0 };
        }
        
        const levelGroups = students.reduce((acc, student) => {
            const level = student.level || student.studentLevel || 'LEVEL2';
            if (!acc[level]) acc[level] = [];
            acc[level].push(student);
            return acc;
        }, {} as Record<string, any[]>);
        
        const totalStudents = students.length;
        
        const levels = Object.entries(levelGroups).map(([level, levelStudents]) => {
            const count = levelStudents.length;
            const percentage = totalStudents > 0 ? Math.round((count / totalStudents) * 100) : 0;
            
            const displayLevel = level === 'LEVEL2' ? 'Licence 2' : 
                               level === 'LEVEL3' ? 'Licence 3' : 
                               level === 'LEVEL4' ? 'Master 1' : 
                               level === 'LEVEL5' ? 'Master 2' : 
                               'Licence 2';
            
            return {
                level: displayLevel,
                count,
                percentage
            };
        });
        
        return {
            levels,
            total: totalStudents
        };
    }, [students]);
};

export const useGradeProgression = () => {
    const { teacherGrades } = useAppSelector(state => state.grades);
    
    return useMemo(() => {
        if (!teacherGrades?.length) {
            return {
                progressRate: 0,
                improvements: 0,
                declines: 0,
                stable: 0
            };
        }
        
        const gradesWithScores = teacherGrades.filter(grade => {
            const totalScore = grade.totalScore || 0;
            const ccScore = typeof grade.ccScore === 'object' ? grade.ccScore?.parsedValue : grade.ccScore;
            const snScore = typeof grade.snScore === 'object' ? grade.snScore?.parsedValue : grade.snScore;
            return totalScore > 0 || ccScore > 0 || snScore > 0;
        });
        
        if (gradesWithScores.length === 0) {
            return {
                progressRate: 0,
                improvements: 0,
                declines: 0,
                stable: 0
            };
        }
        
        const passedGrades = gradesWithScores.filter(grade => {
            const totalScore = grade.totalScore || 0;
            const ccScore = typeof grade.ccScore === 'object' ? grade.ccScore?.parsedValue : grade.ccScore;
            const snScore = typeof grade.snScore === 'object' ? grade.snScore?.parsedValue : grade.snScore;
            const finalScore = totalScore || Math.max(ccScore || 0, snScore || 0);
            return finalScore >= 10;
        }).length;
        
        const progressRate = Math.round((passedGrades / gradesWithScores.length) * 100);
        
        return {
            progressRate,
            improvements: passedGrades,
            declines: gradesWithScores.length - passedGrades,
            stable: 0
        };
    }, [teacherGrades]);
};

export const useRecentActivity = () => {
    const { teacherGrades } = useAppSelector(state => state.grades);
    
    return useMemo(() => {
        if (!teacherGrades?.length) {
            return [];
        }
        
        const gradesByStudent = teacherGrades
            .filter(grade => grade.student && (grade.ccScore || grade.snScore || grade.totalScore))
            .reduce((acc, grade) => {
                const studentId = grade.student?.id || grade.studentId;
                if (!acc[studentId] || new Date(grade.lastModifiedDate || grade.createdDate || 0) > new Date(acc[studentId].lastModifiedDate || acc[studentId].createdDate || 0)) {
                    acc[studentId] = grade;
                }
                return acc;
            }, {} as Record<string, any>);
        
        const uniqueGrades = Object.values(gradesByStudent)
            .sort((a, b) => {
                const dateA = new Date(a.lastModifiedDate || a.createdDate || 0).getTime();
                const dateB = new Date(b.lastModifiedDate || b.createdDate || 0).getTime();
                return dateB - dateA;
            })
            .slice(0, 5);
        
        return uniqueGrades.map((grade) => {
            const student = grade.student || {};
            const firstName = student.firstName || student.name?.split(' ')[0] || '';
            const lastName = student.lastName || student.name?.split(' ')[1] || '';
            const studentName = `${firstName} ${lastName}`.trim() || 
                              student.name || 
                              `Etudiant ${student.studentNumber || ''}`.trim() || 
                              'Etudiant';
            
            const timeAgo = Math.floor((Date.now() - new Date(grade.lastModifiedDate || grade.createdDate || Date.now()).getTime()) / (1000 * 60 * 60 * 24));
            
            return {
                type: 'grade',
                name: studentName,
                action: 'Note modifiée',
                time: timeAgo === 0 ? "Aujourd'hui" : timeAgo === 1 ? "Hier" : `${timeAgo}j`,
                avatar: firstName.charAt(0) || lastName.charAt(0) || 'E'
            };
        });
    }, [teacherGrades]);
};