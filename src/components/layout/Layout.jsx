import { useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import useContactsStore from '@/store/contactsStore';
import Header from '@/components/main/Header/Header';
import Footer from '@/components/main/Footer/Footer';

const Layout = () => {
  const { getContacts } = useContactsStore();
  const contacts = useContactsStore(state => state.contacts);

  useEffect(() => {
    const fetchContacts = async () => {
      try {
        await getContacts();
      } catch (error) {
        console.log(error);
      }
    };
    fetchContacts();
  }, [getContacts]);

  return (
    <>
      <Header contacts={contacts} />
      <main>
        <Outlet />
      </main>
      <Footer contacts={contacts} />
    </>
  );
};
export default Layout;
