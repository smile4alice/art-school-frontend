import TextArea from '@/components/admin-components/formElement/TextArea/TextArea';
import FileInput from '@/components/admin-components/formElement/FileInput/FileInput';
import styles from './PosterInput.module.scss';
import { useParams } from 'react-router';
import usePostersStore from '@/store/posterStore';
import { useEffect, useState } from 'react';

const PostersInput = ({ label }) => {
  const { id } = useParams();
  const { getPostersById } = usePostersStore();
  const [poster, setPoster] = useState();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await getPostersById(id);

        setPoster(result);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, [getPostersById, id]);

  return (
    <div className={styles.layout}>
      <TextArea
        label="Заголовок"
        maxLength={120}
        errorMessage="Текст перевищує 2000 символів"
        prevtext={poster?.title || ''}
      />

      <FileInput label={label} prevImage={poster?.photo} />
    </div>
  );
};
export default PostersInput;
