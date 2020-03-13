import {useState} from 'react';
export const customHooks = {
  useForm(initialValues) {
    const [values, setValues] = useState(initialValues);
    return [
      values,
      (value, name) => {
        setValues({
          ...values,
          [name]: value,
        });
      },
    ];
  },
};
