import { SignInRes } from "src/app/models/user.model";

export const AUTH_FEATURE_KEY = "auth"

export interface AuthState {
  user: SignInRes | null;
  token: string | null;
  loading: boolean;
  error: any;
}

export const initialAuthState: AuthState = {
  user: null,
  token: null,
  loading: false,
  error: null
};
