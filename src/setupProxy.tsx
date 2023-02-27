
const proxy = require("http-proxy-middleware");
const morgan = require("morgan");

module.exports = app => {
  app.use(
    "/data",
    proxy({
      target: "http://192.168.69.75/data",
      changeOrigin: true,
      pathRewrite: {
        "^/api": "/api/v1"
      }
    })
  );

  app.use(morgan('combined'));
};