const proxy = require('http-proxy-middleware');

module.exports = (app) => {
  app.use(proxy(['/api', '/auth'], { target: 'http://localhost:5001' }));
  //52.200.173.162
};
