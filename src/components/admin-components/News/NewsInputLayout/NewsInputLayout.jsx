import { Field } from 'formik';
import TextInput from '@/components/admin-components/formik/TextInput/TextInput';
import TextArea from '@/components/admin-components/formik/TextArea/TextArea';
import FileInput from '@/components/admin-components/formik/FileInput/FileInput';
import styles from './NewsInputLayout.module.scss';

const NewsInputLayout = () => {
  return (
    <div className={styles.layout}>
      <Field
        name="title"
        id="title"
        placeholder="Title"
        component={TextInput}
        maxLength={10}
        showCharacterCount={true}
      />
      <div className={styles.secondRow}>
        <Field
          name="text"
          id="title"
          placeholder="Title"
          component={TextArea}
        />
        <Field name="image" id="image" component={FileInput} />
      </div>
    </div>
  );
};
export default NewsInputLayout;
