import { useLocation } from 'react-router-dom';

import Container from '@/components/Container/Container';
import NavLinkButton from '@/components/ui/Buttons/NavLinkButton';

import styles from './NewsPost.module.scss';

const NewsPost = () => {
  const location = useLocation();
  const { post } = location.state;
  const href = '/news';
  return (
    <Container>
      <section className={styles.wrapper}>
        <div className={styles.buttonContainer}>
          <NavLinkButton href={href} text={'переглянути всі новини'} />
        </div>
        <p className={`${styles.title} sectionTitle`}>{post.title}</p>
        <p className={styles.date}>{post.date}</p>
        <div className={styles.img}>
          <img src={post.photo} alt="slide" />
        </div>
        <p className={styles.text}>{post.text}</p>
      </section>
    </Container>
  );
};

export default NewsPost;
