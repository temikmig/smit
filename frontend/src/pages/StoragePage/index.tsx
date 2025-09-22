import { useCallback, useState } from "react";
import { useParams } from "react-router-dom";
import styles from "./StoragePage.module.css";
import {
  useGetStorageByIdQuery,
  useGetStorageProductsQuery,
} from "../../api/storagesApi";
import LoaderPage from "../../components/ui/LoaderPage";
import { useDynamicHeaderTitle } from "../../common/hooks/useDynamicHeaderTitle";
import { Table, type Column } from "../../components/ui/Table";
import Button from "../../components/ui/Button";

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

export const StoragePage = () => {
  const { id } = useParams();

  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [search, setSearch] = useState("");
  const [sortColumn, setSortColumn] = useState<keyof ProductType | null>(null);
  const [sortOrder, setSortOrder] = useState<"asc" | "desc" | null>(null);

  const { data: storageData, isLoading: isLoadingStorage } =
    useGetStorageByIdQuery(id!, { skip: !id });

  const { data: productsData, isLoading: isLoadingProducts } =
    useGetStorageProductsQuery(
      {
        storageId: id!,
        page,
        limit,
        search,
      },
      { skip: !id }
    );

  useDynamicHeaderTitle(storageData?.title);

  const columns: Column<ProductType>[] = [
    { key: "id", title: "ID" },
    { key: "name", title: "Название" },
    { key: "sku", title: "Артикул" },
    { key: "category", title: "Категория" },
    { key: "quantity_product", title: "Товара" },
    { key: "quantity_material", title: "Материала" },
    {
      key: "price_writeoff",
      title: "Цена списания",
      render: (v) => `${v} ₽`,
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
    (col: keyof ProductType, order: "asc" | "desc") => {
      setSortColumn(col);
      setSortOrder(order);
      setPage(1);
    },
    []
  );

  if (isLoadingStorage || isLoadingProducts) return <LoaderPage />;

  if (!storageData) {
    return <div className={styles.storagePageCont}>Склад не найден</div>;
  }

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
      rightContainer={<Button>Добавить в склад</Button>}
    />
  );
};
