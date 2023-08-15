import { registerAs } from "@nestjs/config";

export default registerAs("db", () => ({
  isGlobal: true,
  default: "mysql",
  connections: {
    mysql: {
      client: 'mysql2',
      debug: !!+process.env.DB_DEBUG,
      connection: {
        host: 'localhost',
        port: 3306,
        database: 'job_portal',
        user:  'root',
        password: 'pabitra1234',
        charset: 'utf8',
      },
        migrations: {
          directory: './database/migrations'
        },
      useNullAsDefault: true,
    }
  },
}));


