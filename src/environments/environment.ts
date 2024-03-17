export const environment = {
  production: false
};

const apiMainUrl = 'http://localhost/easyFramework/';

export const appConfigurations = {
  // --- API ---
  // Auth
  authUrl: new URL('user/login', apiMainUrl),
  sesionVerify: new URL('user/verifyToken', apiMainUrl),
  userLogout: new URL('user/logout', apiMainUrl),
  // --- General ---
  applicationName: 'Dissof Dashboard',
  // --- LocalSorage ---
  userPreferences: 'userPreferences',
  jwtAuth: 'JwtAuth',
  authHeader: 'x-auth-token',
  userName: 'rememberMeUserName',
  // -- User --
  user: 'user',
}

