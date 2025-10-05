import { useAppSelector } from '../store';
import { useMemo } from 'react';

export const useRecentActivity = () => {
    const { teacherGrades } = useAppSelector(state => state.grades);
    
    return useMemo(() => {

        const recentActivities = teacherGrades
            .slice(-4)
            .map((grade, index) => ({
                type: 'grade',
                name: `Note ${grade.type}`,
                action: `Note saisie (${grade.value}/20)`,
                time: `${(index + 1) * 15} min`,
                avatar: grade.type.charAt(0)
            }));
        

        while (recentActivities.length < 4) {
            recentActivities.push({
                type: 'system',
                name: 'Système',
                action: 'Aucune activité récente',
                time: '1h',
                avatar: 'S'
            });
        }
        
        return recentActivities;
    }, [teacherGrades]);
};