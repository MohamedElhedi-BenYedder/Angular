import { MatSnackBar } from '@angular/material';
import { User } from '../../models/user.model';
import { NgForm } from '@angular/forms';
import { AdminService } from './../admin.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-admin-add-users',
  templateUrl: './admin-add-users.component.html',
  styleUrls: ['./admin-add-users.component.css']
})

export class AdminAddUsersComponent implements OnInit {

  constructor(public adminService: AdminService, private snackBar: MatSnackBar) { }

  doctorName = '';
  doctorRegNo = '';

  ngOnInit() {
  }

  onAddUser(addUserForm: NgForm) {
    const user: User = {
      username: addUserForm.value.username,
      role: addUserForm.value.userRole,
      registrationNumber: addUserForm.value.registrationNumber,
      password: addUserForm.value.password,
    };
    this.adminService.signupUser(user).subscribe((response) => {
      if (response) {
        this.snackBar.open( 'User Added', 'OK', {
          panelClass: ['success']
        });
        addUserForm.reset();
      } else {
        this.snackBar.open( 'User Cannot be addded, username already exist. Enter Another Username', 'OK', {
          panelClass: ['error']
        });
      }
    });
  }
  onAddDoctor(addUserForm: NgForm) {
    const user: User = {
      username: addUserForm.value.username,
      role: 'doctor',
      registrationNumber: addUserForm.value.registrationNumber,
      password: addUserForm.value.password,
    };
    this.adminService.signupUser(user).subscribe((response) => {
      if (response) {
        this.snackBar.open( 'User Added', 'OK', {
          panelClass: ['success']
        });
        addUserForm.reset();
      } else {
        this.snackBar.open( 'User Cannot be addded, username already exist. Enter Another Username', 'OK', {
          panelClass: ['error']
        });
      }
    });
  }
  onSearchDoctor(keyupevent: KeyboardEvent) {
    this.doctorName = '';
    const enteredKeyword = (keyupevent.target as HTMLInputElement).value;
    const enteredKeyword_num = enteredKeyword.replace( /^\D+/g, '');
    this.adminService.getDoctorByRegNumber(Number(enteredKeyword_num)).subscribe(result => {
      this.doctorName = String(result.name.firstName) + ' ' + String(result.name.lastName);
      this.doctorRegNo = result.doctorRegistrationNumber;
    });

  }
}
