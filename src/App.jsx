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
import Theater from './pages/main/theater/Theater';
import AboutSchool from './pages/main/aboutSchool/AboutSchool';
import MusicDepartment from './pages/music_department/MusicDepartment';

import LoginLayout from './components/admin-components/Login/LoginLayout/LoginLayout';
import AdminSharedLayout from './components/admin-components/AdminSharedLayout/AdminSharedLayout';
import AdminDashboard from './components/admin-components/AdminDashboard/AdminDashboard';

import SlidersPageAdmin from './pages/admin-pages/SlidersAdminAdmin/SlidersPageAdmin';
import AddSlidersPage from './pages/admin-pages/SlidersAdminAdmin/AddSlidersPageAdmin'
import NewsPageAdmin from './pages/admin-pages/NewsAdmin/AddNewsPageAdmin';
import PostersPageAdmin from './pages/admin-pages/PostersAdmin/PostersPageAdmin';
import GalleryPageAdmin from './pages/admin-pages/GalleryAdmin/GalleryAdmin/GalleryPageAdmin';
import DepartmentsPageAdmin from './pages/admin-pages/DepartmentsAdmin/DepartmentsPageAdmin';
import OurAchievementsPageAdmin from './pages/admin-pages/OurAchievementsAdmin/OurAchievementsPageAdmin';
import SchoolAdministrationPageAdmin from './pages/admin-pages/SchoolAdministrationAdmin/SchoolAdministrationPageAdmin';
import ContactsPageAdmin from './pages/admin-pages/ContactsAdmin/ContactsPageAdmin';
import ChangePasswordPageAdmin from './pages/admin-pages/ChangePassword/ChangePasswordPageAdmin';

import NotFoundAdmin from './components/admin-components/NotFound/NotFoundAdmin';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path="*" element={<Page404 />} />
          <Route path="/contacts" element={<Contacts />} />
          <Route path="/gallery" element={<Gallery />} />
          <Route path="/news" element={<AllNews />} />
          <Route path="/news/:id" element={<OneNews />} />
          <Route path="/posters" element={<PostersPage />} />
          <Route path="/cooperation" element={<Cooperation />} />
          <Route path="/theater_department" element={<Theater />} />
          <Route path="/about_school" element={<AboutSchool />} />
          <Route path="/about_school_history'" element={<AboutSchool />} />
          <Route path="/about_school_museum" element={<AboutSchool />} />
          <Route path="/music_department" element={<MusicDepartment />} />
          <Route
            path="/about_school_administration"
            element={<AboutSchool />}
          />
        </Route>

        <Route path="/login" element={<LoginLayout />}>
        </Route>
        
        <Route path="/admin" element={<AdminSharedLayout />}>
          <Route index element={<AdminDashboard />} />
          <Route path="sliders" element={<SlidersPageAdmin />} />
          <Route path="sliders-add" element={<AddSlidersPage />} />
          <Route path="news" element={<NewsPageAdmin />} />
          <Route path="posters" element={<PostersPageAdmin />} />
          <Route path="gallery" element={<GalleryPageAdmin />} />
          <Route path="departments" element={<DepartmentsPageAdmin />} />
          <Route path="achievements" element={<OurAchievementsPageAdmin />} />
          <Route path="administration" element={<SchoolAdministrationPageAdmin />} />
          <Route path="contacts" element={<ContactsPageAdmin />} />
          <Route path="password" element={<ChangePasswordPageAdmin />} />
        </Route>
        
         <Route path="/admin/*" element={<NotFoundAdmin />} />
      </Routes>
    </Router>
  );
};

export default App;
