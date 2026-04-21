import { t } from "../trpc";

/**
 * Private procedure — currently a passthrough.
 * Authentication enforced at the API route level via Firebase token validation.
 */
export const privateProcedure = t.procedure;