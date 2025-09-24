import { useCallback, useRef, useState } from "react";
import LoaderPage from "../../components/ui/LoaderPage";
import { Table, type Column } from "../../components/ui/Table";
import Button from "../../components/ui/Button";
import { OptionsDotsHorizontalIcon, UserAddIcon } from "../../assets/icons";
import { useModal } from "../../common/hooks/useModal";
import {
  ContextMenu,
  type ContextMenuItem,
} from "../../components/ui/ContextMenu";
import type { User } from "../../common/types/authTypes";
import { useGetUsersQuery } from "../../api/usersApi";
import { UserAvatar } from "../../components/ui/UserAvatar";
import { EmployeeRole } from "../../components/Employees/EmployeeRole";
import { EmployeeActions } from "../../components/Employees/EmployeeActions";
import { EmployeeAdd } from "../../components/Employees/EmployeeAdd";

// import styles from "./Employees.module.css";

interface RightTableContProps {
  refetch: () => void;
}

const RightTableCont = ({ refetch }: RightTableContProps) => {
  const [isActionsOpen, setIsActionsOpen] = useState(false);

  const { openModal, closeModal } = useModal();

  const items: ContextMenuItem[] = [
    {
      id: "edit",
      icon: <UserAddIcon />,
      label: "Добавить сотрудника",
      color: "blue",
      onClick: () => {
        const modalId = openModal({
          title: "Добавление сотрудника",
          content: (
            <EmployeeAdd
              onSuccess={() => {
                closeModal(modalId);
                refetch();
              }}
            />
          ),
        });
      },
    },
  ];

  const buttonRef = useRef<HTMLDivElement>(null);

  const handleActions = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();

    setIsActionsOpen((prev) => !prev);
  };

  return (
    <>
      <div ref={buttonRef}>
        <Button icon={<OptionsDotsHorizontalIcon />} onClick={handleActions} />
      </div>
      <ContextMenu
        anchorRef={buttonRef}
        items={items}
        open={isActionsOpen}
        placement="bottom end"
        onClose={() => setIsActionsOpen(false)}
      />
    </>
  );
};

export const Employees = () => {
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [search, setSearch] = useState("");
  const [sortColumn, setSortColumn] = useState<keyof User | undefined>(
    undefined
  );
  const [sortOrder, setSortOrder] = useState<"asc" | "desc" | undefined>(
    undefined
  );

  const {
    data: dataUsers,
    isLoading: isLoadingUsers,
    refetch,
  } = useGetUsersQuery({
    page,
    limit,
    search,
    sortColumn,
    sortOrder,
  });

  const columns: Column<User>[] = [
    {
      key: "userAvatar",
      render: (_, user) => <UserAvatar user={user} />,
      width: 64,
      sort: false,
    },
    {
      key: "name",
      title: "Имя",
      render: (_, user) => <p className="text_medium">{user.name}</p>,
      sort: true,
    },
    {
      key: "lastName",
      title: "Фамилия",
      render: (_, user) => <p className="text_medium">{user.lastName}</p>,
      sort: true,
    },
    {
      key: "login",
      title: "Логин",
      render: (_, user) => <p className="text_medium">{user.login}</p>,
      sort: true,
    },
    {
      key: "role",
      title: "Роль",
      render: (_, user) => <EmployeeRole role={user.role} />,
      sort: true,
    },

    {
      key: "actions",
      sort: false,
      render: (_, user) => <EmployeeActions user={user} refetch={refetch} />,
      width: 64,
    },
  ];

  const handleSearchChange = useCallback((val: string) => {
    setSearch(val);
    setPage(1);
  }, []);

  const handlePageSizeChange = useCallback((l: number) => {
    setLimit(l);
    setPage(1);
  }, []);

  const handleSortChange = useCallback(
    (col: keyof User, order: "asc" | "desc") => {
      setSortColumn(col);
      setSortOrder(order);
      setPage(1);
    },
    []
  );

  if (isLoadingUsers) return <LoaderPage />;

  return (
    <Table
      columns={columns}
      data={dataUsers?.users ?? []}
      rowKey={(r) => r.id}
      total={dataUsers?.total ?? 0}
      page={page}
      pageSize={limit}
      onPageChange={setPage}
      onPageSizeChange={handlePageSizeChange}
      searchValue={search}
      onSearchChange={handleSearchChange}
      sortColumn={sortColumn}
      sortOrder={sortOrder}
      onSortChange={handleSortChange}
      rightContainer={<RightTableCont refetch={refetch} />}
    />
  );
};
