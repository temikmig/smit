import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useLogoutMutation } from "../../api/authApi";
import { setAuth } from "../../store/authSlice";
import { Loader } from "../../components/ui/Loader";

export const Logout = () => {
  const [logout] = useLogoutMutation();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const doLogout = async () => {
      try {
        await logout().unwrap();
        dispatch(setAuth({ accessToken: null, user: null }));
      } catch (err) {
        console.error("Logout error", err);
      } finally {
        navigate("/login", { replace: true });
      }
    };

    doLogout();
  }, [logout, dispatch, navigate]);

  return <Loader fullscreen text />;
};
