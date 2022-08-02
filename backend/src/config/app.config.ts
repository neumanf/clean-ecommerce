export default () => ({
    env: process.env.NODE_ENV,
    frontendUrl: process.env.FRONTEND_URL,
    port: parseInt(process.env.PORT, 10) || 3001,
    database: {
        name: process.env.DB_NAME,
        host: process.env.DB_HOST,
        port: parseInt(process.env.DB_PORT, 10) || 5432,
        username: process.env.DB_USERNAME,
        password: process.env.DB_PASSWORD,
        testName: process.env.DB_TEST_NAME,
    },
    mail: {
        user: process.env.MAIL_AUTH_USER,
    },
    oauth: {
        clientId: process.env.OAUTH_CLIENTID,
        clientSecret: process.env.OAUTH_CLIENT_SECRET,
        accessToken: process.env.OAUTH_ACCESS_TOKEN,
        refreshToken: process.env.OAUTH_REFRESH_TOKEN,
    },
});
