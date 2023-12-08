import { useFormik } from 'formik';

const EditNewsPage = () => {
  const formik = useFormik({
    initialValues: {
      title: '',
    },
    onSubmit: values => {
      console.log(values);
    },
    validate: values => {
      let errors = {};
      if (!values.title) {
        errors.title = 'Required';
      }
      return errors;
    },
  });


  return (
    <form onSubmit={formik.handleSubmit}>
      <div className="formControl">
        <label htmlFor="title">Title</label>
        <input
          type="text"
          name="title"
          id="title"
          onChange={formik.handleChange}
          value={formik.values.title}
        />
        {formik.errors.title && <p>{formik.errors.title}</p>}
      </div>
      <button type="submit">Submit</button>
    </form>
  );
};

export default EditNewsPage;
