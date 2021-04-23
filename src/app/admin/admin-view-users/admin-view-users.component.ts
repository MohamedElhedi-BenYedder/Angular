import { map } from 'rxjs/operators';
import { MatSnackBar } from '@angular/material';
import { AdminService } from './../admin.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-admin-view-users',
  templateUrl: './admin-view-users.component.html',
  styleUrls: ['./admin-view-users.component.css']
})
export class AdminViewUsersComponent implements OnInit {
  Users = [];
  constructor(public adminService: AdminService, private snackBar: MatSnackBar) { }


  ngOnInit() {
    this.getAllUsers() ;
  }
  getAllUsers() {
    this.Users = [];
    this.adminService.getAllUsers().subscribe(response => {
      response.map(user => {
        if (user.role === 'doctor') {
          user.registrationNumber = 'DR/' + user.registrationNumber ;
        } else {
          user.registrationNumber = 'N/A';

        }
        this.Users.push(user);
      });
    });
  }
}
