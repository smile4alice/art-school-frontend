import { useState, useEffect } from 'react';
import { Formik, Form, Field } from 'formik';
import { useParams } from 'react-router-dom';
import useNewsStore from '@/store/newsStore';
import { newsValidation } from './validationSchema';
import PageTitle from '@/components/admin-components/PageTitle/PageTitle';
import TextInput from '@/components/admin-components/formik/TextInput/TextInput';
import TextArea from '@/components/admin-components/formik/TextArea/TextArea';
import FileInput from '@/components/admin-components/formik/FileInput/FileInput';
import ButtonSubmit from '@/components/admin-components/Buttons/SubmitButton/ButtonSubmit';
import styles from './NewsAdmin.module.scss';

const initialValues = {
  title: '',
  text: '',
  image: [],
};

const EditNewsPage = () => {
  const { id } = useParams();
  const { getOnePost, editPost } = useNewsStore();
  const [isProcessing, setIsProcessing] = useState(false);
  const [post, setPost] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await getOnePost(id);
        setPost(result);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, [id, getOnePost]);

  const onSubmit = async values => {
    try {
      setIsProcessing(true);
      await editPost(id, values);
      setIsProcessing(false);
    } catch (error) {
      console.log(error);
    }
    setIsProcessing(false);
  };

  return (
    <div>
      <PageTitle
        title="Редагувати новину"
        showBackButton={true}
        backButtonLink="/admin/news"
        showActionButton={false}
      />
      <Formik
        initialValues={initialValues}
        validationSchema={newsValidation}
        onSubmit={onSubmit}
      >
        {formik => {
          return (
            <Form>
              <div className={styles.layout}>
                <Field
                  name="title"
                  id="title"
                  placeholder="Title"
                  component={TextInput}
                  maxLength={120}
                  showCharacterCount={true}
                  text={post?.title}
                  label="Заголовок Новини"
                />
                <div className={styles.secondRow}>
                  <Field
                    name="text"
                    id="text"
                    placeholder="Title"
                    component={TextArea}
                    maxLength={2000}
                    showCharacterCount={true}
                    text={post.text}
                    label="Текст Новини"
                  />
                  <Field
                    name="image"
                    id="image"
                    component={FileInput}
                    photo={post.photo}
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

export default EditNewsPage;
