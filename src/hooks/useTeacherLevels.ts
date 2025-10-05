import { useMemo } from 'react';
import { useAppSelector } from '../store';
import { AcademicLevel, LEVEL_DISPLAY_NAMES, LEVEL_ROUTES, LICENCE_LEVELS, MASTER_LEVELS } from '../api/enums';








export const useTeacherLevels = () => {
    const { profile } = useAppSelector(state => state.user);


    const uniqueLevels = useMemo(() => {

        if (profile?.teachingLevel?.length) {

            const levels = profile.teachingLevel.map(level => 
                typeof level === 'object' ? level.studentLevel : level
            );
            return [...new Set(levels)];
        }
        

        if (profile?.subjects?.length) {
            const levels = profile.subjects
                .flatMap(subject => subject.subjectsLevel)
                .filter(Boolean);
            return [...new Set(levels)];
        }
        
        return [];
    }, [profile?.teachingLevel, profile?.subjects]);


    const licenceLevels = useMemo(() => {
        return uniqueLevels
            .filter(level => LICENCE_LEVELS.includes(level))
            .map(level => ({
                level,
                displayName: LEVEL_DISPLAY_NAMES[level],
                route: LEVEL_ROUTES[level]
            }))
            .sort((a, b) => a.level.localeCompare(b.level));
    }, [uniqueLevels]);


    const masterLevels = useMemo(() => {
        return uniqueLevels
            .filter(level => MASTER_LEVELS.includes(level))
            .map(level => ({
                level,
                displayName: LEVEL_DISPLAY_NAMES[level],
                route: LEVEL_ROUTES[level]
            }))
            .sort((a, b) => a.level.localeCompare(b.level));
    }, [uniqueLevels]);


    const allTeacherLevels = useMemo(() => {
        return [...licenceLevels, ...masterLevels];
    }, [licenceLevels, masterLevels]);

    return {

        uniqueLevels,
        allTeacherLevels,
        licenceLevels,
        masterLevels,


        hasLicenceLevels: licenceLevels.length > 0,
        hasMasterLevels: masterLevels.length > 0,
        hasAnyLevels: allTeacherLevels.length > 0,


        licenceLevelsCount: licenceLevels.length,
        masterLevelsCount: masterLevels.length,
        totalLevelsCount: allTeacherLevels.length,



        isLevelTaught: (level: AcademicLevel) => {
            return uniqueLevels.includes(level);
        },

        getLevelDisplayName: (level: AcademicLevel) => {
            return LEVEL_DISPLAY_NAMES[level];
        },

        getLevelRoute: (level: AcademicLevel) => {
            return LEVEL_ROUTES[level];
        }
    };
};
