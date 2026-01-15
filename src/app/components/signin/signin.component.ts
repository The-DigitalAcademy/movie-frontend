import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { SignInReq } from 'src/app/models/user.model';
import { BiskopAuthenticationService } from 'src/app/services/biskop-authentication.service';
import * as AuthActions from "src/app/store/auth/auth.actions"
import { AuthState } from 'src/app/store/auth/auth.state';
import { Actions, ofType } from '@ngrx/effects';
import { take } from 'rxjs';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css'],
  standalone: false
})
export class SigninComponent implements OnInit {

  signinForm: FormGroup;
  credentials: SignInReq = {
    email: "",
    password: ""
  }

  constructor(
    private authentication: BiskopAuthenticationService,
    private formBuilder: FormBuilder,
    private store: Store<AuthState>,
    private router: Router,
    private actions$: Actions
  ) {
    this.signinForm = this.formBuilder.group({
      email: [''],
      password: [''],
      remember: [false]
    });
  }

  ngOnInit(): void {}

  /**
   * Login using email and password
   */
  async onSubmit(): Promise<void> {
    if (this.signinForm.valid) {
      const email = this.signinForm.get('email')?.value;
      const password = this.signinForm.get('password')?.value;
      
      this.credentials = {
        email,
        password
      }

      // Dispatch sign in action
      this.store.dispatch(
        AuthActions.signIn({
          credentials: this.credentials
        })
      );

      // Wait for sign in success before navigating
      this.actions$.pipe(
        ofType(AuthActions.signInSuccess),
        take(1)
      ).subscribe(() => {
        console.log('Sign in successful, navigating to home');
        this.router.navigate(['./home']);
      });

      // Handle sign in failure
      this.actions$.pipe(
        ofType(AuthActions.signInFailure),
        take(1)
      ).subscribe((error) => {
        console.error('Login failed', error);
        // You can show an error message to the user here
      });
    }
  }

  get email() {
    return this.signinForm.get('email');
  }

  get password() {
    return this.signinForm.get('password');
  }
}