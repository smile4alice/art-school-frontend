import { useState, useEffect } from 'react';
import { Formik, Form, Field } from 'formik';
import { useParams } from 'react-router-dom';
import useSlidersStore from '@/store/slidersStore';
import { slidersValidation } from './validationSchema';
import PageTitle from '@/components/admin-components/PageTitle/PageTitle';
import TextInput from '@/components/admin-components/formik/TextInput/TextInput';
import TextArea from '@/components/admin-components/formik/TextArea/TextArea';
import FileInput from '@/components/admin-components/formik/FileInput/FileInput';
import ButtonSubmit from '@/components/admin-components/Buttons/SubmitButton/ButtonSubmit';
import BreadCrumbs from '@/components/admin-components/BreadCrumbs/BreadCrumbs';
import styles from './SlidersAdmin.module.scss';

const breadcrumbs = ['Слайдери', 'Редагувати слайд'];

const initialValues = {
  title: '',
  text: '',
  image: [],
};

const EditSlidersPage = () => {
  const { id } = useParams();
  const { getSlides, editSlide } = useSlidersStore();
  const [isProcessing, setIsProcessing] = useState(false);
  const [slide, setSlide] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await getSlides();
        setSlide(result.find(item => item.id == id));
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, [id, getSlides]);

  const onSubmit = async values => {
    try {
      setIsProcessing(true);
      await editSlide(id, values);
      setIsProcessing(false);
    } catch (error) {
      console.log(error);
    }
    setIsProcessing(false);
  };

  return (
    <div>
      <BreadCrumbs breadcrumbs={breadcrumbs} />
      <PageTitle
        title="Редагувати слайд"
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
                  text={slide?.title}
                  label="Заголовок Слайду"
                />
                <div className={styles.secondRow}>
                  <Field
                    name="text"
                    id="text"
                    component={TextArea}
                    maxLength={2000}
                    showCharacterCount={true}
                    text={slide?.description}
                    label="Опис слайду"
                  />
                  <Field
                    name="image"
                    id="image"
                    component={FileInput}
                    photo={slide?.photo}
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

export default EditSlidersPage;
