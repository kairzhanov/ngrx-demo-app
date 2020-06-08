import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { AppState, selectAuthState } from 'src/app/store/app.states';
import { Register } from 'src/app/store/actions/auth.actions';
import { Observable } from 'rxjs';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  user: User;
  registerForm: FormGroup;
  getState: Observable<any>;
  errorMessage: string | null;

  constructor(
    private fb: FormBuilder,
    private store: Store<AppState>
    ) {
      this.getState = this.store.select(selectAuthState);
     }

  ngOnInit(): void {
    this.registerForm = this.fb.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
    });

    this.getState.subscribe((state) => {
      this.errorMessage = this.errorMessage;
    });
  }

  onSubmit(): void {
    this.user = new User();
    this.user.email = this.email.value;
    this.user.password = this.password.value;

    const payload = {
      email: this.email.value,
      password: this.password.value
    }

    this.store.dispatch(new Register(payload))
    console.log(this.user);
  }

  get email() {
    return this.registerForm.get('email');
  }
  
  get password() {
    return this.registerForm.get('password');
  }

  getErrorEmail() {
    return this.registerForm.get('email').hasError('required') ? 'Field is required': '';
  }
  
  getErrorPassword() {
    return this.registerForm.get('password').hasError('required') ? 'Field is required': '';
  }

}
