import { useForm } from "../../common/hooks/useForm";
import { useLoginMutation } from "../../api/authApi";
import { useDispatch } from "react-redux";
import { setAuth } from "../../store/authSlice";
import { useNavigate } from "react-router-dom";
import { SmitLogo } from "../../assets/logo/SmitLogo";
import Input from "../../components/ui/Input";
import Button from "../../components/ui/Button";
import { useSnackbar } from "../../common/hooks/useSnackbar";

import styles from "./Login.module.css";
import { LoginIcon } from "../../assets/icons";

export const Login = () => {
  const { showSnackbar } = useSnackbar();

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [loginApi, { isLoading }] = useLoginMutation();

  const form = useForm({ login: "", password: "" });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const data = await loginApi(form.values).unwrap();
      dispatch(setAuth({ accessToken: data.accessToken, user: data.user }));
      navigate("/dashboard");
    } catch (err) {
      console.error(err);
      showSnackbar({
        title: "Внимание",
        message: "Логин или пароль введены не верно",
        mode: "error",
      });
    }
  };

  return (
    <div className={styles.loginPage}>
      <div className={styles.loginCont}>
        <div className={styles.logoCont}>
          <SmitLogo color="#041626" />
        </div>
        <form className={styles.formCont} onSubmit={handleSubmit}>
          <Input
            label="Логин"
            name="login"
            value={form.values.login}
            onChange={form.handleChange}
            onBlur={form.handleBlur}
          />
          <Input
            label="Пароль"
            type="password"
            name="password"
            value={form.values.password}
            onChange={form.handleChange}
            onBlur={form.handleBlur}
          />
          <div className={styles.buttonsCont}>
            <Button type="submit" disabled={isLoading} icon={<LoginIcon />}>
              Войти
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};
