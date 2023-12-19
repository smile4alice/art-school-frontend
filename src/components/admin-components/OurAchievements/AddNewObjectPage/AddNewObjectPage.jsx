import { useState, useEffect } from 'react';
import { Formik, Form, Field } from 'formik';
import { achievementsValidation } from '@/components/admin-components/OurAchievements/validationSchema';
import useServicesStore from '@/store/serviseStore';
import PageTitle from '@/components/admin-components/PageTitle/PageTitle';
import TextArea from '@/components/admin-components/formik/TextArea/TextArea';
import MyFileInput from '@/components/admin-components/OurAchievements/FileInput/MyFileInput';
import ButtonSubmit from '@/components/admin-components/Buttons/SubmitButton/ButtonSubmit';
import CustomTitle from '@/components/admin-components/OurAchievements/CustomTitle/CustomTitle';
import SelectAdminDouble from '@/components/admin-components/OurAchievements/SelectAdminDouble/SelectAdminDouble';
import AchievementPositions from '@/components/admin-components/OurAchievements/AchievementPositions/AchievementsPositions';
import s from '../../../../pages/admin-pages/OurAchievementsAdmin/AchievementsAdmin.module.scss'

const initialValues = {
  pinned_position: '',
  sub_department: '',
  description: '',
  media: null,
};

const AddNewObjectPage = ({pageTitle, backButtonLink, selectTitle, achievementPositionsTitle, url}) => {
  const { addAchievement, getAchievementsPositions } = useServicesStore();
  const [achievementPositions, setAchievementsPositions] = useState({});
  const [title, setTitle] = useState(selectTitle);
  const [isProcessing, setIsProcessing] = useState(false);

  const onSubmit = async (values, formikBag) => {
    try {
      setIsProcessing(true);
      await addAchievement(url, values);
      setIsProcessing(false);
      const result = await getAchievementsPositions(url);
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
        const result = await getAchievementsPositions(url);
        setAchievementsPositions(result);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, [getAchievementsPositions, url]);

  return (
    <div className={s.container}>
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
                  component={TextArea}
                  maxLength={150}
                  showCharacterCount={true}
                  label="Опис"
                />
                <Field
                  name="media"
                  id="media"
                  component={MyFileInput}
                  label="Фото*"
                />
              </div>

              <Field
                name="pinned_position"
                id="pinned_position"
                component={AchievementPositions}
                title={achievementPositionsTitle}
                achievementPositions={achievementPositions}
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

export default AddNewObjectPage;
