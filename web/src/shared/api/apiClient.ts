const API_URL = import.meta.env.VITE_API_URL;

export const buildApiUrl = (path: string) => {
  if (!API_URL) {
    throw new Error('VITE_API_URL is not set (web/.env.local locally, Environment Variables on Vercel).');
  }
  return `${API_URL}${path}`;
};

export const apiGet = async <T>(path: string, signal?: AbortSignal): Promise<T> => {
  const response = await fetch(buildApiUrl(path), { signal });
  if (!response.ok) {
    throw new Error(`GET ${path} failed with status ${response.status}`);
  }
  return response.json() as Promise<T>;
};
