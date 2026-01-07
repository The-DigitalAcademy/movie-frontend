export interface AuthState {
  user: { email: string; name?: string } | null;
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
