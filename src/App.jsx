import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import SEO from './components/SEO';
import RemoveTrailingSlash from './components/RemoveTrailingSlash';

/* main */
import Layout from './components/layout/Layout';
import HomePage from './pages/main/HomePage';
import Page404 from './pages/main/page_404/Page404';
import Contacts from './pages/main/contacts/Contacts';
import Gallery from './pages/main/gallery/Gallery';
import AllNews from './pages/main/news/AllNews';
import OneNews from './pages/main/news/news_post/NewsPost';
import PostersPage from './pages/main/posters/PostersPage';
import Cooperation from './pages/main/cooperation/Cooperation';
import SchoolDocuments from './pages/main/school_documents/School_documents';

/* login */
import LoginLayout from './components/admin-components/Login/LoginLayout/LoginLayout';
import SignInPage from './pages/admin-pages/LoginAdmin/SignInAdmin/SignInPageAdmin';
import PasswordRecoveryPage from './pages/admin-pages/LoginAdmin/PasswordRecoveryAdmin/PasswordRecoveryPageAdmin';
import CompletePasswordRecoveryPage from './pages/admin-pages/LoginAdmin/CompletePasswordRecoveryAdmin/CompletePasswordRecoveryPageAdmin';
import SuccessPage from './pages/admin-pages/LoginAdmin/SuccessAdmin/SuccessPageAdmin';

/* departments */
import PreschoolDepartment from './pages/main/departments/PreschoolDepartment';
import MusicDepartment from './pages/main/departments/MusicDepartment';
import VocalDepartment from './pages/main/departments/VocalDepartment';
import ChoreographicDepartment from './pages/main/departments/ChoreographicDepartment';
import TheaterDepartment from './pages/main/departments/TheaterDepartment';
import FineArtsDepartment from './pages/main/departments/FineArtsDepartment';
import SchoolHistory from './pages/main/school_history/SchoolHistory';
import AboutSchool from './pages/main/about_school/AboutSchool';

/* admin */
import AdminSharedLayout from './components/admin-components/AdminSharedLayout/AdminSharedLayout';
import AdminDashboard from './components/admin-components/AdminDashboard/AdminDashboard';
import SlidersPageAdmin from './pages/admin-pages/SlidersAdmin/SlidersPageAdmin';
import AddSlidersPage from './pages/admin-pages/SlidersAdmin/AddSlidersPageAdmin';
import EditSlidersPage from './pages/admin-pages/SlidersAdmin/EditSlidersPageAdmin';
import NewsPageAdmin from './pages/admin-pages/NewsAdmin/NewsPageAdmin';
import AddNewsPageAdmin from './pages/admin-pages/NewsAdmin/AddNewsPageAdmin';
import EditNewsPageAdmin from './pages/admin-pages/NewsAdmin/EditNewsPageAdmin';
import PostersPageAdmin from './pages/admin-pages/PostersAdmin/PostersPageAdmin';

