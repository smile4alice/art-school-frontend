import InputSm from '@/components/admin-components/formElement/Inputs/InputSm';
import TextArea from '@/components/admin-components/formElement/TextArea/TextArea';
import FileInput from '@/components/admin-components/formElement/FileInput/FileInput';
import styles from './NewsInputLayout.module.scss';

const NewsInputLayout = () => {
  return (
    <div className={styles.layout}>
      <form>
        <InputSm label="Заголовок*" maxLength={50} showCharacterCount={false} />
        <div className={styles.secondRow}>
          <TextArea
            label="Текст*"
            maxLength={2000}
            errorMessage="Текст перевищує 2000 символів"
          />
          <FileInput label="Фото*" />
        </div>
      </form>
    </div>
  );
};
export default NewsInputLayout;
