import {useEffect, useMemo} from 'react';
import GradesTable from "./views/GradesTable.tsx";
import {useAppDispatch, useAppSelector} from "../../store";
import { StudentDataResDto } from "../../api/reponse-dto/student.res.dto";
import {fetchStudentGrades} from "../grades";
import { mockStudentData } from "./mockData";
import { fetchActiveSemester } from "../semesters/actions";

const countFailedSubjects = (studentData: StudentDataResDto): { failed: number; passed: number } => {
    if (!studentData?.grades?.length) return { failed: 0, passed: 0 };

    const grouped = studentData.grades.reduce((acc, grade) => {
        const key = grade.subject?.subjectCode || grade.subjectCode;
        if (!acc[key]) {
            acc[key] = { passed: false };
        }

        acc[key].passed = grade.hasPassed || grade.passed;
        return acc;
    }, {} as Record<string, { passed: boolean }>);

    let failed = 0;
    let passed = 0;

    Object.values(grouped).forEach(subject => {
        if (subject.passed) passed++;
        else failed++;
    });

    return { failed, passed };
};

export default function StudentPage() {
    const dispatch = useAppDispatch();
    const student = useAppSelector((state) => state.user.profile);
    const studentGrades = useAppSelector((state) => state.grades.studentGrades);
    const activeSemester = useAppSelector((state) => state.semesters.activeSemester);

    const currentStudentData = (studentGrades && studentGrades.grades?.length > 0) 
        ? studentGrades 
        : (student?.grades?.length > 0)
            ? student
            : mockStudentData;

    const { failed, passed } = useMemo(
        () => countFailedSubjects(currentStudentData),
        [currentStudentData]
    );

    useEffect(() => {
        dispatch(fetchStudentGrades(student?.id));
        dispatch(fetchActiveSemester());
    }, [student?.id, dispatch]);

    return (
        <div>
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
                <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center gap-4">
                        <div className="bg-blue-50 text-blue-600 px-4 py-2 rounded-lg font-bold text-2xl">
                            📊
                        </div>
                        <div>
                            <h1 className="text-xl font-semibold text-gray-800">Mes Notes</h1>
                            <p className="text-sm text-gray-500">Niveau: {(() => {
                                const level = currentStudentData?.studentLevel?.studentLevel || currentStudentData?.level;
                                if (level === 'LEVEL1') return 'Licence 1';
                                if (level === 'LEVEL2') return 'Licence 2';
                                if (level === 'LEVEL3') return 'Licence 3';
                                if (level === 'LEVEL4') return 'Master 1';
                                if (level === 'LEVEL5') return 'Master 2';
                                return level || 'Non défini';
                            })()}</p>
                        </div>
                    </div>
                    <div className="text-right">
                        <div className="text-sm text-gray-500">Semestre actuel</div>
                        <div className="text-lg font-medium text-blue-600">
                            {activeSemester?.name || 'Non défini'}
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                    <div className="bg-green-50 rounded-lg p-4 text-center">
                        <div className="text-2xl font-bold text-green-600">{passed}</div>
                        <div className="text-sm text-gray-500">Matières réussies</div>
                    </div>
                    
                    <div className="bg-red-50 rounded-lg p-4 text-center">
                        <div className="text-2xl font-bold text-red-600">{failed}</div>
                        <div className="text-sm text-gray-500">Matières échouées</div>
                    </div>
                </div>
            </div>

            <GradesTable student={currentStudentData} />
        </div>
    );
}
