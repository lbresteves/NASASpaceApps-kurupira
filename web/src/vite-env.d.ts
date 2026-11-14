/// <reference types="vite/client" />

interface ImportMetaEnv {
  // Base URL of the Kurupira API, e.g. http://localhost:8000 (set in .env.local and on Vercel).
  readonly VITE_API_URL: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
