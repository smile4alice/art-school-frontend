import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import TextInput from '@/components/admin-components/formik/TextInput/TextInput';
import TextArea from '@/components/admin-components/formik/TextArea/TextArea';

import FileInput from '@/components/admin-components/formik/FileInput/FileInput';
// import FormikContainer from '@/components/admin-components/formik/FormikContainer';

const validationSchema = Yup.object({
  // title: Yup.string().required('Yup Required').max(10),
});

const initialValues = {
  title: '',
  text: '',
  image: [],
};

const EditNewsPage = () => {
  const onSubmit = values => {
    console.log(values);
  };

  return (
    // <FormikContainer />
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={onSubmit}
    >
      <Form>
        <div className="formControl">
          <Field
            name="title"
            id="title"
            placeholder="Title"
            component={TextInput}
            maxLength={10}
            showCharacterCount={true}
          />
        </div>
        <div className="formControl">
          <Field
            name="text"
            id="title"
            placeholder="Title"
            component={TextArea}
          />
        </div>
        <div className="formControl">
          <Field name="image" id="image" component={FileInput} />
        </div>
        <button type="submit">Submit</button>
      </Form>
    </Formik>
  );
};

export default EditNewsPage;
