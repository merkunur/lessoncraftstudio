module.exports = ({ env }) => ({
  connection: {
    client: 'postgres',
    connection: {
      host: env('DATABASE_HOST', 'postgres'),
      port: env.int('DATABASE_PORT', 5432),
      database: env('DATABASE_NAME', 'lessoncraftstudio'),
      user: env('DATABASE_USERNAME', 'lcsuser'),
      password: env('DATABASE_PASSWORD', 'lcspass123!'),
      ssl: env.bool('DATABASE_SSL', false),
    },
  },
});