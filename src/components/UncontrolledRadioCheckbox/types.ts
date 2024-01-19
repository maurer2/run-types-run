export type UncontrolledRadioCheckboxProps<T extends string[]> = {
  label: string;
  name: string;
  options: T;
  type: 'checkbox' | 'radio';
};
