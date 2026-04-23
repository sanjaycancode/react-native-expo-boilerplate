type RequiredEnvVar = "EXPO_PUBLIC_API_BASE_URL";

function getRequiredEnvVar(name: RequiredEnvVar): string {
  const value = process.env[name];

  if (!value) throw new Error(`Missing required environment variable: ${name}`);

  return value;
}

export const env = {
  apiBaseUrl: getRequiredEnvVar("EXPO_PUBLIC_API_BASE_URL"),
} as const;
