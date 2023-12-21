import { useEffect } from 'react';
import PageTitle from '@/components/admin-components/PageTitle/PageTitle';
import PostersList from '@/components/admin-components/Posters/postersList/PostersList';
import usePostersStore from '@/store/posterStore';
import BreadCrumbs from '@/components/admin-components/BreadCrumbs/BreadCrumbs';

const breadcrumbs = ['Афіші'];

const PostersPageAdmin = () => {
  const { getPosters } = usePostersStore();
  const posters = usePostersStore(state => state.posters);

  useEffect(() => {
    const fetchData = async () => {
      try {
        await getPosters();
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
      <PostersList data={posters} />
    </div>
  );
};

export default PostersPageAdmin;
