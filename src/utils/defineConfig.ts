import { z } from "zod";

export const defineConfigSchema = z.object({
  debug: z.boolean().optional(),
  lang: z.enum(["ja", "en"]).optional(),
  customOptions: z.record(z.string(), z.any()).optional(),
});

export type DefineConfig = z.infer<typeof defineConfigSchema>;
