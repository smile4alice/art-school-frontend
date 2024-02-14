import { useEffect, lazy, Suspense } from 'react';
import Spinner from '@/components/ui/Spinner/Spinner';
const Hero = lazy(() => import('@/components/main/Hero/Hero'));
const Gallery = lazy(() => import('@/components/main/Gallery/Gallery'));
const Achievements = lazy(() =>
  import('@/components/main/Achievements/Achievements')
);
const History = lazy(() => import('@/components/main/History/History'));
const Departments = lazy(() =>
  import('@/components/main/Departments/Departments')
);
const Map = lazy(() => import('@/components/main/Map/Map'));
const News = lazy(() => import('@/components/main/News/News'));

const HomePage = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <Suspense fallback={<Spinner />}>
      <Hero />
      <History />
      <Departments />
      <News />
      <Gallery />
      <Achievements
        title={'Наші досягнення'}
        url={'achievements'}
        showSelect={false}
      />
      <Map />
    </Suspense>
  );
};

export default HomePage;