import { useEffect, useState } from 'react';
import PageTitle from '@/components/admin-components/PageTitle/PageTitle';
import PostersList from '@/components/admin-components/Posters/postersList/PostersList';
import usePostersStore from '@/store/posterStore';
import Spinner from '@/components/ui/Spinner/Spinner';
import BreadCrumbs from '@/components/admin-components/BreadCrumbs/BreadCrumbs';

const breadcrumbs = ['Афіші'];

const PostersPageAdmin = () => {
  const { getPosters } = usePostersStore();
  const [posters, setPosters] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const result = await getPosters();
        setPosters(result.items);
        setIsLoading(false);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, [getPosters]);

  return (
    <div>
      <BreadCrumbs breadcrumbs={breadcrumbs} />
      <PageTitle
        title="Афіші"
        showBackButton={false}
        showActionButton={true}
        actionButtonLink="/admin/posters/add"
        isActionButtonDisabled={false}
        actionButtonLabel="Додати афішу"
      />
      {!isLoading ? <PostersList data={posters} /> : <Spinner />}
    </div>
  );
};

export default PostersPageAdmin;
