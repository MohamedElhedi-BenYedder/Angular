import { AdminService } from './../admin.service';
import { Component, OnInit, Output } from '@angular/core';
import { Subscription } from 'rxjs';
import { Patient } from 'src/app/models/patient.model';
import * as jsPDF from 'jspdf'
import { forEach } from '@angular/router/src/utils/collection';

@Component({
  selector: 'app-admin-reports2',
  templateUrl: './admin-reports2.component.html',
  styleUrls: ['./admin-reports2.component.css']
})
export class AdminReports2Component implements OnInit {

  constructor(public adminService: AdminService) { }

  ngOnInit() {
  }
}
