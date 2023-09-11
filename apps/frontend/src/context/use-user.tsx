import { User } from '#/pages/app/renderer/types';
import { createContext, useContext, JSX } from 'solid-js';

const UserContext = createContext<User>();

export function UserProvider(props: { user: User; children: JSX.Element }) {
  return (
    <UserContext.Provider value={props.user}>
      {props.children}
    </UserContext.Provider>
  );
}

export function useUser() {
  return useContext(UserContext)!;
}
