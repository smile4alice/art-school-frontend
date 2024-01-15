import { useEffect } from 'react';
import { Icon } from 'leaflet';
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
        title="Контакти Київської дитячаої школи мистецтв №2 ім. М.І.Вериківського"
        description='Адреса: вул.Бульварно-Кудрявська, 2, телефон: +38(044)272-00-30'
      />

      <div className={s.contacts}>
        <h2>Наші контакти</h2>
        <ul className="list">
          <li>{contacts.address}</li>
          <li>Пн-Пт 10:00-17:00</li>
          <li>
            <a href={`tel:${contacts.phone}`}>{contacts.phone}</a>
          </li>
          <li>
            <a href={`tel:${contacts.email}`}>{contacts.email}</a>
          </li>
        </ul>
        <div className={s.mapContainer}>
          <MapContainer
            center={{ lat: 50.45449, lng: 30.50435 }}
            zoom={17}
            scrollWheelZoom={false}
          >
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
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
    </>
  );
};

export default Contacts;
