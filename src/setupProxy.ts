import { createProxyMiddleware } from 'http-proxy-middleware';
module.exports = function (app) {
    app.use(
        '/api',
        createProxyMiddleware({
            target: 'http://54.179.173.64:5024',
            //   target: 'https://prod.api.jumbotail.com',
            changeOrigin: true,
            pathRewrite: {
                '^/api': '',
            },
        })
    );
};
