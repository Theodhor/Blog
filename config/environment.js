const port = process.env.PORT || 4000;
const env = process.env.NODE_ENV || 'dev';
const dbURI = `mongodb://localhost:27017/blog-${env}`;
const secret = '!a?/321AlK8£';

module.exports = { port, dbURI, secret };
