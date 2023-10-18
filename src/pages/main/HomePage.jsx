import Header from '@/components/main/Header/Header';
import Hero from '@/components/main/Hero/Hero';
import Gallery from '@/components/main/Gallery/Gallery';
import Achievements from '@/components/main/Achievements/Achievements';
import History from '@/components/main/History/History';
import Departments from '@/components/main/Departments/Departments';
import Map from '@/components/main/Map/Map';
import News from '@/components/main/News/News';
import Footer from '@/components/main/Footer/Footer';

const HomePage = () => {
  return (
    <>
      <Header />
      <Hero />
      <History />
      <Departments />
      <News />
      <Gallery />
      <Achievements />
      <Map />
      <Footer />
    </>
  );
};

export default HomePage;
