import { useLocation } from 'react-router-dom';

import Container from '@/components/Container/Container';

import styles from './NewsPost.module.scss';
import NavLinkButton from '@/components/ui/Buttons/NavLinkButton';
import { formatDate } from '@/utils/formatDate';

const NewsPost = () => {
  const location = useLocation();
  const { post } = location.state;

  return (
    <Container>
      <section className={styles.wrapper}>
        <div className={styles.buttonContainer}>
          <NavLinkButton href={'/news'} text={'переглянути всі новини'} />
        </div>

        <div className={styles.card}>
          <div className={styles.cardHeader}>
            <p className={styles.date}>{formatDate(post.created_at)}</p>
            <h2 className={`${styles.title} sectionTitle`}>{post.title}</h2>
          </div>
          <div className={styles.img}>
            <img src={post.photo} alt={post.title} />
          </div>
          <p className={styles.text}>{post.text}</p>
        </div>
      </section>
    </Container>
  );
};

export default NewsPost;
