/* import express, { NextFunction, Request, Response } from 'express';

import { db, getAuth } from '@/firebase';

import { SignupReq, SignupRes, signupEndpoint, validateData } from '@common';

interface MyRequest extends Request {
  data?: SignupReq;
}

type User = {
  email: string;
};

const router = express.Router();

router.post(signupEndpoint, express.json(), myMiddleWare, myHandler);

async function myHandler(req: MyRequest, res: Response) {
  try {
    const data = req.data!;
    const userRecord = await getAuth().createUser({
      email: data.email,
      password: data.password,
    });
    const user: User = { email: data.email };
    await db.collection('users').add(user);
    const response: SignupRes = `created user with the email: ${userRecord.email}`;
    res.send(response);
  } catch (e) {
    console.log(e);
    res.send('handler error');
  }
}

function myMiddleWare(req: MyRequest, res: Response, next: NextFunction) {
  try {
    req.data = validateData(req.body);
    next();
  } catch (e) {
    res.send('validation error');
  }
}

export { router as authRouter };
 */
