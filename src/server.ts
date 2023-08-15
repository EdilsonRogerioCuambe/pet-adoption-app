import { app } from './app'
import { env } from './env'

app
  .listen({
    port: env.PORT,
    host: '127.0.0.1',
  })
  .then(() => console.log('🚀 Server is running🚀'))
  .catch((err) => console.log(err))
