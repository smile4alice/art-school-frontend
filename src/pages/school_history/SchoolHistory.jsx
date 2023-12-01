import Container from '@/components/Container/Container';
import { useEffect } from 'react';

const SchoolHistory = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <Container>
      <h1>SchoolHistory </h1>
    </Container>
  );
};

export default SchoolHistory;
