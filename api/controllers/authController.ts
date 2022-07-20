import { getAuth } from "firebase-admin/auth";
import * as express from 'express';

export function signup(req: express.Request, res: express.Response) {
  const JWT_TOKEN: string = req.params.access_token;
  getAuth()
  .verifyIdToken(JWT_TOKEN)
  .then((decodedToken) => {
    const uid = decodedToken.uid;
    res.send({uid: uid});
  })
  .catch((error) => {
    // Handle error
  });
};
