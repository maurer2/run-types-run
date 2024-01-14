export type Idle = {
  status: 'idle';
};

export type Pending = {
  status: 'pending';
};

export type Success = {
  payload?: unknown;
  status: 'success';
};

export type Fail = {
  error: unknown;
  status: 'error';
};
