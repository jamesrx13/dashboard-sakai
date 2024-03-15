export const environment = {
  production: false
};

const apiMainUrl = 'http://localhost/easyFramework/';

export const appConfigurations = {
  // --- API ---
  authUrl: new URL('user/login', apiMainUrl),
  sesionVerify: new URL('user/verifyToken', apiMainUrl),
  // --- General ---
  applicationName: 'Dissof Dashboard',
  // --- Auth ---
  // --- LocalSorage ---
  userPreferences: 'userPreferences',
  jwtAuth: 'JwtAuth',
  authHeader: 'x-auth-token',
  // -- User --
  user: 'user',
}

