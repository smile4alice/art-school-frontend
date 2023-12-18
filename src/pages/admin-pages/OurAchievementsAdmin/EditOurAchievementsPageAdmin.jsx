import { useState, useEffect } from 'react';
import { Formik, Form, Field } from 'formik';
import { achievementsValidation } from './validationSchema';
import { useParams } from 'react-router-dom';
import useServicesStore from '@/store/serviseStore';
import PageTitle from '@/components/admin-components/PageTitle/PageTitle';
import TextArea from '@/components/admin-components/formik/TextArea/TextArea';
import FileInput from '@/components/admin-components/formik/FileInput/FileInput';
import ButtonSubmit from '@/components/admin-components/Buttons/SubmitButton/ButtonSubmit';
import CustomTitle from '@/components/admin-components/OurAchievements/CustomTitle/CustomTitle';
import AchievementPositions from '@/components/admin-components/OurAchievements/AchievementPositions/AchievementsPositions'; // Замініть шлях на реальний
import s from './AchievementsAdmin.module.scss';

const EditOurAchievementsPage = () => {
  const { id } = useParams();
  const { getAchievementsPositions, getAchievemenById, editAchievement } =
    useServicesStore();
  const [achievementPositions, setAchievementsPositions] = useState({});
  const [currentAchievement, setCurrentAchievement] = useState({});
  const title = 'Всі досягнення';
  const [isProcessing, setIsProcessing] = useState(false);
  useEffect(() =>{

  },[currentAchievement])
  const onSubmit = async (values, formikBag) => {
    try {
      setIsProcessing(true);
      await editAchievement(values);
      setIsProcessing(false);
      const result = await getAchievementsPositions();
      setAchievementsPositions(result);
      formikBag.resetForm();
    } catch (error) {
      console.error(error);
      setIsProcessing(false);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await getAchievemenById('achievements/', id);
        setCurrentAchievement(result);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, [getAchievemenById, id]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await getAchievementsPositions();
        setAchievementsPositions(result);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, [getAchievementsPositions]);

  return (
    <div className={s.container}>
      <PageTitle
        title="Додати досягнення"
        showBackButton={true}
        backButtonLink="/admin/achievements"
        showActionButton={false}
      />
      <Formik
        initialValues={{
          pinned_position: currentAchievement.pinned_position || '',
          sub_department: currentAchievement.sub_department || '',
          description: currentAchievement.description || '',
          media: currentAchievement.media || null,
        }}
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
                  component={FileInput}
                  label="Фото*"
                  media={currentAchievement.media}
                />
              </div>
              <Field
                key={formik.values.pinned_position}
                name="pinned_position"
                render={({ field }) => (
                  <AchievementPositions
                    data={achievementPositions}
                    title="Закріпити в блок “Наші досягнення на головній сторінці”"
                    selectedPosition={3}
                    onPositionChange={value =>
                      formik.setFieldValue(field.name, value)
                    }
                  />
                )}
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

export default EditOurAchievementsPage;

/*
import { useState, useEffect } from 'react';
import { Formik, Form, Field } from 'formik';
import { achievementsValidation } from './validationSchema';
import { useParams } from 'react-router-dom';
import useServicesStore from '@/store/serviseStore';
import PageTitle from '@/components/admin-components/PageTitle/PageTitle';
import TextArea from '@/components/admin-components/formik/TextArea/TextArea';
import FileInput from '@/components/admin-components/formik/FileInput/FileInput';
import ButtonSubmit from '@/components/admin-components/Buttons/SubmitButton/ButtonSubmit';
import CustomTitle from '@/components/admin-components/OurAchievements/CustomTitle/CustomTitle';
import AchievementPositions from '@/components/admin-components/OurAchievements/AchievementPositions/AchievementsPositions';
import BreadCrumbs from '@/components/admin-components/BreadCrumbs/BreadCrumbs';
import s from './AchievementsAdmin.module.scss';

const breadcrumbs = ['Досягнення', 'Редагувати Досягнення'];



const EditOurAchievementsPage = () => {
  const { id } = useParams();
  const { getAchievementsPositions, getAchievemenById, editAchievement } =
    useServicesStore();
  const [achievementPositions, setAchievementsPositions] = useState({});
  const [currentAchievement, setCurrentAchievement] = useState({});
  const title = 'Всі досягнення';
  const [isProcessing, setIsProcessing] = useState(false);

  const onSubmit = async (values ) => {//,formikBag
    try {
      setIsProcessing(true);
      await editAchievement(id, values);
      setIsProcessing(false);
      const result = await getAchievementsPositions();
      setAchievementsPositions(result);
     // formikBag.resetForm();
    } catch (error) {
      console.error(error);
      setIsProcessing(false);
    }
  };
  //отримання конкретного досягнення для зміни
  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await getAchievemenById('achievements/', id);
        setCurrentAchievement(result);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, [getAchievemenById, id]);

  console.log(currentAchievement);
  //отримання позиціонування досягнень на головній сторінці
  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await getAchievementsPositions();
        setAchievementsPositions(result);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, [getAchievementsPositions]);

  return (
    <div className={s.container}>
      <BreadCrumbs breadcrumbs={breadcrumbs} />
      <PageTitle
        title="Додати досягнення"
        showBackButton={true}
        backButtonLink="/admin/achievements"
        showActionButton={false}
      />
      <Formik
        initialValues={{
          pinned_position: currentAchievement.pinned_position || '',
          sub_department: currentAchievement.sub_department || '',
          description: currentAchievement.description || '',
          media: currentAchievement.media || null,
        }}
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
                  placeholder="Title"
                  component={TextArea}
                  maxLength={150}
                  showCharacterCount={true}
                  label="Опис"
                  text={currentAchievement.description}
                />
                <Field
                  name="media"
                  id="media"
                  component={FileInput}
                  label="Фото*"
                  media={currentAchievement.media}
                />
              </div>

              <AchievementPositions
                data={achievementPositions}
                activePosition={formik.values.pinned_position}
                title={
                  'Закріпити в блок “Наші досягнення на головній сторінці”'
                }
                formik={formik}
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

export default EditOurAchievementsPage;

*/
/*
import { useState, useEffect } from 'react';
import { Formik, Form, Field } from 'formik';
import { achievementsValidation } from './validationSchema';
import { useParams } from 'react-router-dom';
import useServicesStore from '@/store/serviseStore';
import PageTitle from '@/components/admin-components/PageTitle/PageTitle';
import TextArea from '@/components/admin-components/formik/TextArea/TextArea';
import FileInput from '@/components/admin-components/formik/FileInput/FileInput';
import ButtonSubmit from '@/components/admin-components/Buttons/SubmitButton/ButtonSubmit';
import CustomTitle from '@/components/admin-components/OurAchievements/CustomTitle/CustomTitle';
import AchievementPositions from '@/components/admin-components/OurAchievements/AchievementPositions/AchievementsPositions';
import BreadCrumbs from '@/components/admin-components/BreadCrumbs/BreadCrumbs';
import s from './AchievementsAdmin.module.scss';

const breadcrumbs = ['Досягнення', 'Редагувати Досягнення'];


const EditOurAchievementsPage = () => {
  const { id } = useParams();
  const { getAchievementsPositions, getAchievemenById, editAchievement } =
    useServicesStore();
  const [achievementPositions, setAchievementsPositions] = useState({});
  const [currentAchievement, setCurrentAchievement] = useState({});
  const title = 'Всі досягнення';
  const [isProcessing, setIsProcessing] = useState(false);

  const onSubmit = async (values ) => {//,formikBag
    try {
      setIsProcessing(true);
      await editAchievement(id, values);
      setIsProcessing(false);
      const result = await getAchievementsPositions();
      setAchievementsPositions(result);
     // formikBag.resetForm();
    } catch (error) {
      console.error(error);
      setIsProcessing(false);
    }
  };
  //отримання конкретного досягнення для зміни
  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await getAchievemenById('achievements/', id);
        setCurrentAchievement(result);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, [getAchievemenById, id]);

  console.log(currentAchievement);
  //отримання позиціонування досягнень на головній сторінці
  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await getAchievementsPositions();
        setAchievementsPositions(result);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, [getAchievementsPositions]);

  return (
    <div className={s.container}>
      <BreadCrumbs breadcrumbs={breadcrumbs} />
      <PageTitle
        title="Додати досягнення"
        showBackButton={true}
        backButtonLink="/admin/achievements"
        showActionButton={false}
      />
      <Formik
        initialValues={{
          pinned_position: currentAchievement.pinned_position || '',
          sub_department: currentAchievement.sub_department || '',
          description: currentAchievement.description || '',
          media: currentAchievement.media || null,
        }}
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
                  placeholder="Title"
                  component={TextArea}
                  maxLength={150}
                  showCharacterCount={true}
                  label="Опис"
                  text={currentAchievement.description}
                />
                <Field
                  name="media"
                  id="media"
                  component={FileInput}
                  label="Фото*"
                  media={currentAchievement.media}
                />
              </div>

              <AchievementPositions
                data={achievementPositions}
                activePosition={formik.values.pinned_position}
                title={
                  'Закріпити в блок “Наші досягнення на головній сторінці”'
                }
                formik={formik}
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

export default EditOurAchievementsPage;
*/
