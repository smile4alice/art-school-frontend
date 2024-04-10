import { useEffect } from 'react';
import { Icon } from 'leaflet';
import { Link } from 'react-router-dom';
import useContactsStore from '@/store/contactsStore';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import SEO from '@/components/SEO';
import 'leaflet/dist/leaflet.css';
import s from './Contacts.module.scss';

const Contacts = () => {
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

  const customIcon = new Icon({
    iconUrl: '/icons/location1.png',
    iconSize: [45, 42],
  });

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <SEO
        title="Контакти КДШМ №2 ім. М.І.Вериківського"
        description="Школа мистецтв Київ. Київська дитяча школа мистецтв. Адреса КДШМ №2 ім. М.І.Вериківського: вул.Бульварно-Кудрявська, 2, телефон: +38(044)272-00-30"
      />
      <div className={s.wrapper}>
        <div className={s.contacts}>
          <h1 className={s.title}>Наші контакти</h1>
          <ul className="list">
            <li>{contacts.address}</li>
            <li>Пн-Пт 9:00-18:00</li>
            <li>
              <Link to={`tel:${contacts.phone}`}>{contacts.phone}</Link>
            </li>
            <li>
              <Link to={`mailto:${contacts.email}`}>{contacts.email}</Link>
            </li>
          </ul>
          <div className={s.mapContainer}>
            <MapContainer
              center={{ lat: 50.4544, lng: 30.5043 }}
              zoom={18}
              scrollWheelZoom={false}
            >
              <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                detectRetina={true}
              />
              <Marker position={[50.45449, 30.50435]} icon={customIcon}>
                <Popup>
                  <div className={s.popup}>
                    <h3>Наша адреса</h3>
                    <p>{contacts.address}</p>
                    <p>{contacts.phone}</p>
                  </div>
                </Popup>
              </Marker>
            </MapContainer>
          </div>
        </div>
      </div>
    </>
  );
};

export default Contacts;
