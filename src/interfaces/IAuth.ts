export enum AuthStatus {
  Loading,
  Ready,
  Failure,
}

interface ILoading {
  status: AuthStatus.Loading;
}

interface IReady {
  status: AuthStatus.Ready;
  username: string | undefined;
}

interface IFailure {
  status: AuthStatus.Failure;
  error: unknown;
}

export type AuthState = ILoading | IReady | IFailure;

export interface IAuth {
  authState: AuthState;
  username: string | undefined;
  signIn: () => Promise<void>;
  signOut: () => Promise<void>;
}
