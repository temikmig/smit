import { useGetStoragesQuery } from "../../api/storagesApi";
import { CardGrid } from "../../components/ui/CardGrid";
import LoaderPage from "../../components/ui/LoaderPage";
import { StorageCard } from "../../components/ui/StorageCard";

export const Storages = () => {
  const { data: storagesData, isLoading } = useGetStoragesQuery();
  if (isLoading) return <LoaderPage />;

  return (
    <CardGrid>
      {storagesData?.map((storage, index) => (
        <StorageCard
          title={storage.title}
          index={index}
          id={storage.id}
          key={storage.id}
        />
      ))}
    </CardGrid>
  );
};
