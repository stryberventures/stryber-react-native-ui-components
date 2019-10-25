import {useState} from 'react';

export const customHooks = {
  useForm(initialValues) {
    const [values, setValues] = useState(initialValues);

    return [
      values,
      ({name, text}) => {
        setValues({
          ...values,
          [name]: text,
        });
      },
    ];
  },
};
