import { useEffect, useState } from 'react';
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
  const [formattedText, setFormattedText] = useState(null);

  const metaTitle = post?.title
    ? truncateString(60, post.title)
    : `КДШМ №2 ім. М.І.Вериківського подія `;

  const metaDescription = post?.text
    ? truncateString(150, post.text)
    : `КДШМ №2 ім. М.І.Вериківського опис події ${post.title}`;

  const formatText = text => {
    if (text) {
      const urlRegex = /(https?:\/\/[^\s]+)/g;
      const formatted = text.replace(urlRegex, url => {
        return `<a href="${url}" target="_blank" rel="noopener noreferrer">${url}</a>`;
      });

      setFormattedText(formatted);
    }
  };
  useEffect(() => {
    formatText(post?.text);
    //eslint-disable-next-line
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

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
              <img
                src={post.photo}
                alt={
                  post?.title
                    ? post?.title
                    : 'КДШМ №2 ім. М.І.Вериківського захід '
                }
              />
            </div>
            {/* Виведення форматованого тексту */}
            {formattedText && (
              <p
                className={styles.text}
                dangerouslySetInnerHTML={{ __html: formattedText }}
              ></p>
            )}
          </div>

          <div className={styles.buttonContainer}>
            <NavLinkButton href={'/events'} text={'переглянути всі заходи'} />
          </div>
        </section>
      </Container>
    </>
  );
};

export default NewsPost;

/*import { useEffect } from 'react';
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

  const metaTitle = post?.title
    ? truncateString(60, post.title)
    : `КДШМ №2 ім. М.І.Вериківського подія `;

  const metaDescription = post?.text
    ? truncateString(150, post.text)
    : `КДШМ №2 ім. М.І.Вериківського опис події ${post.title}`;

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
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
              <img src={post.photo} alt={post?.title ? post?.title : 'КДШМ №2 ім. М.І.Вериківського захід '} />
            </div>
            {post?.text && <p className={styles.text}>{post.text}</p>}
          </div>

          <div className={styles.buttonContainer}>
            <NavLinkButton href={'/events'} text={'переглянути всі заходи'} />
          </div>
        </section>
      </Container>
    </>
  );
};

export default NewsPost;
*/
