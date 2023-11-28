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
//import Theater from './pages/main/theater/Theater';
import AboutSchool from './pages/main/aboutSchool/AboutSchool';
import DepartmentPage from './pages/department_page/DepartmentPage';

import LoginLayout from './components/admin-components/Login/LoginLayout/LoginLayout';
import AdminSharedLayout from './components/admin-components/AdminSharedLayout/AdminSharedLayout';
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
          <Route path="/about_school" element={<AboutSchool />} />
          <Route path="/about_school_history'" element={<AboutSchool />} />
          <Route path="/about_school_museum" element={<AboutSchool />} />
          <Route path="/music_department" element={<DepartmentPage id={'1'} title={'Музичне відділення'}/>} />
          <Route path="/vocal_choral_department" element={<DepartmentPage id={'2'} title={'Вокально-хорове відділення'}/>} />
          <Route path="/сhoreographic_department" element={<DepartmentPage id={'3'} title={'Хореографічне відділення'}/>} />
          <Route path="/theater_department" element={<DepartmentPage id={'4'} title={'Образотворче відділення'}/>}/>
          <Route path="/fine_arts_department" element={<DepartmentPage id={'5'} title={'Театральне відділення'}/>}/>
          <Route path="/preschool_preparatory_department" element={<DepartmentPage id={'6'} title={'Дошкільне та підготовче відділення'}/>}/>
          <Route path="/about_school_administration"element={<AboutSchool />}/>
          {/*<Route path="/theater_department" element={<Theater />} />*/}
        </Route>

        <Route path="/login" element={<LoginLayout />}>
        </Route>
        
        <Route path="/admin" element={<AdminSharedLayout />}>
        </Route>
        
         <Route path="/admin/*"element={<NotFoundAdmin/>}/>
      </Routes>
    </Router>
  );
};

export default App;
