import clsx from "clsx";
import { ROLE_LABELS, type UserRole } from "../../../common/types/authTypes";
import styles from "./EmployeeRole.module.css";

interface EmployeeRoleProps {
  role: UserRole;
}

export const EmployeeRole = ({ role }: EmployeeRoleProps) => {
  return (
    <div className={clsx(styles.employeeRoleCont, "text_medium", styles[role])}>
      {ROLE_LABELS[role]}
    </div>
  );
};
