import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { BiskopAuthenticationService } from 'src/app/services/biskop-authentication.service';
import * as AuthActions from 'src/app/store/auth/auth.actions';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css'],
  standalone: false
})
export class SigninComponent implements OnInit {

  // form that holds email and password
  signinForm: FormGroup;

  constructor(
    private authentication: BiskopAuthenticationService,
    private formBuilder: FormBuilder,
    private store: Store,
    private router: Router
  ) {
    // create the form
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
    // check if form is valid
    if (this.signinForm.valid) {

      const email = this.signinForm.get('email')?.value;
      const password = this.signinForm.get('password')?.value;

      try {
        // call auth service login
        await this.authentication.signIn(email, password);

        // if login succeeds, fake token is already saved
        console.log('Login successful');

      } catch (error) {
        console.error('Login failed', error);
      }
    }
  }

  /**
   * Login using Google
   */
  async signInWithGoogle(): Promise<void> {
    try {
      await this.authentication.signInWithGoogleAccount();
    } catch (error) {
      console.error('Google sign-in failed', error);
    }
  }

  // form helpers (used in template)
  get email() {
    return this.signinForm.get('email');
  }

  get password() {
    return this.signinForm.get('password');
  }
}
