import { z } from 'zod';

export const QuestionDataSchema = z.object({
    question: z.string(),
    options: z.array(z.string()).length(4),
    correctIndex: z.number().min(0).max(3),
    explanation: z.string(),
});

export type QuestionData = z.infer<typeof QuestionDataSchema>;
