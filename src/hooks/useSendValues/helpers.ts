export const sendValues = async <T>(url: string, payload: T) => {
  const request: RequestInit = {
    body: JSON.stringify(payload),
    headers: {
      'Content-Type': 'application/json',
    },
    method: 'POST',
  };

  const response = await fetch(url, request);

  if (!response.ok) {
    throw new Error(response?.statusText || `Error sending request to ${url}}`, {
      cause: await response.json(),
    });
  }

  return response.json();
};
