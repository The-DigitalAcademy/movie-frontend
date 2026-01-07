import { createAction, props } from '@ngrx/store';

export const signIn = createAction(
  '[Auth] Sign In',
  props<{ email: string; password: string }>()
);

export const signInSuccess = createAction(
  '[Auth] Sign In Success',
  props<{ token: string }>()
);

export const signInFailure = createAction(
  '[Auth] Sign In Failure',
  props<{ error: any }>()
);

export const signUp = createAction(
  '[Auth] Sign Up',
  props<{ email: string; password: string; firstname?: string; lastname?: string }>()
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
