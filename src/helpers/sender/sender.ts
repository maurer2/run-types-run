export const sender = async (url: string, { arg }: { arg: unknown }) => {
  const request = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(arg),
  } satisfies RequestInit;

  return fetch(url, request);
};
