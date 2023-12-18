import { useState, useEffect } from 'react';
import useContactsStore from '@/store/contactsStore';
import PageTitle from '@/components/admin-components/PageTitle/PageTitle';
import ContactsTable from '@/components/admin-components/Сontacts/ContactsTable/ContactsTable';
import BreadCrumbs from '@/components/admin-components/BreadCrumbs/BreadCrumbs';

const breadcrumbs = ['Контакти'];

const ContactsPageAdmin = () => {
  const { getContacts } = useContactsStore();
  const [contacts, setContacts] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await getContacts();
        setContacts(result);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, [getContacts]);

  return (
    <div>
      <BreadCrumbs breadcrumbs={breadcrumbs} />
      <PageTitle
        title="Контакти"
        showBackButton={false}
        showActionButton={false}
      />
      <ContactsTable data={contacts} />
    </div>
  );
};

export default ContactsPageAdmin;
