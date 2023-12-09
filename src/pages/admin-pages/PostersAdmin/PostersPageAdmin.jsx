import ButtonSubmit from '@/components/admin-components/Buttons/SubmitButton/ButtonSubmit';
import PageTitle from '@/components/admin-components/PageTitle/PageTitle';
import PostersList from '@/components/admin-components/Posters/postersList/PostersList';
import usePostersStore from '@/store/posterStore';
import { useEffect, useState } from 'react';
const posters = [
  {
    id: '1',
    photo: '/images/posters/poster1.jpg',
    title: 'Оголошено набір у тетральні класи',
  },
  {
    id: '2',
    photo: '/images/posters/poster2.jpg',
    title: 'Оголошено набір у тетральні класи',
  },
  {
    id: '3',
    photo: '/images/posters/poster3.jpg',
    title: 'Оголошено набір у тетральні класи',
  },
];
const PostersPageAdmin = () => {
  // const { getPosters } = usePostersStore();
  // const [posters, setPosters] = useState([]);

  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       const result = await getPosters();
  //       console.log('result: ', result);
  //     // setPosters(result.items);
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   };
  //   fetchData();
  // }, [posters, getPosters]);

  return (
    <div>
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
