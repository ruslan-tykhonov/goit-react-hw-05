import { Field, Formik, Form } from "formik";

export default function SearchBar({ handleChangeQuery }) {
  const onSubmit = (values, actions) => {
    handleChangeQuery(values.query);
    actions.resetForm();
  };

  const initialValues = { query: "" };

  return (
    <Formik initialValues={initialValues} onSubmit={onSubmit}>
      <Form>
        <Field name="query"></Field>
        <button type="submit">Search</button>
      </Form>
    </Formik>
  );
}
