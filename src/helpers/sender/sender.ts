import { stringify } from 'qs';
import type { FormValues } from "../../types/pizza";

export const sender = async (url: string, payload: FormValues) => {
  const payloadAsString = stringify(payload, {
    arrayFormat: 'brackets',
  });

  const request = {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8' },
    body: new URLSearchParams(payloadAsString),
  } satisfies RequestInit;

  const response = await fetch(url, request);

  if (!response.ok) {
    throw new Error(response?.statusText || `Error sending to ${url}}`);
  }

  return response.json();
};
