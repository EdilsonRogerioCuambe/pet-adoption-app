import { app } from "./app";

app.listen({
  port: 3333,
  host: '127.0.0.1'
}).then(() => console.log('🚀Server is running🚀')).catch(err => console.log(err));