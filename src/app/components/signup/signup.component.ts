import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { SignUpReq } from 'src/app/models/user.model';
import { BiskopAuthenticationService } from 'src/app/services/biskop-authentication.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
  standalone: false
})
export class SignupComponent {
  firstname: string = '';
  lastname: string = '';
  email: string = '';
  password: string = '';
  confirmPassword: string = '';
  terms: boolean = false;

  constructor(private authentication: BiskopAuthenticationService, private router: Router) {}

  onSubmit(): void {
    const signUpReq: SignUpReq = {
      username: this.firstname + " " + this.lastname,
      email: this.email,
      password: this.password
    }

    if(this.email && this.password && this.password === this.confirmPassword){
      this.authentication.signUp(signUpReq).subscribe({
        next: response => this.router.navigate(['/signin']),
        error: err => console.log(err)
      });
    }
  }

  calculatePasswordStrength(): number {
    let strength = 0;
    if(this.password.length >= 8) strength += 25;
    if(/[a-z]/.test(this.password) && /[A-Z]/.test(this.password)) strength += 25;
    if(/\d/.test(this.password)) strength += 25;
    if(/[!@#$%^&*(),.?":{}|<>]/.test(this.password)) strength += 25;
    return strength;
  }
}
