import { Role } from "../api/enums";
import { store } from "../store";

export const hasPermission = (allowedUserRoles: Role[]): boolean => {
    const profileRole = store?.getState()?.user.profile.role;
    const userRole = (typeof profileRole === 'object' ? profileRole?.appRole : profileRole) as Role;
    return !!userRole && allowedUserRoles.includes(userRole);
};