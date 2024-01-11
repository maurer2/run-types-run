export const fetchValues = async <T>(url: string): Promise<T> => {
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(response?.statusText || `Error fetching ${url}}`);
  }

  return response.json();
};
