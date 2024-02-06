import { useState, useEffect } from 'react';
import { Formik, Form, Field } from 'formik';
import axios from '@/utils/axios';
import { useNavigate, useParams } from 'react-router-dom';
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

const breadcrumbs = ['Відеогалерея', 'Редагувати відео'];

const initialValues = {
  pinned_position: '',
  sub_department: '',
  media: '',
};


const EditVideoPage = () => {
  const { getOneVideo, editVideo, getVideoPositions } = useVideoStore();
  const videoPositions = useVideoStore(state => state.videoPositions);
  const { id } = useParams();
  const navigate = useNavigate();
  const [isProcessing, setIsProcessing] = useState(false);
  const video = useVideoStore(state => state.video);
  const subDepartmentId = video?.sub_department;
  const error = useVideoStore(state => state.error);
  const [title, setTitle] = useState('Всі відео');

  useEffect(() => {
    const fetchData = async () => {
      try {
        await getOneVideo(id);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, [id, getOneVideo]);

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

  useEffect(() => {
    if (subDepartmentId) {
      axios
        .get(`/departments/sub_department/${subDepartmentId}`)
        .then(response => setTitle(response.data.sub_department_name))
        .catch(error => console.error(error));
    }
  }, [subDepartmentId]);

  const onSubmit = async values => {
    console.log(values);
    try {
      const formData = new FormData();
      formData.append('media', values.media);
      setIsProcessing(true);
      await editVideo(id, values);
      setIsProcessing(false);
      navigate(-1);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className={s.container}>
      <BreadCrumbs breadcrumbs={breadcrumbs} />
      <PageTitle
        title="Редагувати відео"
        showBackButton={true}
        backButtonLink="/admin/video"
        showActionButton={false}
      />
      {error && <p className={s.error}>{error}</p>}
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
                form={formik}
                subDepartmentId={video?.sub_department}
                changeTitle={setTitle}
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
                text={video?.media}
              />
              <Field
                name="pinned_position"
                id="pinned_position"
                component={AchievementPositions}
                title="Закріпити в відеогалерею на головній сторінці"
                achievementPositions={videoPositions}
                video={true}
                activePosition={video?.pinned_position}
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

export default EditVideoPage;
