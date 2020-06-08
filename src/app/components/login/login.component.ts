import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { AppState, selectAuthState } from 'src/app/store/app.states';
import { LogIn } from 'src/app/store/actions/auth.actions';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  user: User;
  loginForm: FormGroup;
  getState: Observable<any>;
  errorMessage: string | null;


  constructor(
    private fb: FormBuilder,
    private store: Store<AppState>
    ) { 
      this.getState = this.store.select(selectAuthState);
    }

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
    });

    this.getState.subscribe((state) => {
      this.errorMessage = state.errorMessage;
      
    })
  }

  onSubmit(): void {
    this.user = new User();
    this.user.email = this.email.value;
    this.user.password = this.password.value;
    
    const payload = {
      email: this.email.value,
      password: this.password.value
    }
    this.store.dispatch(new LogIn(payload))

    console.log(this.user);
  }

  get email() {
    return this.loginForm.get('email');
  }
  
  get password() {
    return this.loginForm.get('password');
  }

  getErrorEmail() {
    return this.loginForm.get('email').hasError('required') ? 'Field is required': '';
  }
  
  getErrorPassword() {
    return this.loginForm.get('password').hasError('required') ? 'Field is required': '';
  }
}
