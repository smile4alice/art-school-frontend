import Container from '@/components/Container/Container';
import { useEffect } from 'react';

const AboutSchool = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <Container>
      <div style={{ height: '100vh' }}>
        <h1>наша школа</h1>
      </div>
    </Container>
  );
};

export default AboutSchool;
