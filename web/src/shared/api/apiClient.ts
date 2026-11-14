const API_URL = import.meta.env.VITE_API_URL;

// GET a JSON route of the Kurupira API: apiGet<IClock>('/clock').
export const apiGet = async <T>(path: string, signal?: AbortSignal): Promise<T> => {
  if (!API_URL) {
    throw new Error('VITE_API_URL is not set (web/.env.local locally, Environment Variables on Vercel).');
  }

  const response = await fetch(`${API_URL}${path}`, { signal });
  if (!response.ok) {
    throw new Error(`GET ${path} failed with status ${response.status}`);
  }
  return response.json() as Promise<T>;
};
