import { z } from 'zod';

export const StatsSchema = z.object({
  id: z.string().uuid(),
  userId: z.string().uuid(),

  year: z.number().int(),
  month: z.number().int().min(1).max(12),

  totalAbsences: z.number().int(),
  vacationDays: z.number().int(),
  sickDays: z.number().int(),
  remoteDays: z.number().int(),
  otherDays: z.number().int(),

  updatedAt: z.string().datetime(),
});

export type Stats = z.infer<typeof StatsSchema>;
