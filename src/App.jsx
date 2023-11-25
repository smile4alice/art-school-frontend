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

// import SignInPageAdmin from './pages/admin-pages/LoginAdmin/SignInAdmin/SignInPageAdmin';

// import AccountPageAdmin from './pages/admin-pages/AccountAdmin/AccountPageAdmin';
// import AddAccountPageAdmin from './pages/admin-pages/AccountAdmin/AddAccountPageAdmin';
// import EditAccountPageAdmin from './pages/admin-pages/AccountAdmin/EditAccountPageAdmin';

// import ContactsPageAdmin from './pages/admin-pages/ContactsAdmin/ContactsPageAdmin';
// import AddContactsPageAdmin from './pages/admin-pages/ContactsAdmin/AddContactsPageAdmin';
// import EditContactsPageAdmin from './pages/admin-pages/ContactsAdmin/EditContactsPageAdmin';

// import GalleryPageAdmin from './pages/admin-pages/GalleryAdmin/GalleryPageAdmin';
// import AddGalleryPageAdmin from './pages/admin-pages/GalleryAdmin/AddGalleryPageAdmin  ';
// import EditGalleryPageAdmin from './pages/admin-pages/GalleryAdmin/EditGalleryPageAdmin';

// import NewsPageAdmin from './pages/admin-pages/NewsAdmin/NewsPageAdmin';
// import AddNewsPageAdmin from './pages/admin-pages/NewsAdmin/AddNewsPageAdmin';
// import EditNewsPageAdmin from './pages/admin-pages/NewsAdmin/EditNewsPageAdmin';

// import OurAchievementsPageAdmin from './pages/admin-pages/OurAchievementsAdmin/OurAchievementsPageAdmin';
// import AddOurAchievementsPageAdmin from './pages/admin-pages/OurAchievementsAdmin/AddOurAchievementsPageAdmin';
// import EditOurAchievementsPageAdmin from './pages/admin-pages/OurAchievementsAdmin/EditOurAchievementsPageAdmin';

// import PostersPageAdmin from './pages/admin-pages/PostersAdmin/PostersPageAdmin';
// import AddPostersPageAdmin from './pages/admin-pages/PostersAdmin/AddPostersPageAdmin';
// import EditPostersPageAdmin from './pages/admin-pages/PostersAdmin/EditPostersPageAdmin';

// import SchoolAdministrationPageAdmin from './pages/admin-pages/SchoolAdministrationAdmin/SchoolAdministrationPageAdmin';
// import AddSchoolAdministrationPageAdmin from './pages/admin-pages/SchoolAdministrationAdmin/AddSchoolAdministrationPageAdmin';
// import EditSchoolAdministrationPageAdmin from './pages/admin-pages/SchoolAdministrationAdmin/EditSchoolAdministrationPageAdmin';

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
          <Route path="/theater/_department" element={<Theater />} />
        </Route>

{/*         <Route path="/login" element={<LoginLayout />}>
          <Route index element={<Login />} />
          <Route path="forget-password" element={<ForgetPassword />} />
          <Route path="renew/*" element={<RenewPassword />} />
          <Route path="successful-renew" element={<SuccessfullRenew />} />
        </Route> */}
      </Routes>
    </Router>
  );
};

export default App;
