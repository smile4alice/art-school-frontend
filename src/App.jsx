import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/layout/Layout';
import HomePage from './pages/main/HomePage';
import Page404 from './pages/page_404/Page404';
// import Contacts from './pages/main/contacts/Contacts';
// import Gallery from './pages/main/gallery/Gallery';
// import PostersPage from './pages/PostersPage/PostersPage';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<HomePage />} />
{/*         <Route path="/posters" element={<PostersPage/>} /> */}
          <Route path="*" element={<Page404 />} />
{/*           <Route path="/contacts" element={<Contacts />} /> */}
{/*           <Route path="/gallery" element={<Gallery />} /> */}
        </Route>
      </Routes>
    </Router>
  );
};

export default App;
