import { Icon } from 'leaflet';
import { MapContainer, TileLayer, Marker } from 'react-leaflet';
import Container from '@/components/Container/Container';
import 'leaflet/dist/leaflet.css';
import styles from './Map.module.scss';

const Map = () => {
  const customIcon = new Icon({
    iconUrl: '/icons/marker.png',
    iconSize: [38, 38],
  });
  return (
    <Container>
      <section className={styles.Map}>
        <h1>Наше Розташування</h1>
        <div>
          <MapContainer
            center={[50.454, 30.504]}
            zoom={17}
            scrollWheelZoom={false}
          >
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <Marker position={[50.45449, 30.50435]} icon={customIcon} />
          </MapContainer>
        </div>
      </section>
    </Container>
  );
};

export default Map;