import GalleryPageAdmin from './pages/admin-pages/GalleryAdmin/GalleryPageAdmin';
import AddGalleryPage from './pages/admin-pages/GalleryAdmin/AddGalleryPageAdmin';
import EditGalleryPage from './pages/admin-pages/GalleryAdmin/EditGalleryPageAdmin';
import DepartmentsPageAdmin from './pages/admin-pages/DepartmentsAdmin/DepartmentsPageAdmin';
import DepartmentPageAdmin from './pages/admin-pages/DepartmentsAdmin/DepartmentPageAdmin';
import AddSubDepartmentPage from './pages/admin-pages/DepartmentsAdmin/AddSubDepartmentPage';
import EditSubDepartmentPage from './pages/admin-pages/DepartmentsAdmin/EditSubDepartmentPage';
import OurAchievementsPageAdmin from './pages/admin-pages/OurAchievementsAdmin/OurAchievementsPageAdmin';
import AddOurAchievementsPage from './pages/admin-pages/OurAchievementsAdmin/AddOurAchievementsPageAdmin';
import EditOurAchievementsPage from './pages/admin-pages/OurAchievementsAdmin/EditOurAchievementsPageAdmin';
import SchoolAdministrationPageAdmin from './pages/admin-pages/SchoolAdministrationAdmin/SchoolAdministrationPageAdmin';
import AddSchoolAdministrationPage from './pages/admin-pages/SchoolAdministrationAdmin/AddSchoolAdministrationPageAdmin';
import EditSchoolAdministrationPage from './pages/admin-pages/SchoolAdministrationAdmin/EditSchoolAdministrationPageAdmin';
import ContactsPageAdmin from './pages/admin-pages/ContactsAdmin/ContactsPageAdmin';
import EditContactsPageAdmin from './pages/admin-pages/ContactsAdmin/EditContactsPageAdmin';
import ChangePasswordPageAdmin from './pages/admin-pages/ChangePassword/ChangePasswordPageAdmin';
import NotFoundAdmin from './components/admin-components/NotFound/NotFoundAdmin';
import AddPostersPage from './pages/admin-pages/PostersAdmin/AddPostersPageAdmin';
import EditPostersPage from './pages/admin-pages/PostersAdmin/EditPostersPageAdmin';
import VideoPageAdmin from './pages/admin-pages/VideoAdmin/VideoPageAdmin';
import AddVideoPage from './pages/admin-pages/VideoAdmin/AddVideoPageAdmin';
import EditVideoPage from './pages/admin-pages/VideoAdmin/EditVideoPageAdmin';
import PrivateRoute from './components/admin-components/PrivateRoute/PrivateRoute';
import SchoolDocumentsPageAdmin from './pages/admin-pages/SchoolDocumentsAdmin/SchoolDocumentsPageAdmin';
import AddSchoolDocumentsPage from './pages/admin-pages/SchoolDocumentsAdmin/AddSchoolDocuments';
import EditSchoolDocumentsPage from './pages/admin-pages/SchoolDocumentsAdmin/EditSchoolDocuments';

