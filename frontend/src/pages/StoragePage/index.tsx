import { useParams } from "react-router-dom";
import styles from "./StoragePage.module.css";
import {
  useGetStorageByIdQuery,
  useGetStorageProductsQuery,
} from "../../api/storagesApi";
import LoaderPage from "../../components/ui/LoaderPage";
import { useDynamicHeaderTitle } from "../../common/hooks/useDynamicHeaderTitle";
import { Table, type Column } from "../../components/ui/Table";
import { useState } from "react";
import { Search } from "../../components/ui/Search";
import Button from "../../components/ui/Button";
import { FilterIcon, SortIcon } from "../../assets/icons";

export const StoragePage = () => {
  const { id } = useParams();

  const { data: storageData, isLoading } = useGetStorageByIdQuery(id!, {
    skip: !id,
  });

  const { data: storageProductsData } = useGetStorageProductsQuery({
    storageId: id,
    page: 1,
    limit: 10,
  });

  useDynamicHeaderTitle(storageData?.title);

  const columns: Column<
    NonNullable<typeof storageProductsData>["data"][number]
  >[] = [
    { key: "id", title: "ID" },
    { key: "name", title: "Название" },
    { key: "sku", title: "Артикул" },
    { key: "category", title: "Категория" },
    { key: "quantity_product", title: "Товара" },
    { key: "quantity_material", title: "Материала" },
    {
      key: "price_writeoff",
      title: "Цена списания",
      render: (value) => `${value} ₽`,
    },
  ];

  const [query, setQuery] = useState("");

  const filtered =
    storageProductsData?.data.filter((p) =>
      p.name.toLowerCase().includes(query.toLowerCase())
    ) ?? [];

  const controls = (
    <>
      <Search />
      <Button icon={<FilterIcon />}>Фильтр</Button>
      <Button icon={<SortIcon />}>Сортировка</Button>
    </>
  );

  if (isLoading) return <LoaderPage />;

  if (!storageData) {
    return <div className={styles.storagePageCont}>Склад не найден</div>;
  }

  return (
    <Table
      columns={columns}
      data={filtered}
      controls={controls}
      rowKey={(r) => r.id}
    />
  );
};
