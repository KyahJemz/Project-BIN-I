import * as jwt from 'jsonwebtoken';
import { env } from '@/env.mjs';
import { NextRequest, NextResponse } from 'next/server';
import { AccountService } from '@/services/accounts.service';
import AccountModel from '@/models/accounts';

export function signJwt(payload: any) {
  return jwt.sign(payload, env.JWT_SECRET, {
    algorithm: 'HS256',
    expiresIn: env.JWT_EXP,
  });
}

export function verifyJwt(token: string) {
  try {
    const decode = jwt.verify(token, env.JWT_SECRET, {
      algorithms: ['HS256'],
    });
    return decode;
  } catch (error) {
    return error;
  }
}

export async function decodeJwt(token: string) {
  try {
    const decode = await jwt.decode(token);
    return decode;
  } catch (error) {
    return error;
  }
}

export async function validateRequest(req: NextRequest) {
  const accountService = new AccountService(AccountModel);
  const auth = req.headers.get('authorization');
  if (!auth) {
    return NextResponse.json({ message: 'No authorization headers provided' }, { status: 401 });
  }
  console.log("auth: ", auth);
  const token = auth.split(' ')[1];
  if (!token) {
    return NextResponse.json({ message: 'Authorization headers is in invalid format' }, { status: 401 });
  }
  console.log("token: ", token);
  const verified = verifyJwt(token);
  if (!verified) {
    return NextResponse.json({ message: 'Error verifying token' }, { status: 401 });
  }
  console.log("verified: ", verified);
  if (verified && verified.token === null) {
    return true;
  }

  const accountToken = await accountService.getAccountById(verified._id) ?? null;
  console.log("accountToken: ", accountToken);
  if (accountToken.toString() === token.toString()) {
    return true;
  } else {
    return NextResponse.json({ message: 'Authorization headers is not valid' }, { status: 401 });
  }
}