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
  //User
  userChangePassword: new URL('user/changeMyPassword', apiMainUrl),
  userList: new URL('user/list/', apiMainUrl),
  updateUser: new URL('user/updateUser', apiMainUrl),
  userEdit: new URL('user/updateMyUser', apiMainUrl),
  userChangeStatus: new URL('user/changeStatus', apiMainUrl),
  customUserChangePassword: new URL('user/changeUserPassword', apiMainUrl),
  userRolesList: new URL('user/rolesInformation', apiMainUrl),
  createNewUser: new URL('user/registerCustomUser', apiMainUrl),
  listMyCustomsTokens: new URL('user/getMyCustomsTokens/', apiMainUrl),
  changeTokenStatus: new URL('user/tokenChangeStatus', apiMainUrl),
  deleteCustomToken: new URL('user/deleteToken', apiMainUrl),
  listInformationToken: new URL('user/tokensInformation', apiMainUrl),
  createCustomToken: new URL('user/generateToken', apiMainUrl),
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

