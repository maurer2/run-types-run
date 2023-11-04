export type Sending = {
  payload?: unknown;
  status: 'sending';
};

export type Success = {
  status: 'success';
};

export type Fail = {
  errors: string;
  status: 'fail';
};

