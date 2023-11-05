export type UncontrolledRadioCheckboxProps<T> = {
  label?: string;
  name: string;
  type: 'checkbox' | 'radio';
  values: T;
};
