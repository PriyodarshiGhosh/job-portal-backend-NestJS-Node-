import { registerAs } from "@nestjs/config";

export default registerAs("db", () => ({
  isGlobal: true,
  default: "mysql",
  connections: {
    mysql: {
      client: 'mysql2',
      debug: !!+process.env.DB_DEBUG,
      connection: {
        host: process.env.DB_HOST,
        port: process.env.DB_PORT,
        database: process.env.DB_DATABASE,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        charset: 'utf8',
      },
        migrations: {
          directory: './database/migrations'
        },
      useNullAsDefault: true,
    }
  },
}));


