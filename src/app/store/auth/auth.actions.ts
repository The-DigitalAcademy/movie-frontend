import { createAction, props } from '@ngrx/store';
import { SignInReq } from 'src/app/models/user.model';

export const signIn = createAction(
  '[Auth] Sign In',
  props<{ credentials: SignInReq }>()
);

export const signInSuccess = createAction(
  '[Auth] Sign In Success',
  props<{ user: any }>()
);

export const signInFailure = createAction(
  '[Auth] Sign In Failure',
  props<{ error: any }>()
);

export const signUp = createAction(
  '[Auth] Sign Up',
  props<{ email: string; password: string; username: string }>()
);

export const signUpSuccess = createAction(
  '[Auth] Sign Up Success',
  props<{ user: any; token: string }>()
);

export const signUpFailure = createAction(
  '[Auth] Sign Up Failure',
  props<{ error: any }>()
);

export const signOut = createAction('[Auth] Sign Out');

// New action to initialize auth from localStorage
export const initAuth = createAction('[Auth] Init Auth');

export const initAuthSuccess = createAction(
  '[Auth] Init Auth Success',
  props<{ user: any }>()
);