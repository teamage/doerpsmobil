import { auth } from '#/firebase';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { TextField } from '@kobalte/core';
import { createSignal } from 'solid-js';
import { FirebaseError } from 'firebase/app';

export function SignInScreen() {
  const [email, setEmail] = createSignal('');
  const [emailError, setEmailError] = createSignal('');
  const [password, setPassword] = createSignal('');
  const [passwordError, setPasswordError] = createSignal('');

  const onSubmit = async (e: SubmitEvent) => {
    e.preventDefault();

    try {
      await signInWithEmailAndPassword(auth, email(), password());
    } catch (error) {
      if (error instanceof FirebaseError) {
        switch (error.code) {
          case 'auth/user-not-found':
            setEmailError('Email nicht registriert');
            break;
          case 'auth/invalid-email':
            setEmailError('Dies ist keine Emailadresse');
            break;
          case 'auth/wrong-password':
            setEmailError('Falsches Passwort');
            break;

          default:
            console.log('firebase default error');
            console.log('code:', error.code);
            console.log('mssg:', error.message);

            setEmailError(error.code);
            setPasswordError(error.code);
        }
        return;
      }

      console.log('unknown error:', error);
    }
  };

  return (
    <div class='w-screen h-screen flex flex-col items-center justify-center'>
      <form onSubmit={onSubmit}>
        <TextField.Root
          onChange={(v) => {
            setEmailError('');
            setEmail(v);
          }}
          value={email()}
          validationState={emailError() ? 'invalid' : 'valid'}
        >
          <TextField.Label>Email</TextField.Label>
          <TextField.Input class='bg-neutral-700' />
          <TextField.ErrorMessage class='h-4' forceMount>
            {emailError()}
          </TextField.ErrorMessage>
        </TextField.Root>
        <TextField.Root
          onChange={(v) => {
            setPasswordError('');
            setPassword(v);
          }}
          value={password()}
          validationState={passwordError() ? 'invalid' : 'valid'}
        >
          <TextField.Label>Passwort</TextField.Label>
          <TextField.Input class='bg-neutral-700' type='password' />
          <TextField.ErrorMessage class='h-4' forceMount>
            {passwordError()}
          </TextField.ErrorMessage>
        </TextField.Root>
        <div>
          <button
            disabled={
              Boolean(emailError()) ||
              Boolean(passwordError()) ||
              !password() ||
              !email()
            }
          >
            Anmelden
          </button>
        </div>
      </form>
    </div>
  );
}
