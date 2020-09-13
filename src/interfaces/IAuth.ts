import { AccountInfo } from "@azure/msal-browser"

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
  username?: string;
}

interface IFailure {
  status: AuthStatus.Failure;
  error: unknown;
}

export type AuthState = ILoading | IReady | IFailure;

export interface IAuthTokenOptions {
  scopes?: string[]
}

export interface IAuth {
  authState: AuthState;
  username?: string;
  getAccount: () => AccountInfo | undefined;
  getToken: (options?: IAuthTokenOptions) => Promise<string>;
  signIn: () => Promise<void>;
  signOut: () => Promise<void>;
}
