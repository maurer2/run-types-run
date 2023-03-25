export type ControlledInputProps = {
  label: string;
  value: string;
  type?: 'text' | 'number';
  onChange: (value: string) => void;
};
