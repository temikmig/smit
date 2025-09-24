import * as yup from "yup";
import { useUpdateUserMutation } from "../../../api/usersApi";
import { useForm } from "../../../common/hooks/useForm";
import { useSnackbar } from "../../../common/hooks/useSnackbar";
import {
  ROLE_LABELS,
  type User,
  type UserRole,
} from "../../../common/types/authTypes";
import Button from "../../ui/Button";
import Input from "../../ui/Input";
import { Select } from "../../ui/Select";
import styles from "./EmployeeEdit.module.css";

interface EmployeeEditProps {
  user: User;
  onSuccess: () => void;
}

export const EmployeeEdit = ({ user, onSuccess }: EmployeeEditProps) => {
  const { showSnackbar } = useSnackbar();

  const [updateUser, { isLoading }] = useUpdateUserMutation();

  const schema = yup.object({
    firstName: yup.string().required("Имя обязательно"),
    lastName: yup.string().required("Фамилия обязательна"),
    login: yup.string().required("Логин обязателен"),
    role: yup.string().required("Выберите роль"),
  });

  const form = useForm(
    {
      firstName: user.name,
      lastName: user.lastName,
      login: user.login,
      role: user.role,
    },
    schema
  );

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      await updateUser({
        id: user.id,
        data: {
          name: form.values.firstName,
          lastName: form.values.lastName,
          login: form.values.login,
          role: form.values.role as UserRole,
        },
      }).unwrap();

      form.resetForm();
      showSnackbar({
        title: "Сообщение",
        message: `Информация о сотруднике успешно изменена`,
        mode: "success",
      });
      onSuccess();
    } catch (err) {
      console.log("Error", err);
      showSnackbar({
        title: "Ошибка",
        message: `Возникла ошибка при редактировании сотрудника`,
        mode: "error",
      });
    }
  };

  return (
    <div className={styles.employeeAddCont}>
      <form className={styles.formCont} onSubmit={handleSubmit}>
        <Input
          label="Имя"
          name="firstName"
          value={form.values.firstName}
          onChange={form.handleChange}
          onBlur={form.handleBlur}
          error={Boolean(form.fieldErrors.firstName)}
          errorMessage={form.fieldErrors.firstName}
        />
        <Input
          label="Фамилия"
          name="lastName"
          value={form.values.lastName}
          onChange={form.handleChange}
          onBlur={form.handleBlur}
          error={Boolean(form.fieldErrors.lastName)}
          errorMessage={form.fieldErrors.lastName}
        />
        <Select
          label="Роль"
          value={form.values.role}
          options={Object.entries(ROLE_LABELS).map(([key, label]) => ({
            value: key,
            label,
          }))}
          onChange={(val) => form.setFieldValue("role", val as UserRole)}
          error={Boolean(form.fieldErrors.role)}
          errorMessage={form.fieldErrors.role}
        />
        <Input
          label="Логин"
          name="login"
          value={form.values.login}
          onChange={form.handleChange}
          onBlur={form.handleBlur}
          error={Boolean(form.fieldErrors.login)}
          errorMessage={form.fieldErrors.login}
        />
        <div className={styles.buttonsCont}>
          <Button type="submit" disabled={isLoading || !form.isValid}>
            Редактировать сотрудника
          </Button>
        </div>
      </form>
    </div>
  );
};
