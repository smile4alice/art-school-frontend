import { useParams } from 'react-router-dom';

import Container from '@/components/Container/Container';
import NavLinkButton from '@/components/ui/Buttons/NavLinkButton';

import data from '@/data/news.json';

import styles from './NewsPost.module.scss';

const NewsPost = () => {
  const { id } = useParams();
  const postData = data.find(item => item.id == id);

  return (
    <Container>
      <section className={styles.wrapper}>
        <div className={styles.buttonContainer}>
          <NavLinkButton link={'/news'} text={'переглянути всі новини'} />
        </div>
        <p className={`${styles.title} sectionTitle`}>{postData.title}</p>
        <p className={styles.date}>{postData.date}</p>
        <div className={styles.img}>
          <img src={postData.image[0]} alt="slide" />
        </div>
        <p className={styles.text}>{postData.text}</p>
      </section>
    </Container>
  );
};

export default NewsPost;
