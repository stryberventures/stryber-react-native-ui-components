import {useState} from 'react';

export const customHooks = {
  useForm(initialValues) {
    const [values, setValues] = useState(initialValues);

    return [
      values,
      ({name, value}) => {
        console.log(value);
        setValues({
          ...values,
          [name]: value,
        });
      },
    ];
  },
};
