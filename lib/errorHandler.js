function errorHandler(err, req, res, next) { // must have 4 args
  let status = 500;
  let message = err.message;
  let errors = null;

  if(err.message === 'Unauthorized') status = 401;
  if(err.message === 'Not Found') status = 404;
  if(err.name === 'CastError') {
    status = 404;
    message = 'Not Found';
  }
  if(err.name === 'JsonWebTokenError') status = 400;
  if(err.name === 'ValidationError') {
    status = 422;
    errors = {};
    message = 'Form validation failed';
    for(const field in err.errors) {
      errors[field] = err.errors[field].message;
    }
  }

  res.status(status).json({ message: message, errors });
  next(err); // error will now display on the terminal as well.
}

module.exports = errorHandler;
