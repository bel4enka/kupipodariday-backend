export default () => ({
  port: parseInt(process.env.PORT) || 3001,
  db: {
    type: 'postgres',
    database: 'nest_project',
    host: process.env.DATABASE_HOST || 'localhost',
    port: parseInt(process.env.DATABASE_PORT) || 5432,
    username: 'student',
    password: 'student',
    databaseName: 'nest_project',
  },
  jwtSecret: 'jwt_secret',
  YANDEX_CLIENT_ID: '2e95207defc141abb7c86c24366044f5',
  YANDEX_CLIENT_SECRET: '9dc222311d7c4521b0ba0345fd065cbd',
  YANDEX_REDIRECT_URI: 'http://localhost:3000/oauth/callback',
});
