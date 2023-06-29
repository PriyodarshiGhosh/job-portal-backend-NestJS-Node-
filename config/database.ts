import { registerAs } from "@nestjs/config";

export default registerAs("db", () => ({
  isGlobal: true,
  default: "mysql",
  connections: {
    mysql: {
      client: 'mysql2',
      debug: !!+process.env.DB_DEBUG,
      connection: {
        host: process.env.DB_HOST || 'localhost',
        port: process.env.DB_PORT ||3306,
        database: process.env.DB_DATABASE||'job_portal',
        user: process.env.DB_USER || 'aryan',
        password: process.env.DB_PASSWORD ||'pabitra1234',
        charset: 'utf8',
      },
        migrations: {
          directory: './database/migrations'
        },
      useNullAsDefault: true,
    }
  },
}));


