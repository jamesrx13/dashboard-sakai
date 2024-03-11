export const environment = {
  production: false
};

const apiMainUrl = 'http://localhost/easyFramework/';

export const appConfigurations = {
  // --- API ---
  authUrl: new URL('user/login', apiMainUrl),
  // --- General ---
  // --- Auth ---
  // --- LocalSorage ---
  userPreferences: 'userPreferences',
  jwtAuth: 'JwtAuth',
  authHeader: 'x-auth-token',
}

