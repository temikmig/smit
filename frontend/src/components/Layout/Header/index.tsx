import { useLocation, useMatches, useNavigate } from "react-router-dom";
import { ArrowLeftIcon } from "../../../assets/icons";
import { ProfileAvatar } from "../../ProfileAvatar";
import styles from "./Header.module.css";
import { Notifications } from "../../Notifications";
import { HeaderSearch } from "../../HeaderSearch";

type RouteHandle = {
  title?: string;
};

export const Header = () => {
  const matches = useMatches();
  const navigate = useNavigate();
  const location = useLocation();

  const { pathname } = location;

  const currentTitle = matches.find((m) => (m.handle as RouteHandle)?.title)
    ?.handle as RouteHandle;

  const handleBack = () => {
    if (pathname === "/dashboard") return;

    const parts = pathname.split("/").filter(Boolean);
    parts.pop();

    if (parts.length === 0) {
      navigate("/dashboard");
    } else {
      navigate("/" + parts.join("/"));
    }
  };

  const showBack = pathname !== "/dashboard";

  return (
    <header className={styles.header}>
      <div className={styles.titleCont}>
        {showBack && (
          <div className={styles.backArrowCont}>
            <ArrowLeftIcon onClick={handleBack} className={styles.backArrow} />
          </div>
        )}
        <h3>{currentTitle?.title ?? "Дашборд"}</h3>
      </div>
      <div className={styles.profileCont}>
        <HeaderSearch />
        <Notifications />
        <ProfileAvatar />
      </div>
    </header>
  );
};
