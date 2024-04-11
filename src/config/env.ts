import { cache } from "react";
import { z } from "zod";

const serverSideEnvSchema = z.object({
  // API_TOKEN: z.string(),
});

function getServerSideEnvFn() {
  return serverSideEnvSchema.parse({
    // API_TOKEN: process.env.API_TOKEN,
  });
}

export const getServerSideEnv = cache(getServerSideEnvFn);

const clientSideEnvSchema = z.object({
  // NEXT_PUBLIC_API_URL: z.string(),
});

export function getClientSideEnv() {
  return clientSideEnvSchema.parse({
    // NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL,
  });
}
