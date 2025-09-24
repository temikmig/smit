import { type User } from "../../../common/types/authTypes";
import styles from "./EmployeeActions.module.css";
import { DeleteIcon, EditIcon, KeyIcon } from "../../../assets/icons";
import { useModal } from "../../../common/hooks/useModal";
import { Tooltip } from "../../ui/Tooltip";
import { useAuth } from "../../../common/hooks/useAuth";
import { useDeleteUserMutation } from "../../../api/usersApi";
import { useSnackbar } from "../../../common/hooks/useSnackbar";
import { EmployeeEdit } from "../EmployeeEdit";
import { EmployeeEditPassword } from "../EmployeeEditPassword";

interface EmployeeActionsProps {
  user: User;
  refetch: () => void;
}

export const EmployeeActions = ({ user, refetch }: EmployeeActionsProps) => {
  const { user: userMe } = useAuth();
  const { openModal, closeModal } = useModal();
  const { showSnackbar } = useSnackbar();
  const [deleteUser, { isLoading: isLoadingDeleteUser }] =
    useDeleteUserMutation();

  const handleEdit = () => {
    const modalId = openModal({
      title: `Редактирование сотрудника ${user.name} ${user.lastName}`,
      content: (
        <EmployeeEdit
          user={user}
          onSuccess={() => {
            closeModal(modalId);
            refetch();
          }}
        />
      ),
    });
  };

  const handleEditPassword = () => {
    const modalId = openModal({
      title: `Изменение пароля сотрудника ${user.name} ${user.lastName}`,
      content: (
        <EmployeeEditPassword
          user={user}
          onSuccess={() => {
            closeModal(modalId);
            refetch();
          }}
        />
      ),
    });
  };

  const handleDelete = () => {
    const modalId = openModal({
      title: "Подтвердите удаление",
      description: `Вы действительно хотите удалить работника ${user.name} ${user.lastName}?`,
      primaryButton: {
        text: "Удалить",
        onClick: async () => {
          await deleteUser(user.id)
            .unwrap()
            .then(() => {
              closeModal(modalId);
              refetch();
              showSnackbar({
                title: "Сообщение",
                message: `Сотрудник ${user.name} ${user.lastName} успешно удален`,
                mode: "success",
              });
            })
            .catch(() => {
              showSnackbar({
                title: "Ошибка",
                message: `Сотрудник ${user.name} ${user.lastName} не может быть удален`,
                mode: "error",
              });
            });
        },
        disabled: isLoadingDeleteUser,
      },
      secondaryButton: {
        text: "Отмена",
        onClick: () => closeModal(modalId),
      },
    });
  };

  return (
    <div className={styles.employeeActionsCont}>
      <Tooltip
        text="Редактировать"
        placement="top center"
        offsetY={4}
        withArrow
        show={userMe?.id !== user.id}
      >
        <button onClick={handleEdit} disabled={userMe?.id === user.id}>
          <EditIcon />
        </button>
      </Tooltip>
      <Tooltip
        text="Изменить пароль"
        placement="top center"
        offsetY={4}
        withArrow
      >
        <button onClick={handleEditPassword}>
          <KeyIcon />
        </button>
      </Tooltip>
      <Tooltip
        text="Удалить"
        placement="top center"
        offsetY={4}
        withArrow
        show={userMe?.id !== user.id}
      >
        <button onClick={handleDelete} disabled={userMe?.id === user.id}>
          <DeleteIcon />
        </button>
      </Tooltip>
    </div>
  );
};
