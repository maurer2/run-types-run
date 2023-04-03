export type Sending = {
  status: 'sending';
  payload?: unknown;
};

export type Success = {
  status: 'success';
};

export type Fail = {
  status: 'fail';
  errors: string;
};