const App = () => {
  const helmetContext = {};
  return (
    <HelmetProvider context={helmetContext}>
      <SEO
        title="Київська дитяча школа мистецтв №2 ім. М.І.Вериківського"
        description="У 2021-2022 навчальному році Київська дитяча школа мистецтв № 2 імені M. I. Вериківського відсвяткувала свій ювілей – 90 річницю від дня утворення. Нині на музичному, театральному, хореографічному, образотворчому та підготовчому відділеннях навчається близько 1000 учнів віком від 2,5 до 17 років."
      />
      <Router>
        <RemoveTrailingSlash />
        <Routes>
          {/* main */}
          <Route path="/" element={<Layout />}>
            <Route index element={<HomePage />} />
            <Route path="*" element={<Page404 />} />
            <Route
              path="/contacts"
              caseSensitive={true}
              element={<Contacts />}
            />
            <Route path="/gallery" caseSensitive={true} element={<Gallery />} />
            <Route path="/events" caseSensitive={true} element={<AllNews />} />
            <Route
              path="/events/:title"
              caseSensitive={true}
              element={<OneNews />}
            />
            <Route
              path="/posters"
              caseSensitive={true}
              element={<PostersPage />}
            />
            <Route
              path="/cooperation"
              caseSensitive={true}
              element={<Cooperation />}
            />
            <Route
              path="/about-school"
              caseSensitive={true}
              element={<AboutSchool />}
            />
            <Route
              path="/about-school-history"
              caseSensitive={true}
              element={<SchoolHistory />}
            />
            <Route
              path="/school-documents"
              caseSensitive={true}
              element={<SchoolDocuments />}
            />

            {/* departments */}
            <Route
              path="/music-department"
              caseSensitive={true}
              element={<MusicDepartment />}
            />
            <Route
              path="/vocal-department"
              caseSensitive={true}
              element={<VocalDepartment />}
            />
            <Route
              path="/сhoreographic-department"
              caseSensitive={true}
              element={<ChoreographicDepartment />}
            />
            <Route
              path="/theater-department"
              caseSensitive={true}
              element={<TheaterDepartment />}
            />
            <Route
              path="/fine-arts-department"
              caseSensitive={true}
              element={<FineArtsDepartment />}
            />
            <Route
              path="/preschool-department"
              caseSensitive={true}
              element={<PreschoolDepartment />}
            />
            <Route
              path="/about-school-administration"
              caseSensitive={true}
              element={<AboutSchool />}
            />
          </Route>

          {/* login */}
          <Route path="/login" caseSensitive={true} element={<LoginLayout />}>
            <Route index element={<SignInPage />} />
            <Route
              path="password-recovery"
              caseSensitive={true}
              element={<PasswordRecoveryPage />}
            />
            <Route
              path="password-recovery/:token"
              caseSensitive={true}
              element={<CompletePasswordRecoveryPage />}
            />
            <Route
              path="password-recovery-success"
              caseSensitive={true}
              element={<SuccessPage />}
            />
          </Route>

          {/* admin */}
          <Route
            path="/admin"
            element={
              <PrivateRoute redirectTo="/login">
                <AdminSharedLayout />
              </PrivateRoute>
            }
          >
            <Route index element={<AdminDashboard />} />
            <Route path="sliders" element={<SlidersPageAdmin />} />
            <Route path="sliders/add" element={<AddSlidersPage />} />
            <Route path="sliders/edit/:id" element={<EditSlidersPage />} />
            <Route path="news" element={<NewsPageAdmin />} />
            <Route path="news/add" element={<AddNewsPageAdmin />} />
            <Route path="news/edit/:id" element={<EditNewsPageAdmin />} />
            <Route path="posters" element={<PostersPageAdmin />} />
            <Route path="posters/add" element={<AddPostersPage />} />
            <Route path="posters/edit/:id" element={<EditPostersPage />} />
            <Route path="gallery" element={<GalleryPageAdmin />} />
            <Route path="gallery/add" element={<AddGalleryPage />} />
            <Route path="gallery/edit/:id" element={<EditGalleryPage />} />
            <Route path="video" element={<VideoPageAdmin />} />
            <Route path="video/add" element={<AddVideoPage />} />
            <Route path="video/edit/:id" element={<EditVideoPage />} />
            <Route path="departments" element={<DepartmentsPageAdmin />} />
            <Route path="departments/:id" element={<DepartmentPageAdmin />} />
            <Route
              path="departments/sub-department/add"
              element={<AddSubDepartmentPage />}
            />
            <Route
              path="departments/sub-department/edit/:id"
              element={<EditSubDepartmentPage />}
            />
            <Route path="achievements" element={<OurAchievementsPageAdmin />} />
            <Route
              path="achievements/add"
              element={<AddOurAchievementsPage />}
            />
            <Route
              path="achievements/edit/:id"
              element={<EditOurAchievementsPage />}
            />
            <Route path="documents" element={<SchoolDocumentsPageAdmin />} />
            <Route path="documents/add" element={<AddSchoolDocumentsPage />} />
            <Route
              path="documents/edit/:id"
              element={<EditSchoolDocumentsPage />}
            />
            <Route path="contacts" element={<ContactsPageAdmin />} />
            <Route
              path="contacts/edit/:key"
              element={<EditContactsPageAdmin />}
            />
            <Route path="password" element={<ChangePasswordPageAdmin />} />
            <Route
              path="administration"
              element={<SchoolAdministrationPageAdmin />}
            />
            <Route
              path="administration/add"
              element={<AddSchoolAdministrationPage />}
            />
            <Route
              path="administration/edit/:id"
              element={<EditSchoolAdministrationPage />}
            />
          </Route>

          <Route path="/admin/*" element={<NotFoundAdmin />} />
        </Routes>
      </Router>
    </HelmetProvider>
  );
};

export default App;
