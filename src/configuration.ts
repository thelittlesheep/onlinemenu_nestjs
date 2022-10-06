export default () => ({
  port: parseInt(process.env.PORT, 10) || 3000,
  database: {
    host: process.env.DB_host,
    port: parseInt(process.env.DB_port, 10) || 5432,
  },
});
