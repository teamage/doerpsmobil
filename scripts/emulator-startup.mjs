#!/usr/bin/env zx

import { initializeApp } from 'firebase-admin/app';
import { getAuth } from 'firebase-admin/auth';

initializeApp();

const auth = getAuth();
try {
  const userRecord = await auth.createUser({
    email: 'test@test.com',
    password: '123456',
    displayName: 'Torsten Hansen',
  });

  await auth.setCustomUserClaims(userRecord.uid, { role: 'admin' });

  await question('running emulators');
} catch (e) {
  console.log(e);
}
