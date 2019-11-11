import { MsalAuthProvider, LoginType } from 'react-aad-msal';
 
const config = {
  auth: {
    authority: 'https://login.microsoftonline.com/common',
    clientId: '931648a6-caf0-406e-88f6-39618a23d85b',
  },
  cache: {
    cacheLocation: "localStorage",
    storeAuthStateInCookie: true
  }
};
 
const authenticationParameters = {
  scopes: [
    'property user.read',
    'https://sotonac.onmicrosoft.com/comp3207-twitter-janu/user.read'
  ]
}
 
export const authProvider = new MsalAuthProvider(config, authenticationParameters, LoginType.Redirect)