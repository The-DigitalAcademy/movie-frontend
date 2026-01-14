import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { SignInReq } from 'src/app/models/user.model';
import { BiskopAuthenticationService } from 'src/app/services/biskop-authentication.service';
import * as AuthActions from "src/app/store/auth/auth.actions"
import { AuthState } from 'src/app/store/auth/auth.state';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css'],
  standalone: false
})
export class SigninComponent implements OnInit {

  // form that holds email and password
  signinForm: FormGroup;
  credentials: SignInReq = {
    email: "",
    password: ""
  }

  constructor(
    private authentication: BiskopAuthenticationService,
    private formBuilder: FormBuilder,
    private store: Store<AuthState>,
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
      
      this.credentials = {
        email,
        password
      }

      try {
        // call auth service login
        // await this.authentication.signIn(email, password);
        this.store.dispatch(
          AuthActions.signIn({
            credentials: this.credentials
          })
        )
        // if login succeeds, fake token is already saved
       this.router.navigate(["./home"])

      } catch (error) {
        console.error('Login failed', error);
      }
    }
  }

  // // form helpers (used in template)
  get email() {
    return this.signinForm.get('email');
  }

  get password() {
    return this.signinForm.get('password');
  }
}
