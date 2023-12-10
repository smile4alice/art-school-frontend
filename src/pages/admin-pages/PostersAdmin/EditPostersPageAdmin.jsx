import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import TextInput from '@/components/admin-components/formik/TextInput/TextInput';
import TextArea from '@/components/admin-components/formik/TextArea/TextArea';

import FileInput from '@/components/admin-components/formik/FileInput/FileInput';
import { useEffect, useState } from 'react';
import usePostersStore from '@/store/posterStore';
import { useParams } from 'react-router';
// import FormikContainer from '@/components/admin-components/formik/FormikContainer';

const validationSchema = Yup.object({
  // title: Yup.string().required('Yup Required').max(10),
});

const initialValues = {
  title: '',
  text: '',
  image: [],
};

const EditPostersPage = () => {
  const { id } = useParams();
  const { getPostersById } = usePostersStore();
  const [poster, setPoster] = useState();
  console.log('poster: ', poster);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await getPostersById(id);

        setPoster(result);

        initialValues.title = result.title;
        initialValues.photo = result.photo;
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, [getPostersById, id]);

  // useEffect(() => {
  //   initialValues.title = poster.title;
  //   initialValues.photo = poster.photo;
  // }, [poster]);
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

export default EditPostersPage;
