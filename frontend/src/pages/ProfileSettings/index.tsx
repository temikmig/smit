import clsx from "clsx";
import { useGetMeQuery } from "../../api/usersApi";
import { EditIcon, UploadIcon } from "../../assets/icons";
import { EmployeeRole } from "../../components/Employees/EmployeeRole";
import Button from "../../components/ui/Button";
import LoaderPage from "../../components/ui/LoaderPage";
import { UserAvatar } from "../../components/ui/UserAvatar";
import styles from "./ProfileSettings.module.css";
import { useModal } from "../../common/hooks/useModal";
import { EmployeeEditMe } from "../../components/Employees/EmployeeEditMe";

export const ProfileSettings = () => {
  const { data: user, isLoading, refetch } = useGetMeQuery();

  const { openModal, closeModal } = useModal();

  const handleEdit = () => {
    const modalId = openModal({
      title: `Редактирование личной информации`,
      content: user && (
        <EmployeeEditMe
          user={user}
          onSuccess={async () => {
            closeModal(modalId);
            refetch();
          }}
        />
      ),
    });
  };

  if (isLoading) return <LoaderPage />;
  if (!user) return null;

  const infoItems = [
    { label: "Имя", value: <span className="text_medium">{user.name}</span> },
    {
      label: "Фамилия",
      value: <span className="text_medium">{user.lastName}</span>,
    },
    { label: "Роль", value: <EmployeeRole role={user.role} /> },
    {
      label: "Логин",
      value: <span className="text_medium">{user.login}</span>,
    },
  ];

  return (
    <div className={styles.profileSettingsCont}>
      <div className={styles.profileAvatarCont}>
        <UserAvatar user={user} size={128} />
        <div className={styles.profileAvatarSettings}>
          <div>
            <Button icon={<UploadIcon />}>Загрузить новую фотографию</Button>
          </div>
          <p className={clsx("text_medium", styles.profileAvatarSettingsWrap)}>
            Фотография должна быть формата JPG или PNG, желательно квадратной
            ориентации
          </p>
        </div>
      </div>

      <div className={clsx("shadow-container", styles.profileInfoCont)}>
        <div className={styles.profileInfoHeader}>
          <h4>Информация о вас</h4>
          <Button variant="outline" icon={<EditIcon />} onClick={handleEdit}>
            Изменить
          </Button>
        </div>

        <div className={styles.profileInfoContent}>
          {infoItems.map(({ label, value }) => (
            <div key={label} className={styles.profileInfoContentItem}>
              <p
                className={clsx(
                  "text_small",
                  styles.profileInfoContentItemHead
                )}
              >
                {label}
              </p>
              {value}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
