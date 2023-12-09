import PageTitle from '@/components/admin-components/PageTitle/PageTitle';
import PostersList from '@/components/admin-components/Posters/postersList/PostersList';
import usePostersStore from '@/store/posterStore';
import { useEffect, useState } from 'react';

const PostersPageAdmin = () => {
  const { getPosters } = usePostersStore();
  const [posters, setPosters] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await getPosters();
        setPosters(result.items);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, [getPosters]);

  return (
    <>
      <PageTitle
        title="Афіші"
        showBackButton={false}
        showActionButton={true}
        actionButtonLink="/admin/posters/add"
        isActionButtonDisabled={false}
        actionButtonLabel="Додати афішу"
      />
      <PostersList data={posters} />
    </>
  );
};

export default PostersPageAdmin;
