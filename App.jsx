import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './src/components/layout/Layout';
import HomePage from './src/pages/main/HomePage';
import Page404 from './src/pages/page_404/Page404';
import Contacts from './src/pages/main/contacts/Contacts';
import Gallery from './src/pages/main/gallery/Gallery';
import AllNews from './src/pages/main/allnews/AllNews';
import OneNews from './src/pages/main/onenews/OneNews';
import PostersPage from '@/pages/main/posters/PostersPage';
import Cooperation from './src/pages/main/cooperation/Cooperation';
import StatementPage from './src/pages/main/statement/StatementPage';

import AboutSchool from './src/pages/main/aboutSchool/AboutSchool';
import DepartmentPage from './src/pages/departments/DepartmentPage';

import LoginLayout from './src/components/admin-components/Login/LoginLayout/LoginLayout';
import AdminSharedLayout from './src/components/admin-components/AdminSharedLayout/AdminSharedLayout';
import AdminDashboard from './src/components/admin-components/AdminDashboard/AdminDashboard';

import SlidersPageAdmin from './src/pages/admin-pages/SlidersAdminAdmin/SlidersPageAdmin';
import AddSlidersPageAdmin from './src/pages/admin-pages/SlidersAdminAdmin/AddSlidersPageAdmin';
import NewsPageAdmin from './src/pages/admin-pages/NewsAdmin/NewsPageAdmin';
import AddNewsPageAdmin from './src/pages/admin-pages/NewsAdmin/AddNewsPageAdmin';
import PostersPageAdmin from './src/pages/admin-pages/PostersAdmin/PostersPageAdmin';
import GalleryPageAdmin from './src/pages/admin-pages/GalleryAdmin/GalleryAdmin/GalleryPageAdmin';
import DepartmentsPageAdmin from './src/pages/admin-pages/DepartmentsAdmin/DepartmentsPageAdmin';
import OurAchievementsPageAdmin from './src/pages/admin-pages/OurAchievementsAdmin/OurAchievementsPageAdmin';
import SchoolAdministrationPageAdmin from './src/pages/admin-pages/SchoolAdministrationAdmin/SchoolAdministrationPageAdmin';
import ContactsPageAdmin from './src/pages/admin-pages/ContactsAdmin/ContactsPageAdmin';
import ChangePasswordPageAdmin from './src/pages/admin-pages/ChangePassword/ChangePasswordPageAdmin';

import NotFoundAdmin from './src/components/admin-components/NotFound/NotFoundAdmin';
import SchoolHistory from './src/pages/school_history/SchoolHistory';
import AddPostersPage from '@/pages/admin-pages/PostersAdmin/AddPostersPageAdmin';
import EditPostersPage from '@/pages/admin-pages/PostersAdmin/EditPostersPageAdmin';

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
          <Route path="/statement" element={<StatementPage />} />
          <Route path="/about_school" element={<AboutSchool />} />
          <Route path="/about_school_history" element={<SchoolHistory />} />
          <Route path="/about_school_museum" element={<AboutSchool />} />
          <Route
            path="/music_department"
            element={
              <DepartmentPage
                id={'1'}
                showSelect={true}
                title={'Музичне відділення'}
              />
            }
          />
          <Route
            path="/vocal_choral_department"
            element={
              <DepartmentPage
                id={'2'}
                showSelect={true}
                title={'Вокально-хорове відділення'}
              />
            }
          />
          <Route
            path="/сhoreographic_department"
            element={
              <DepartmentPage
                id={'3'}
                showSelect={true}
                title={'Хореографічне відділення'}
              />
            }
          />
          <Route
            path="/theater_department"
            element={
              <DepartmentPage
                id={'4'}
                showSelect={false}
                title={'Театральне відділення'}
              />
            }
          />
          <Route
            path="/fine_arts_department"
            element={
              <DepartmentPage
                id={'5'}
                showSelect={true}
                title={'Образотворче відділення'}
              />
            }
          />
          <Route
            path="/preschool_preparatory_department"
            element={
              <DepartmentPage
                id={'6'}
                showSelect={false}
                title={'Дошкільне та підготовче відділення'}
              />
            }
          />
          <Route
            path="/about_school_administration"
            element={<AboutSchool />}
          />
        </Route>

        <Route path="/login" element={<LoginLayout />}></Route>

        <Route path="/admin" element={<AdminSharedLayout />}>
          <Route index element={<AdminDashboard />} />
          <Route path="sliders" element={<SlidersPageAdmin />} />
          <Route path="sliders-add" element={<AddSlidersPageAdmin />} />
          <Route path="news" element={<NewsPageAdmin />} />
          <Route path="news/add" element={<AddNewsPageAdmin />} />
          <Route path="posters" element={<PostersPageAdmin />} />
          <Route path="posters/add" element={<AddPostersPage />} />
          <Route path="posters/edit" element={<EditPostersPage />} />
          <Route path="gallery" element={<GalleryPageAdmin />} />
          <Route path="departments" element={<DepartmentsPageAdmin />} />
          <Route path="achievements" element={<OurAchievementsPageAdmin />} />
          <Route
            path="administration"
            element={<SchoolAdministrationPageAdmin />}
          />
          <Route path="contacts" element={<ContactsPageAdmin />} />
          <Route path="password" element={<ChangePasswordPageAdmin />} />
        </Route>

        <Route path="/admin/*" element={<NotFoundAdmin />} />
      </Routes>
    </Router>
  );
};

export default App;
