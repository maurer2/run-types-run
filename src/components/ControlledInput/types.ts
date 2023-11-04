export type ControlledInputProps = {
  label: string;
  onChange: (value: string) => void;
  type?: 'number' | 'text';
  value: string;
};
