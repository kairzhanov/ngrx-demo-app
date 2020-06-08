import { Injectable } from '@angular/core';
import { Action } from '@ngrx/store';
import { Router } from '@angular/router';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Observable, of } from 'rxjs';
import { map, filter, switchMap, catchError, tap } from 'rxjs/operators';

import { AuthService } from '../../services/auth.service';
import { AuthActionTypes, 
    LogIn, LogInSuccess, LogInFailure, 
    Register, RegisterSuccess, RegisterFailure, 
    Logout } from '../actions/auth.actions';
import { User } from 'src/app/models/user';



@Injectable()
export class AuthEffects {

    constructor(
        private actions$: Actions,
        private authService: AuthService,
        private router: Router,
    ) {}

    @Effect()
    LogIn: Observable<any> = this.actions$.pipe(
        ofType(AuthActionTypes.LOGIN),
        map((action: LogIn) => action.payload),
        switchMap(payload => {
            return this.authService.logIn(payload.email, payload.password)
                .pipe(map((user: User) => {
                    console.log(user);
                    return new LogInSuccess({token: user.token, email: payload.email});
                }), catchError((error) => {
                    console.log(error);
                    return of(new LogInFailure({ error: error }));
                }));
        })
    );
    

    @Effect({ dispatch: false })
    LogInSuccess: Observable<any> = this.actions$.pipe(
        ofType(AuthActionTypes.LOGIN_SUCCESS),
        tap((user) => {
            localStorage.setItem('token', user.payload.token);
            this.router.navigateByUrl('/');
        })
    );
    
    @Effect({ dispatch: false })
    LogInFailure: Observable<any> = this.actions$.pipe(
    ofType(AuthActionTypes.LOGIN_FAILURE)
    );

    @Effect()
    SignUp: Observable<any> = this.actions$.pipe(
    ofType(AuthActionTypes.REGISTER), 
    map((action: Register) => action.payload), 
    switchMap(payload => {
        return this.authService.register(payload.email, payload.password).pipe(
        map((user) => {
            console.log(user);
            return new RegisterSuccess({token: user.token, email: payload.email});
        })
        , catchError((error) => {
            console.log(error);
            return of(new RegisterFailure({ error: error }));
        }))
    }));

    @Effect({ dispatch: false })
    SignUpSuccess: Observable<any> = this.actions$.pipe(
    ofType(AuthActionTypes.REGISTER_SUCCESS),
    tap((user) => {
        localStorage.setItem('token', user.payload.token);
        this.router.navigateByUrl('/');
    }));

    @Effect({ dispatch: false })
    SignUpFailure: Observable<any> = this.actions$.pipe(
        ofType(AuthActionTypes.REGISTER_FAILURE)
    );

    @Effect({ dispatch: false })
    public LogOut: Observable<any> = this.actions$.pipe(
    ofType(AuthActionTypes.LOGOUT),
    tap((user) => {
        localStorage.removeItem('token');
    })
    );
}