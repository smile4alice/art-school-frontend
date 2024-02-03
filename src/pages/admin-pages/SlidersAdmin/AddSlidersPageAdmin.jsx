import { useNavigate } from 'react-router-dom';
import { Formik, Form, Field } from 'formik';
import { slidersValidation } from './validationSchema';
import useSlidersStore from '@/store/slidersStore';
import PageTitle from '@/components/admin-components/PageTitle/PageTitle';
import TextInput from '@/components/admin-components/formik/TextInput/TextInput';
import TextArea from '@/components/admin-components/formik/TextArea/TextArea';
import FileInput from '@/components/admin-components/formik/FileInput/FileInput';
import ButtonSubmit from '@/components/admin-components/Buttons/SubmitButton/ButtonSubmit';
import BreadCrumbs from '@/components/admin-components/BreadCrumbs/BreadCrumbs';
import styles from './SlidersAdmin.module.scss';

const breadcrumbs = ['Слайдери', 'Додати слайд'];

const initialValues = {
  title: '',
  text: '',
  image: [],
};

const AddSlidersPage = () => {
  const navigate = useNavigate();
  const { addSlide, loading } = useSlidersStore();
  const error = useSlidersStore(state => state.error);

  const onSubmit = async values => {
    try {
      const formData = new FormData();
      formData.append('title', values.title);
      formData.append('description', values.text);
      if (values.image && values.image[0]) {
        formData.append('photo', values.image[0]);
      }

      const res = await addSlide(formData);
      if (res && res.status === 200) {
        navigate('/admin/sliders');
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <BreadCrumbs breadcrumbs={breadcrumbs} />
      <PageTitle
        title="Додати слайд"
        showBackButton={true}
        backButtonLink="/admin/sliders"
        showActionButton={false}
      />
      {error && <p className={styles.error}>{error}</p>}
      <Formik
        initialValues={initialValues}
        validationSchema={slidersValidation}
        onSubmit={onSubmit}
      >
        {formik => {
          return (
            <Form>
              <div className={styles.layout}>
                <div className={styles.fieltTextInput}>
                  <Field
                    name="title"
                    id="title"
                    component={TextInput}
                    maxLength={120}
                    showCharacterCount={true}
                    label="Заголовок"
                  />
                </div>
                <div className={styles.secondRow}>
                  <Field
                    name="text"
                    id="text"
                    component={TextArea}
                    maxLength={200}
                    showCharacterCount={true}
                    label="Опис"
                  />
                  <Field
                    name="image"
                    id="image"
                    component={FileInput}
                    label="Фото*"
                  />
                </div>

                <div className={styles.button}>
                  <ButtonSubmit
                    nameButton="Зберегти зміни"
                    isActive={
                      formik.isValid && Object.keys(formik.touched).length
                    }
                    isRight={true}
                    isError={error}
                    handlerSubmitButton={onSubmit}
                    isProcessing={loading && !error}
                  />
                </div>
              </div>
            </Form>
          );
        }}
      </Formik>
    </div>
  );
};

export default AddSlidersPage;
