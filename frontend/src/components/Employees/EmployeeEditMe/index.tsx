import * as yup from "yup";
import { useUpdateMeMutation } from "../../../api/usersApi";
import { useForm } from "../../../common/hooks/useForm";
import { useSnackbar } from "../../../common/hooks/useSnackbar";
import { type User } from "../../../common/types/authTypes";
import Button from "../../ui/Button";
import Input from "../../ui/Input";
import styles from "./EmployeeEditMe.module.css";

interface EmployeeEditMeProps {
  user: User;
  onSuccess: () => void;
}

export const EmployeeEditMe = ({ user, onSuccess }: EmployeeEditMeProps) => {
  const { showSnackbar } = useSnackbar();

  const [updateUser, { isLoading }] = useUpdateMeMutation();

  const schema = yup.object({
    firstName: yup.string().required("Имя обязательно"),
    lastName: yup.string().required("Фамилия обязательна"),
    login: yup.string().required("Логин обязателен"),
  });

  const form = useForm(
    {
      firstName: user.name,
      lastName: user.lastName,
      login: user.login,
    },
    schema
  );

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      await updateUser({
        name: form.values.firstName,
        lastName: form.values.lastName,
        login: form.values.login,
      }).unwrap();

      form.resetForm();
      showSnackbar({
        title: "Сообщение",
        message: `Личная информация успешно изменена`,
        mode: "success",
      });
      onSuccess();
    } catch (err) {
      console.log("Error", err);
      showSnackbar({
        title: "Ошибка",
        message: `Возникла ошибка при редактировании личной информации`,
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
