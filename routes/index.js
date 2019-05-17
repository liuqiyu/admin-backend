'use strict';
import createError from 'http-errors';
import users from './users';
import upload from './upload';

export default app => {
  /**
   *  自己的路由
   */
  app.use('/users', users);
  app.use('/upload', upload);


  // catch 404 and forward to error handler
  app.use((req, res, next) => {
    next(createError(404));
  });

// error handler
  app.use((err, req, res, next) => {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
  });
}
