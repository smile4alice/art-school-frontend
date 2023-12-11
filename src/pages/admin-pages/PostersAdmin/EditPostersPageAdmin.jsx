import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';

import TextArea from '@/components/admin-components/formik/TextArea/TextArea';

import FileInput from '@/components/admin-components/formik/FileInput/FileInput';
import { useEffect, useState } from 'react';
import usePostersStore from '@/store/posterStore';
import { useParams } from 'react-router';
import ButtonSubmit from '@/components/admin-components/Buttons/SubmitButton/ButtonSubmit';

import styles from './PostersAdmin.module.scss';
import PageTitle from '@/components/admin-components/PageTitle/PageTitle';
import AdminHome from '@/components/Icons/AdminHome';
import AdminArrow from '@/components/Icons/AdminArrow';
import Spinner from '@/components/ui/Spinner/Spinner';
import { posterValidation } from './validationSchema';

const initialValues = {
  text: '',
  image: [],
};

const EditPostersPage = () => {
  const { id } = useParams();
  const { getPostersById } = usePostersStore();
  const { updatePoster } = usePostersStore();
  const [isLoading, setIsLoading] = useState(false);
  const [post, setPost] = useState();

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const result = await getPostersById(id);
        setPost(result);
        setIsLoading(false);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, [getPostersById, id]);

  const onSubmit = async values => {
    console.log('values: ', values);
    try {
      await updatePoster(values, id);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div className={styles.header}>
        <AdminHome />
        <AdminArrow />
        <span>Афіші</span>
        <AdminArrow />
        <span>Редагувати афішу</span>
      </div>
      {!isLoading ? (
        <div>
          <PageTitle
            title="Редагуватти Афішу"
            showBackButton={true}
            backButtonLink="/admin/posters"
            showActionButton={false}
          />
          <Formik
            initialValues={initialValues}
            validationSchema={posterValidation}
            onSubmit={onSubmit}
          >
            {formik => {
              return (
                <Form>
                  <div className={styles.layout}>
                    <div className={styles.inputWrapper}>
                      <Field
                        name="text"
                        id="text"
                        placeholder="Title"
                        component={TextArea}
                        maxLength={2000}
                        showCharacterCount={true}
                        text={post?.title}
                        label="Заголовок"
                      />
                      <Field
                        name="image"
                        id="image"
                        component={FileInput}
                        photo={post?.photo}
                        // label="Фото"
                      />
                    </div>
                  </div>
                  <div className={styles.button}>
                    <ButtonSubmit
                      nameButton="Зберегти зміни"
                      isActive={formik.isValid}
                      isRight={true}
                      handlerSubmitButton={onSubmit}
                      isProcessing={isLoading}
                    />
                  </div>
                </Form>
              );
            }}
          </Formik>
        </div>
      ) : (
        <Spinner />
      )}
    </>
  );
};

export default EditPostersPage;
