import { AdminService } from './../admin.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-admin-view-employee',
  templateUrl: './admin-view-employee.component.html',
  styleUrls: ['./admin-view-employee.component.css']
})
export class AdminViewEmployeeComponent implements OnInit {

  constructor(public adminService: AdminService) { }

  ngOnInit() {
  }

}
