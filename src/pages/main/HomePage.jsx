import Hero from '@/components/main/Hero/Hero';
import Gallery from '@/components/main/Gallery/Gallery';
import Achievements from '@/components/main/Achievements/Achievements';
import History from '@/components/main/History/History';
import Departments from '@/components/main/Departments/Departments';
import Map from '@/components/main/Map/Map';
import News from '@/components/main/News/News';

const HomePage = () => {
  return (
    <>
      <main>
        <Hero />
        <History />
        <Departments />
        <News />
        <Gallery />
        <Achievements />
        <Map />
      </main>
    </>
  );
};

export default HomePage;
