import {useState} from 'react';

export const customHooks = {
  useForm(initialValues) {
    const [values, setValues] = useState(initialValues);

    return [
      values,
      (value, name) => {
        console.log(value);
        setValues({
          ...values,
          [name]: value,
        });
      },
    ];
  },
};
