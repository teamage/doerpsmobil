import { auth } from '#/firebase';
import { signInWithEmailAndPassword } from 'firebase/auth';

export function SignInScreen() {
  const signIn = async () => {
    try {
      await signInWithEmailAndPassword(auth, 'test@test.com', '123456');
    } catch (e) {
      console.log('failure');
    }
  };
  return <button onClick={signIn}>signIn</button>;
}
