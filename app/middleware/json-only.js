// Requires that all DELETE/PATCH/POST/PUT requests use application/json.
// This prevents CSRF attacks.
// https://github.com/pillarjs/understanding-csrf#use-only-json-apis

const jsonOnly = (req, _res, next) => {
  if (['GET', 'HEAD', 'OPTIONS'].includes(req.method) || req.originalUrl.includes('api/upload')) {
    return next();
  }

  const contentType = req.headers['content-type'];
  if (contentType && contentType.match(/^application\/json\b/)) {
    return next();
  }
  const error = new Error('Request must be Content-Type: application/json');
  error.status = 400;
  next(error);
};

module.exports = jsonOnly;
