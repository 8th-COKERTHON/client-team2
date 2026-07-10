const apiBaseUrl = import.meta.env.VITE_API_BASE_URL;

if (!apiBaseUrl) {
  console.warn("VITE_API_BASE_URL is not configured.");
}

export const env = {
  apiBaseUrl,
} as const;
