import { useState } from 'react';
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
  const { addSlide } = useSlidersStore();
  const [isProcessing, setIsProcessing] = useState(false);

  const onSubmit = async values => {
    try {
      setIsProcessing(true);
      await addSlide(values);
      setIsProcessing(false);
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
      <Formik
        initialValues={initialValues}
        validationSchema={slidersValidation}
        onSubmit={onSubmit}
      >
        {formik => {
          return (
            <Form>
              <div className={styles.layout}>
                <Field
                  name="title"
                  id="title"
                  component={TextInput}
                  maxLength={120}
                  showCharacterCount={true}
                  label="Заголовок Слайду"
                />
                <div className={styles.secondRow}>
                  <Field
                    name="text"
                    id="text"
                    component={TextArea}
                    maxLength={2000}
                    showCharacterCount={true}
                    label="Опис слайду"
                  />
                  <Field
                    name="image"
                    id="image"
                    component={FileInput}
                    label="Фото"
                  />
                </div>
                <div className={styles.button}>
                  <ButtonSubmit
                    nameButton="Зберегти зміни"
                    isActive={formik.isValid}
                    isRight={true}
                    handlerSubmitButton={onSubmit}
                    isProcessing={isProcessing}
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
