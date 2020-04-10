import {useState} from 'react';
export const customHooks = {
  useForm(initialValues: any) {
    const [values, setValues] = useState(initialValues);
    return [
      values,
      (value: any, name: string) => {
        setValues({
          ...values,
          [name]: value,
        });
      },
    ];
  },
};
