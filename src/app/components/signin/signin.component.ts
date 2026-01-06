import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { BiskopAuthenticationService } from 'src/app/services/biskop-authentication.service';

// SignIn component handles user authentication with email/password and Google sign-in
@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css'],
  standalone: false
})
export class SigninComponent implements OnInit {
  signinForm: FormGroup;

  constructor(
    private authentication: BiskopAuthenticationService,
    private formBuilder: FormBuilder
  ) {
    this.signinForm = this.formBuilder.group({
      email: [''],
      password: [''],
      remember: [false]
    });
  }

  ngOnInit(): void {}

  onSubmit(): void {
    if(this.signinForm.valid){
      const email = this.signinForm.get('email')?.value;
      const password = this.signinForm.get('password')?.value;
      this.authentication.signIn(email, password);
    }
  }

  signInWithGoogle(): void {
    this.authentication.signInWithGoogleAccount();
  }

  get email() {
    return this.signinForm.get('email');
  }

  get password() {
    return this.signinForm.get('password');
  }
}
