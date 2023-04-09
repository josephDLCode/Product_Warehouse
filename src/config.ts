import { registerAs } from '@nestjs/config'

export default registerAs('database', () => ({
  database: {
    dbname: process.env.DB_NAME,
    dbhost: process.env.DB_HOST,
    dbport: process.env.DB_PORT,
    dbuser: process.env.DB_USER,
    dbpass: process.env.DB_PASS
  }
}))
