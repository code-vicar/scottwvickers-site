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
  accountInfo?: AccountInfo;
}

interface IFailure {
  status: AuthStatus.Failure;
  error: unknown;
}

export type AuthState = ILoading | IReady | IFailure;

export interface IAuth {
  authState: AuthState;
  accountInfo?: AccountInfo;
  handleRedirectPromise: () => Promise<void>;
  signIn: () => Promise<void>;
  signOut: () => Promise<void>;
}
