import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/layout/Layout';
<<<<<<< HEAD
import HomePage from './pages/main/HomePage';
import Page404 from './pages/page_404/Page404';
import Contacts from './pages/main/contacts/Contacts';
import Gallery from './pages/main/gallery/Gallery';
import AllNews from './pages/main/allnews/AllNews';
import OneNews from './pages/main/onenews/OneNews';
=======
import HomePage from '@/pages/main/HomePage';
import Page404 from '@/pages/page_404/Page404';
import Contacts from '@/pages/main/contacts/Contacts';
import Gallery from '@/pages/main/gallery/Gallery';
import PostersPage from '@/pages/main/posters/PostersPage';
import Cooperation from './pages/main/cooperation/Cooperation';
>>>>>>> dev

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path="*" element={<Page404 />} />
          <Route path="/contacts" element={<Contacts />} />
          <Route path="/gallery" element={<Gallery />} />
<<<<<<< HEAD
          <Route path="/news" element={<AllNews />} />
          <Route path="/news/:id" element={<OneNews />} />
=======
          <Route path="/posters" element={<PostersPage />} />
          <Route path="/cooperation" element={<Cooperation />} />
>>>>>>> dev
        </Route>
      </Routes>
    </Router>
  );
};

export default App;
