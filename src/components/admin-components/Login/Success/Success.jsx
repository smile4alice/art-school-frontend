import { Link } from 'react-router-dom';
import BasicContainerLogin from '../BasicContainerLogin/BasicContainerLogin';
import styles from './Success.module.scss';

const Success = () => {
  return (
    <BasicContainerLogin>
      <h1>Пароль успішно змінено</h1>
      <img src="/icons/icon-success.svg" alt="" />
      <Link to="/login" className={styles.link}>
        Увійти в аккаунт
      </Link>
    </BasicContainerLogin>
  );
};
export default Success;
