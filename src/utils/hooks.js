import { useRef, useEffect, useState } from 'react';
import { convertToFormData } from './';

export function usePrevState(value) {
  const ref = useRef();
  useEffect(() => {
    ref.current = value;
  });
  return ref.current;
}

/* Control dialog box */
export function useDialog() {
  const [dialog, setDialog] = useState(void 0),
    [values, setValue] = useState({}),
    openDialog = (dialog = 'createNew', setStateData = {}) => {
      setDialog(dialog);
      setValue({ ...values, ...setStateData });
    };

  return {
    dialog,
    dialogValue: values,
    openDialog,
  };
}

/* Form input and submission control */

/* Form input and submission control */
export function useForm(submitAction) {
  const [values, setValue] = useState({}),
    getData = e => {
      setValue({
        ...values,
        [e.target.id]: e.target.value,
      });
    },
    setData = (field, data) => {
      setValue({
        ...values,
        [field]: data,
      });
    },
    check = e => {
      setValue({
        ...values,
        [e.target.id]: e.target.checked,
      });
    },
    getFile = e => {
      setValue({
        ...values,
        [e.target.id]: e.target.files[0],
      });
    },
    submit = e => {
      e.preventDefault();
      submitAction();
    },
    setDefault = defaultValues => {
      setValue({ ...values, ...defaultValues });
    },
    formData = () => {
      return convertToFormData(values);
    };

  return {
    values,
    getData,
    setData,
    check,
    submit,
    getFile,
    setDefault,
    formData,
  };
}

export function useToast() {
  const [toastMessage, setToastMessage] = useState(void 0),
    toggleToast = (showToast = true) => {
      setToastMessage(showToast);
    };

  return { toastMessage, toggleToast };
}
