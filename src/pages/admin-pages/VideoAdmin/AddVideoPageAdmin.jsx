import { useState, useEffect } from 'react';
import { Formik, Form, Field } from 'formik';
import { useNavigate } from 'react-router-dom';
import CustomTitle from '@/components/admin-components/OurAchievements/CustomTitle/CustomTitle';
import SelectAdminDouble from '@/components/admin-components/OurAchievements/SelectAdminDouble/SelectAdminDouble';
import AchievementPositions from '@/components/admin-components/OurAchievements/AchievementPositions/AchievementsPositions';
import useVideoStore from '@/store/videoStore';
import { videoValidation } from './validationSchema';
import TextInput from '@/components/admin-components/formik/TextInput/TextInput';
import PageTitle from '@/components/admin-components/PageTitle/PageTitle';
import ButtonSubmit from '@/components/admin-components/Buttons/SubmitButton/ButtonSubmit';
import BreadCrumbs from '@/components/admin-components/BreadCrumbs/BreadCrumbs';

import s from './VideoPage.module.scss';

const breadcrumbs = ['Відеогалерея', 'Додати відео'];

const initialValues = {
  pinned_position: '',
  sub_department: '',
  media: '',
};

const AddVideoPage = () => {
  const { addVideo, getVideoPositions } = useVideoStore();
  const videoPositions = useVideoStore(
    state => state.videoPositions
  );
  const navigate = useNavigate();
  const [isProcessing, setIsProcessing] = useState(false);
  const [title, setTitle] = useState('Всі відео')

  const onSubmit = async values => {
    console.log(values);
    try {
      const formData = new FormData();
      formData.append('media', values.media);
      formData.append('pinned_position', values.pinned_position);
      formData.append('sub_department', values.sub_department);
      setIsProcessing(true);
      await addVideo(formData);
      setIsProcessing(false);
      navigate(-1);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        await getVideoPositions();
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, [getVideoPositions]);





  return (
    <div className={s.container}>
      <BreadCrumbs breadcrumbs={breadcrumbs} />
      <PageTitle
        title="Додати відео в галерею"
        showBackButton={true}
        backButtonLink="/admin/video"
        showActionButton={false}
      />
      <Formik
        initialValues={initialValues}
        validationSchema={videoValidation}
        onSubmit={onSubmit}
      >
        {formik => (
          <Form>
            <div className={s.selectBlock}>
              <CustomTitle title={title} width={'fixed'} />
              <SelectAdminDouble
                changeDepartment={(id, title) => {
                  if (id !== undefined && id !== null) {
                    formik.setFieldValue('sub_department', id);
                    setTitle(title);
                  }
                }}
              />
            </div>
            <div className={s.form}>
              <Field
                name="media"
                id="media"
                placeholder="_Link"
                component={TextInput}
                maxLength={200}
                label="Посилання відео"
              />
               <Field
                name="pinned_position"
                id="pinned_position"
                component={AchievementPositions}
                title='Закріпити в відеогалерею на головній сторінці'
                achievementPositions={videoPositions}
                video={true}
              />
              <div className={s.button}>
                <ButtonSubmit
                  nameButton="Зберегти зміни"
                  isActive={formik.isValid}
                  isRight={true}
                  handlerSubmitButton={formik.handleSubmit}
                  isProcessing={isProcessing}
                />
              </div>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default AddVideoPage;
