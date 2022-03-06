export type Fields = {
  field1: number,
  field2: number,
  field3: number,
};

export type FieldsStringified = Record<keyof Fields, string>
