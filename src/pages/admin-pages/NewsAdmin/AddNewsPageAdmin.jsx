import { Formik, Form, Field } from 'formik';
import useNewsStore from '@/store/newsStore';
import { newsValidation } from './validationSchema';
import PageTitle from '@/components/admin-components/PageTitle/PageTitle';
import ButtonSubmit from '@/components/admin-components/Buttons/SubmitButton/ButtonSubmit';
import TextInput from '@/components/admin-components/formik/TextInput/TextInput';
import TextArea from '@/components/admin-components/formik/TextArea/TextArea';
import FileInput from '@/components/admin-components/formik/FileInput/FileInput';
import styles from './NewsAdmin.module.scss';

const initialValues = {
  title: '',
  text: '',
  image: [],
};

const AddNewsPage = () => {
  const { addPost } = useNewsStore();

  const onSubmit = async values => {
    try {
      await addPost(values);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <PageTitle
        title="Додати новину"
        showBackButton={true}
        backButtonLink="/admin/sliders"
        showActionButton={false}
      />
      <Formik
        initialValues={initialValues}
        validationSchema={newsValidation}
        onSubmit={onSubmit}
      >
        <Form>
          <div className={styles.layout}>
            <Field
              name="title"
              id="title"
              placeholder="Title"
              component={TextInput}
              maxLength={120}
              showCharacterCount={true}
            />
            <div className={styles.secondRow}>
              <Field
                name="text"
                id="text"
                placeholder="Title"
                component={TextArea}
                maxLength={2000}
                showCharacterCount={true}
              />
              <Field name="image" id="image" component={FileInput} />
            </div>
            <div className={styles.button}>
              <ButtonSubmit
                nameButton="Зберегти зміни"
                isActive={true}
                isRight={true}
                handlerSubmitButton={onSubmit}
              />
            </div>
          </div>
        </Form>
      </Formik>
    </div>
  );
};

export default AddNewsPage;
