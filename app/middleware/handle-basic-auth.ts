import httpAuth from 'http-auth';
import path from 'path';

const handleBasicAuth = () => {
  // Basic Auth
  const basicAuth = httpAuth.basic({
    realm: 'TASTEUP',
    file: path.join(__dirname, '..', 'users.htpasswd'),
  });

  /* Logging http-auth in Production */
  basicAuth.on('success', (result, _log) => {
    console.log(`User Authentication Success: ${result.user}\n`, result);
  });

  basicAuth.on('fail', (result, _log) => {
    console.log(`User Authentication Failed: ${result.user}\n`, result);
  });

  basicAuth.on('error', (error, _log) => {
    console.log(`Authentication Error: ${error.code} - ${error.message}\n`, error);
  });

  return basicAuth;
};

export default handleBasicAuth;
