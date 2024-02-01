import { useLocation } from 'react-router-dom';
import Container from '@/components/Container/Container';
import SEO from '@/components/SEO';
import NavLinkButton from '@/components/ui/Buttons/NavLinkButton';
import { truncateString } from '@/hooks/hooks';
import { formatDate } from '@/utils/formatDate';
import styles from './NewsPost.module.scss';

const NewsPost = () => {
  const location = useLocation();
  const { post } = location.state;
  const metaTitle = truncateString(56, post?.title);
  const metaDescription = post.text
    ? truncateString(150, post.text)
    : `КДШМ №2 ім. М.І.Вериківського подія ${truncateString(150, post.text)} `;
  return (
    <>
      <SEO title={metaTitle} description={metaDescription} />
      <Container>
        <section className={styles.wrapper}>
          <div className={styles.card}>
            <div className={styles.cardHeader}>
              <p className={styles.date}>{formatDate(post.created_at)}</p>
              <p className={`${styles.title} sectionTitle`}>{post.title}</p>
            </div>
            <div className={styles.img}>
              <img src={post.photo} alt="slide" />
            </div>
            <p className={styles.text}>{post.text}</p>
          </div>
          <div className={styles.buttonContainer}>
            <NavLinkButton href={'/events'} text={'переглянути всі новини'} />
          </div>
        </section>
      </Container>
    </>
  );
};

export default NewsPost;
