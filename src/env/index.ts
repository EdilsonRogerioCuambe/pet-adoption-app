import 'dotenv/config'
import { z } from 'zod'

const envSchema = z.object({
  NODE_ENV: z.enum(['dev', 'prod', 'test']).default('dev'),
  PORT: z.coerce.number().default(3333),
})

const _env = envSchema.safeParse(process.env)

if (!_env.success) {
  console.log(
    '❌  Environment variables validation error ❌',
    '\n',
    _env.error.format(),
  )
  throw new Error(_env.error.message)
}

export const env = _env.data
