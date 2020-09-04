module.exports = (app) => {
  app.post('/api/logout', (req: any, res: any) => {
    req.logout(); //kills cookie
    res.send(req.session.passport.user);
  });

  app.get('/api/current_user', (req: any, res: any) => {
    res.send(req.session.passport.user);
  });
};
