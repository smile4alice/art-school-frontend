import { useState, useEffect } from 'react';
import { Formik, Form, Field } from 'formik';
import { newsValidation } from './validationSchema';
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
  description: '', //виправити
  text: '',
  image: [],
};

const AddOurAchievementsPage = () => {
  const { addAchievement, getAchievementsPositions } = useServicesStore();
  const [achievementPositions, setAchievementsPositions] = useState({});
  const [departmentId, setDepartmentId] = useState('1');
  const [title, setTitle] = useState('Всі досягнення');
  const [isProcessing, setIsProcessing] = useState(false);
  console.log(departmentId);
 // console.log(achievementPositions);

  const changeDepartment = (id, title) => {
    if (id !== undefined && id !== null) {
      setDepartmentId(id);
      setTitle(title);
    }
  };

  const onSubmit = async values => {
    try {
      setIsProcessing(true);
      await addAchievement(values);
      setIsProcessing(false);
    } catch (error) {
      console.log(error);
    }
  };
  //отримання даних щодо позиціонування досягнень на головній сторінці
  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await getAchievementsPositions()
        console.log(result);
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
      <div className={s.selectBlock}>
        <CustomTitle title={title} width={'fixed'} />
        <SelectAdminDouble changeDepartment={changeDepartment} />
      </div>
      <Formik
        initialValues={initialValues}
        validationSchema={newsValidation}
        onSubmit={onSubmit}
      >
        {formik => {
          return (
            <Form>
              <div className={s.form}>
                <div className={s.fieldSection}>
                  <Field
                    name="text"
                    id="text"
                    placeholder="Title"
                    component={TextArea}
                    maxLength={2000}
                    showCharacterCount={true}
                    label="Опис"
                  />
                  <Field
                    name="image"
                    id="image"
                    component={FileInput}
                    label="Фото*"
                  />
                </div>

                <AchievementPositions data={achievementPositions} title={'Закріпити в  блок “Наші досягнення на головній сторінці”'}/>

                <div className={s.button}>
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

export default AddOurAchievementsPage;
//  <AchievementPositions data={achievementPositions}/>