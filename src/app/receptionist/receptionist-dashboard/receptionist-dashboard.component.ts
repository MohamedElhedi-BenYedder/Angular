import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material';
import { ReceptionistService } from '../receptionist.service';

@Component({
  selector: 'app-receptionist-dashboard',
  templateUrl: './receptionist-dashboard.component.html',
  styleUrls: ['./receptionist-dashboard.component.css']
})
export class ReceptionistDashboardComponent implements OnInit {
  showMsg = true;
  patientsRegistered = 0;
  doctorsRegistered = 0;
  appointmentsScheduled = 0;
  patientAdmissions = 0;
  roomsAdded = 0;
  employeesRegistered = 0;
  constructor(private snackBar: MatSnackBar, public receptionistService: ReceptionistService) {}

  click(message: string, action: string) {
    this.snackBar.open('Error', null, {
      duration: 4000,
      panelClass: ['success']
    });
  }


  ngOnInit() {
    this.receptionistService.countPatients().subscribe(response => {
      this.patientsRegistered = Number(response);
    });

    this.receptionistService.countDoctors().subscribe(response => {
      this.doctorsRegistered = Number(response);
    });

    this.receptionistService.countAdmissions().subscribe(response => {
      this.patientAdmissions = Number(response);
    });

    this.receptionistService.countNormalAppointments().subscribe(response => {
      this.appointmentsScheduled += Number(response);;
    });

    this.receptionistService.countOnlineAppointments().subscribe(response => {
      this.appointmentsScheduled += Number(response);;
    });

    this.receptionistService.countRooms().subscribe(response => {
      this.roomsAdded = Number(response);
    });

    this.receptionistService.countEmployees().subscribe(response => {
      this.employeesRegistered = Number(response);
    });


  }


}

