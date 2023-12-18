import { useState, useEffect } from 'react';
import { Formik, Form, Field } from 'formik';
import { achievementsValidation } from './validationSchema';
import useServicesStore from '@/store/serviseStore';
import PageTitle from '@/components/admin-components/PageTitle/PageTitle';
import TextArea from '@/components/admin-components/formik/TextArea/TextArea';
import FileInput from '@/components/admin-components/formik/FileInput/FileInput';
import ButtonSubmit from '@/components/admin-components/Buttons/SubmitButton/ButtonSubmit';
import CustomTitle from '@/components/admin-components/OurAchievements/CustomTitle/CustomTitle';
import SelectAdminDouble from '@/components/admin-components/OurAchievements/SelectAdminDouble/SelectAdminDouble';
import AchievementPositions from '@/components/admin-components/OurAchievements/AchievementPositions/AchievementsPositions';
import s from './AchievementsAdmin.module.scss';

const initialValues = {
  pinned_position: '',
  sub_department: '',
  description: '',
  media: null,
};

const AddOurAchievementsPage = () => {
  const { addAchievement, getAchievementsPositions } = useServicesStore();
  const [achievementPositions, setAchievementsPositions] = useState({});
  const [title, setTitle] = useState('Всі досягнення');
  const [isProcessing, setIsProcessing] = useState(false);

  
  const onSubmit = async values => {
    //formikBag
    try {
      setIsProcessing(true);
      await addAchievement(values);
      setIsProcessing(false);
      const result = await getAchievementsPositions();
      setAchievementsPositions(result);
      // formikBag.resetForm();обнулення даних форми
    } catch (error) {
      console.error(error);
      setIsProcessing(false);
    }
  };

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
        initialValues={initialValues}
        validationSchema={achievementsValidation}
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
              <div className={s.fieldSection}>
                <Field
                  name="description"
                  id="description"
                  placeholder="Title"
                  component={TextArea}
                  maxLength={2000}
                  showCharacterCount={true}
                  label="Опис"
                />
                <Field
                  name="media"
                  id="media"
                  component={FileInput}
                  label="Фото*"
                />
              </div>

              <AchievementPositions
                data={achievementPositions}
                title={
                  'Закріпити в блок “Наші досягнення на головній сторінці”'
                }
                formik={formik}
                // onUpdatePinnedPosition={updatePinnedPosition}
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

export default AddOurAchievementsPage;

/*
import { useState, useEffect } from 'react';
import { Formik, Form, Field } from 'formik';
import { achievementsValidation } from './validationSchema';
import useServicesStore from '@/store/serviseStore';
import PageTitle from '@/components/admin-components/PageTitle/PageTitle';
import TextArea from '@/components/admin-components/formik/TextArea/TextArea';
import FileInput from '@/components/admin-components/formik/FileInput/FileInput';
import ButtonSubmit from '@/components/admin-components/Buttons/SubmitButton/ButtonSubmit';
import CustomTitle from '@/components/admin-components/OurAchievements/CustomTitle/CustomTitle';
import SelectAdminDouble from '@/components/admin-components/OurAchievements/SelectAdminDouble/SelectAdminDouble';
import AchievementPositions from '@/components/admin-components/OurAchievements/AchievementPositions/AchievementsPositions';
import s from './AchievementsAdmin.module.scss';

const initialValues = {
  pinned_position: '',
  sub_department: '',
  description: '',
  media: null,
};

const AddOurAchievementsPage = () => {
  const { addAchievement, getAchievementsPositions } = useServicesStore();
  const [achievementPositions, setAchievementsPositions] = useState({});
  const [title, setTitle] = useState('Всі досягнення');
  const [isProcessing, setIsProcessing] = useState(false);

  const onSubmit = async (values, formikBag) => {
    try {
      setIsProcessing(true);
      await addAchievement(values);
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
        initialValues={initialValues}
        validationSchema={achievementsValidation}
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
              <div className={s.fieldSection}>
                <Field
                  name="description"
                  id="description"
                  placeholder="Title"
                  component={TextArea}
                  maxLength={2000}
                  showCharacterCount={true}
                  label="Опис"
                />
                <Field
                  name="media"
                  id="media"
                  component={FileInput}
                  label="Фото*"
                />
              </div>

              <AchievementPositions
                data={achievementPositions}
                title={
                  'Закріпити в блок “Наші досягнення на головній сторінці”'
                }
                formik={formik}
                // onUpdatePinnedPosition={updatePinnedPosition}
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

export default AddOurAchievementsPage;

*/
