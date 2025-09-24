import * as yup from "yup";
import { useUpdateUserMutation } from "../../../api/usersApi";
import { useForm } from "../../../common/hooks/useForm";
import { useSnackbar } from "../../../common/hooks/useSnackbar";
import { type User } from "../../../common/types/authTypes";
import Button from "../../ui/Button";
import Input from "../../ui/Input";
import styles from "./EmployeeEdit.module.css";

interface EmployeeEditPasswordProps {
  user: User;
  onSuccess: () => void;
}

export const EmployeeEditPassword = ({
  user,
  onSuccess,
}: EmployeeEditPasswordProps) => {
  const { showSnackbar } = useSnackbar();

  const [updateUser, { isLoading }] = useUpdateUserMutation();

  const schema = yup.object({
    password: yup
      .string()
      .min(6, "Минимум 6 символов")
      .required("Пароль обязателен"),
    confirmPassword: yup
      .string()
      .oneOf([yup.ref("password")], "Пароли не совпадают")
      .required("Повторите пароль"),
  });

  const form = useForm(
    {
      password: "",
      confirmPassword: "",
    },
    schema
  );

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      await updateUser({
        id: user.id,
        data: {
          password: form.values.password,
        },
      }).unwrap();

      form.resetForm();
      showSnackbar({
        title: "Сообщение",
        message: `Пароль сотрудника успешно изменен`,
        mode: "success",
      });
      onSuccess();
    } catch (err) {
      console.log("Error", err);
      showSnackbar({
        title: "Ошибка",
        message: `Возникла ошибка при изменении пароля сотрудника`,
        mode: "error",
      });
    }
  };

  return (
    <div className={styles.employeeAddCont}>
      <form className={styles.formCont} onSubmit={handleSubmit}>
        <Input
          label="Новый пароль"
          name="password"
          type="password"
          value={form.values.password}
          onChange={form.handleChange}
          onBlur={form.handleBlur}
          error={Boolean(form.fieldErrors.password)}
          errorMessage={form.fieldErrors.password}
        />
        <Input
          label="Повторите новый пароль"
          name="confirmPassword"
          type="password"
          value={form.values.confirmPassword}
          onChange={form.handleChange}
          onBlur={form.handleBlur}
          error={Boolean(form.fieldErrors.confirmPassword)}
          errorMessage={form.fieldErrors.confirmPassword}
        />
        <div className={styles.buttonsCont}>
          <Button type="submit" disabled={isLoading || !form.isValid}>
            Изменить пароль
          </Button>
        </div>
      </form>
    </div>
  );
};
