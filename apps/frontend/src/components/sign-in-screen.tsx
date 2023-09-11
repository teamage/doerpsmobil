import { auth } from '#/firebase';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { TextField } from '@kobalte/core';
import { createSignal } from 'solid-js';
import { AuthError, AuthErrorCodes } from 'firebase/auth';

export function SignInScreen() {
  const [email, setEmail] = createSignal('');
  const [emailError, setEmailError] = createSignal('');
  const [password, setPassword] = createSignal('');
  const [passwordError, setPasswordError] = createSignal('');

  const onSubmit = async (e: SubmitEvent) => {
    e.preventDefault();

    try {
      await signInWithEmailAndPassword(auth, email(), password());
    } catch (e) {
      const error = e as AuthError;

      switch (error.code) {
        case AuthErrorCodes.INVALID_EMAIL:
          setEmailError('Dies ist keine Emailadresse');
          break;
        case AuthErrorCodes.INVALID_PASSWORD:
          setPasswordError('Falsches Passwort');
          break;
        default:
          setEmailError(error.code);
          setPasswordError(error.code);
          console.log(error.code);
      }
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
