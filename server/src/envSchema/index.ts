import dotenv from 'dotenv';
dotenv.config();

import { ZodFormattedError } from 'zod';

import { envSchema } from './schema';

const _env = envSchema.safeParse(process.env);

export const formatErrors = (
  errors: ZodFormattedError<Map<string, string>, string>
) =>
  Object.entries(errors)
    .map(([name, value]) => {
      if (value && '_errors' in value)
        return `${name}: ${value._errors.join(', ')}\n`;

      return;
    })
    .filter(Boolean);

if (!_env.success) {
  console.error(
    '❌ Invalid environment variables:\n',
    ...formatErrors(_env.error.format())
  );
  throw new Error('Invalid environment variables');
}

const env = _env.data;

export default env;
