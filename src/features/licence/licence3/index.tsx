import { GradeManagement } from "../../../components";
import { AcademicLevel } from "../../../api/enums";

export const Licence3 = () => {
    return (
        <GradeManagement 
            level={AcademicLevel.LEVEL3}
            levelName="Licence 3"
            levelCode="L3"
        />
    );
};