import Container from '@/components/Container/Container'
import styles from './PostersPage.module.scss';

const PostersPage = () => {
  return (
    <Container>
      <ul className= {styles.postersList}>
      <li> Poster</li>
      <li> Poster</li>
      <li> Poster</li>
      <li> Poster</li>
      </ul>
    </Container>
  )
}

export default PostersPage
