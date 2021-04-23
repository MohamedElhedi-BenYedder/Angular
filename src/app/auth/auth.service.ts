import { User } from '../models/user.model';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material';

@Injectable({ providedIn: 'root' })
export class AuthService {
  static role = '';
  static registrationNumber = 0;
  constructor(private http: HttpClient, private router: Router, private snackBar: MatSnackBar) {}


  loginUser(username: string, role: string, password: string) {
    const userObject = new User(username, role, password, 0);
    this.http.post('http://localhost:3000/api/user/login', userObject )
      .subscribe(response => {

        if (response.username) {
          AuthService.role = response.role;
          AuthService.registrationNumber = response.registrationNumber;
          if (AuthService.role === 'admin') {
            this.router.navigate(['/admin/' + response.username]);
          } else if (AuthService.role === 'receptionist') {
            this.router.navigate(['/receptionist']);

          } else if (AuthService.role === 'doctor') {
            this.router.navigate(['/doctor/']);
            console.log(response.registrationNumber);
          }
        } else {
          this.snackBar.open('Authentication Failed! Invalid username or password', 'OK', {
          });
        }
      });

  }
  getToken() {
    return 1;
  }
}
