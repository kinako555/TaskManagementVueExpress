const { initializeApp, getAuth } = require('firebase-admin/app');
const app = initializeApp();
getAuth()

export function signup(req, res) {
  const JWT_TOKEN: string = req.body.access_token;
};