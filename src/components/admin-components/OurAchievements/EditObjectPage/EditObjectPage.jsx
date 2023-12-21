import { useState, useEffect } from 'react';
import { Formik, Form, Field } from 'formik';
import { useNavigate, useParams } from 'react-router-dom';
import { achievementsValidation } from '@/components/admin-components/OurAchievements/validationSchema';
import useServicesStore from '@/store/serviseStore';
import PageTitle from '@/components/admin-components/PageTitle/PageTitle';
import TextArea from '@/components/admin-components/formik/TextArea/TextArea';
import MyFileInput from '@/components/admin-components/OurAchievements/FileInput/MyFileInput';
import ButtonSubmit from '@/components/admin-components/Buttons/SubmitButton/ButtonSubmit';
import CustomTitle from '@/components/admin-components/OurAchievements/CustomTitle/CustomTitle';
import AchievementPositions from '@/components/admin-components/OurAchievements/AchievementPositions/AchievementsPositions'; // Замініть шлях на реальний
import BreadCrumbs from '@/components/admin-components/BreadCrumbs/BreadCrumbs';
import s from '../../../../pages/admin-pages/OurAchievementsAdmin/AchievementsAdmin.module.scss';

const initialValues = {
  pinned_position: '',
  sub_department: '',
  description: '',
  media: null,
};

const EditObjectPage = ({ url, pageTitle, backButtonLink, achievementPositionsTitle, selectTitle }) => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { getAchievementsPositions, getAchievemenById, editAchievement } =
    useServicesStore();
  const [achievementPositions, setAchievementsPositions] = useState({});
  const [currentAchievement, setCurrentAchievement] = useState({});
  const title = selectTitle;
  const [isProcessing, setIsProcessing] = useState(false);

  let breadcrumbs;
  const setBreadcrumbs = url => {
    if (url === 'achievements') {
      breadcrumbs = ['Наші Досягнення', 'Редагувати _id'];
    } else if (url === 'gallery') {
      breadcrumbs = ['Фотогалерея', 'Редагувати _id'];
    }
    return breadcrumbs;
  };
  setBreadcrumbs(url);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await getAchievementsPositions(url);
        setAchievementsPositions(result);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, [getAchievementsPositions, url]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await getAchievemenById(url, id);
        setCurrentAchievement(result);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, [getAchievemenById, id, url]);

  const onSubmit = async (values, formikBag) => {
    try {
      const updatedValues = {
        ...values,
        sub_department: currentAchievement.sub_department,
      };
      setIsProcessing(true);
      await editAchievement(url, id, updatedValues);
      setIsProcessing(false);
      formikBag.resetForm();
      navigate(`/admin/${url}`);
    } catch (error) {
      console.error(error);
      setIsProcessing(false);
    }
  };

  return (
    <div className={s.container}>
      <BreadCrumbs breadcrumbs={breadcrumbs} />
      <PageTitle
        title={pageTitle}
        showBackButton={true}
        backButtonLink={backButtonLink}
        showActionButton={false}
      />
      <Formik
        initialValues={initialValues}
        validationSchema={achievementsValidation}
        onSubmit={onSubmit}
      >
        {formik => (
          <Form>
            <div className={s.selectBlock}>
              <CustomTitle title={title} width={'fixed'} />
            </div>

            <div className={s.form}>
              <div className={s.fieldSection}>
                <Field
                  name="description"
                  id="description"
                  component={TextArea}
                  maxLength={150}
                  showCharacterCount={true}
                  label="Опис"
                  text={currentAchievement.description}
                />
                <Field
                  name="media"
                  id="media"
                  component={MyFileInput}
                  label="Фото*"
                  photo={currentAchievement.media}
                />
              </div>
              <Field
                name="pinned_position"
                id="pinned_position"
                component={AchievementPositions}
                title={achievementPositionsTitle}
                achievementPositions={achievementPositions}
                activePosition={currentAchievement.pinned_position}
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

export default EditObjectPage;
