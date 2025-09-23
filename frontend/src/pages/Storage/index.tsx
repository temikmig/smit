import { useCallback, useRef, useState } from "react";
import { useGetStorageProductsQuery } from "../../api/storagesApi";
import LoaderPage from "../../components/ui/LoaderPage";
import { Table, type Column } from "../../components/ui/Table";
import Button from "../../components/ui/Button";
import { AppsAddIcon, AppsDeleteIcon } from "../../assets/icons";
import { useModal } from "../../common/hooks/useModal";
import {
  ContextMenu,
  type ContextMenuItem,
} from "../../components/ui/ContextMenu";

// import styles from "./Storage.module.css";

type ProductType = {
  id: string;
  name: string;
  sku: string;
  category: string;
  warehouseId: string;
  price_storage: number;
  unit_sale: string;
  price_writeoff: number;
  unit_writeoff: string;
  conversion_rate: number;
  quantity_product: number;
  quantity_material: number;
};

const RightTableCont = () => {
  const [isActionsOpen, setIsActionsOpen] = useState(false);

  const { openModal } = useModal();

  const items: ContextMenuItem[] = [
    {
      id: "edit",
      icon: <AppsAddIcon />,
      label: "Оформить поступление",
      color: "blue",
      onClick: () => {
        openModal({
          title: "Поступление на склад",
          content: <>Окно с поступлением</>,
        });
      },
    },
    {
      id: "delete",
      icon: <AppsDeleteIcon />,
      label: "Оформить списание",
      color: "red",
      onClick: () => {
        openModal({
          title: "Списание со склада",
          content: <>Окно со списанием</>,
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
        <Button onClick={handleActions}>Действия со складом</Button>
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

export const Storage = () => {
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [search, setSearch] = useState("");
  const [sortColumn, setSortColumn] = useState<keyof ProductType | null>(null);
  const [sortOrder, setSortOrder] = useState<"asc" | "desc" | null>(null);

  const { data: productsData, isLoading: isLoadingProducts } =
    useGetStorageProductsQuery({
      page,
      limit,
      search,
    });

  const columns: Column<ProductType>[] = [
    { key: "sku", title: "Артикул" },
    { key: "name", title: "Название" },
    { key: "category", title: "Категория" },
    { key: "price_storage", title: "Цена хранения/продажи" },

    { key: "unit_sale", title: "Ед.изм. (продажа)" },
    {
      key: "price_writeoff",
      title: "Цена списания",
      render: (v) => `${v} ₽`,
    },
    { key: "unit_writeoff", title: "Ед.изм. (списание)	" },
    { key: "quantity_product", title: "Кол-во товара" },
    { key: "quantity_material", title: "	Кол-во материала" },
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
    (col: keyof ProductType, order: "asc" | "desc") => {
      setSortColumn(col);
      setSortOrder(order);
      setPage(1);
    },
    []
  );

  if (isLoadingProducts) return <LoaderPage />;

  return (
    <Table
      columns={columns}
      data={productsData?.data ?? []}
      rowKey={(r) => r.id}
      total={productsData?.pagination?.total ?? 0}
      page={page}
      pageSize={limit}
      onPageChange={setPage}
      onPageSizeChange={handlePageSizeChange}
      searchValue={search}
      onSearchChange={handleSearchChange}
      sortColumn={sortColumn}
      sortOrder={sortOrder}
      onSortChange={handleSortChange}
      rightContainer={<RightTableCont />}
    />
  );
};
