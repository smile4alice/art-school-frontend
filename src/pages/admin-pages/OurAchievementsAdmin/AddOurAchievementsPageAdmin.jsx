import { useState } from 'react';
import { Formik, Form, Field } from 'formik';
import { newsValidation } from './validationSchema';
import useServicesStore from '@/store/serviseStore';
import PageTitle from '@/components/admin-components/PageTitle/PageTitle';
import TextInput from '@/components/admin-components/formik/TextInput/TextInput';
import TextArea from '@/components/admin-components/formik/TextArea/TextArea';
import FileInput from '@/components/admin-components/formik/FileInput/FileInput';
import ButtonSubmit from '@/components/admin-components/Buttons/SubmitButton/ButtonSubmit';
import SelectAdminDouble from '@/components/admin-components/OurAchievements/SelectAdminDouble/SelectAdminDouble';
import CustomTitle from '@/components/admin-components/OurAchievements/CustomTitle/CustomTitle';
import s from './AchievementsAdmin.module.scss';


const initialValues = {
  title: '',
  text: '',
  image: [],
};

const AddOurAchievementsPage = () => {
  const { addAchievement } = useServicesStore();
  const [departmentId, setDepartmentId] = useState('1');
  const [title, setTitle] = useState('Всі досягнення')
  const [isProcessing, setIsProcessing] = useState(false);
  console.log(departmentId);

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

  return (
    <div>
      <PageTitle
        title="Додати досягнення"
        showBackButton={true}
        backButtonLink="/admin/achievements"
        showActionButton={false}
      />
      <div className={s.selectBlock}>
        <CustomTitle title={title} width={'fixed'}/>
        <SelectAdminDouble changeDepartment={changeDepartment}/>
      </div>
      <Formik
        initialValues={initialValues}
        validationSchema={newsValidation}
        onSubmit={onSubmit}
      >
        {formik => {
          return (
            <Form>
              <div className={s.layout}>
                <Field
                  name="title"
                  id="title"
                  placeholder="Title"
                  component={TextInput}
                  maxLength={120}
                  showCharacterCount={true}
                  label="Заголовок Новини"
                />
                <div className={s.secondRow}>
                  <Field
                    name="text"
                    id="text"
                    placeholder="Title"
                    component={TextArea}
                    maxLength={2000}
                    showCharacterCount={true}
                    label="Текст Новини"
                  />
                  <Field
                    name="image"
                    id="image"
                    component={FileInput}
                    label="Фото"
                  />
                </div>
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
