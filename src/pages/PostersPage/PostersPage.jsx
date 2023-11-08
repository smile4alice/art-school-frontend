import Container from '@/components/Container/Container'

import styles from './PostersPage.module.scss';
import {posters} from '@/constants/posters';
import { useEffect, useRef, useState } from 'react';


const PostersPage = () => {
    const [windowWidth, setWindowWidth] = useState(window.innerWidth);
    const [postersPerPage ,setPostersPerPage] = useState(12);
 
const imgRef= useRef()

const handelImageClick=()=>{
    
    imgRef.current.style.scale=1.75;
    
    
}


const viewMore=()=>setPostersPerPage((prev)=>prev+postersPerPage )

    useEffect(() => {
      function handleResize() {
        setWindowWidth(window.innerWidth);
      }
  
      window.addEventListener('resize', handleResize);
  
      return () => {
        window.removeEventListener('resize', handleResize);
      };
    }, []);

    useEffect(()=>{
   

if (windowWidth <=320){

    setPostersPerPage(4)
}

    },[windowWidth])
  return (
    <Container>
      <section className={styles.contentWrapper }>
        <h1 className={styles.pageTitle}>Афіша</h1>
       
      
        <ul className={styles.postersList}>
          {posters.slice(0, postersPerPage).map((poster, index) => (
            <li ref={imgRef} key={index }  className={styles.postersListItem}       >
              <img    className={styles.posterImg} src={poster.url} alt={`Афіша  ${poster. title}`} 
         onClick={handelImageClick}
              />
              <p>{poster.title}</p>
            </li>
          ))}
        </ul>
        <button
            className={styles.buttonViewMore}
           
            onClick={viewMore}
          >
            Дивитися Більше 
             <div className={styles.icon_more}>
            <span></span>
            </div>
          </button>
      </section>
    </Container>
  )
}

export default PostersPage
