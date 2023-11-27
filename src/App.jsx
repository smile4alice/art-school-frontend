import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/layout/Layout';
import HomePage from './pages/main/HomePage';
import Page404 from './pages/page_404/Page404';
import Contacts from './pages/main/contacts/Contacts';
import Gallery from './pages/main/gallery/Gallery';
import AllNews from './pages/main/allnews/AllNews';
import OneNews from './pages/main/onenews/OneNews';
import PostersPage from '@/pages/main/posters/PostersPage';
import Cooperation from './pages/main/cooperation/Cooperation';
import Theater from './pages/main/theaterDepartment/Theater';
import AboutSchool from './pages/main/aboutSchool/AboutSchool';

import LoginLayout from './components/admin-components/Login/LoginLayout/LoginLayout';
import AdminSharedLayout from './components/admin-components/AdminSharedLayout/AdminSharedLayout';
import NotFoundAdmin from './components/admin-components/NotFound/NotFoundAdmin';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path="/*" element={<Page404 />} />
          <Route path="/contacts" element={<Contacts />} />
          <Route path="/gallery" element={<Gallery />} />
          <Route path="/news" element={<AllNews />} />
          <Route path="/news/:id" element={<OneNews />} />
          <Route path="/posters" element={<PostersPage />} />
          <Route path="/cooperation" element={<Cooperation />} />
          <Route path="/theater_department" element={<Theater />} />
        </Route>

        <Route path="/login" element={<LoginLayout />}></Route>

        <Route path="/admin" element={<AdminSharedLayout />}></Route>

        <Route path="/admin/*" element={<NotFoundAdmin />} />
      </Routes>
    </Router>
  );
};

export default App;
