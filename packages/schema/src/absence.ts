import { z } from 'zod';

export const AbsenceSchema = z.object({
  id: z.string().uuid(),
  userId: z.string().uuid(),

  type: z.enum(['vacation', 'sick', 'remote', 'other']),
  reason: z.string().nullable(),

  startDate: z.string().date(),
  endDate: z.string().date(),

  // CRDT-friendly metadata
  createdAt: z.string().datetime(),
  updatedAt: z.string().datetime(),
});

export type Absence = z.infer<typeof AbsenceSchema>;
