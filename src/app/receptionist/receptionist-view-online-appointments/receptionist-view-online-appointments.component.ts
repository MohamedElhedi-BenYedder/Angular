import { NgForm } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { ReceptionistService } from '../receptionist.service';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-receptionist-view-online-appointments',
  templateUrl: './receptionist-view-online-appointments.component.html',
  styleUrls: ['./receptionist-view-online-appointments.component.css']
})
export class ReceptionistViewOnlineAppointmentsComponent implements OnInit {

  constructor(public receptionistService: ReceptionistService, private snackBar: MatSnackBar) { }
  public doctors = [];
  public onlineAppointment_byDoctor = [];
  showTable_ViewAppointments = false;

  public onlineAppointments_LinkPatient = [];
  showTable_LinkPatient = false;

  firstName_LinkPatient: string;
  lastName_LinkPatient: string;
  NIC_LinkPatient: string;
  app_id: string;


  name: string;
  patientRegNo = '';
  isPatientFound = false;

  ngOnInit() {
    this.loadDoctorNames();
  }

  loadDoctorNames() {
    this.receptionistService.getAllDoctors().subscribe(results => {
      results.map(doctor => {
        this.doctors.push({firstName: doctor.name.firstname, lastName: doctor.name.lastname, doctorRegistrationNumber: doctor.doctorRegistrationNumber});
      });
    });
  }
  onChangeChooseDoctor_ViewOnlineAppointments(doctorRegistrationNumber: any, date: Date) {
  }
  onChangeChooseDoctor_LinkPatient(doctorRegistrationNumber: any) {
    this.showTable_LinkPatient = false;
    this.onlineAppointments_LinkPatient = [];
    this.receptionistService.viewOnlineAppointments_ByDoctor_LinkPatient(doctorRegistrationNumber).subscribe(results => {
      if (results.onlineAppointments.length != 0) {
        this.showTable_LinkPatient = true;
      } else {
        this.snackBar.open('No online appointments to link', null, {
          duration: 2000,
          panelClass: ['error']
        });
      }
      results.onlineAppointments.map(appointment => {
        const app = {
          appointment,
          appointmentDate: new Date(appointment.appointmentDate).toDateString(),
          dateCreated: new Date(appointment.dateCreated).toDateString()
        };
        this.onlineAppointments_LinkPatient.push(app);

      });
    });
  }
  onLinkToPatient(appointment: any) {
  }

  linkPatient(form: NgForm) {
  }
  onSearchPatient(keyupevent: KeyboardEvent) {
    this.name = '';
    this.patientRegNo = '';
    const enteredKeyword = (keyupevent.target as HTMLInputElement).value;
    const enteredKeyword_num = enteredKeyword.replace( /^\D+/g, '');

    this.receptionistService.getPatientByRegNumber(enteredKeyword_num).subscribe(result => {
      this.name = String(result.firstName) + ' ' + String(result.lastName);
      this.patientRegNo = result.patientRegistrationNumber;
      if (this.patientRegNo) {
        this.isPatientFound = true;
      } else {
        this.isPatientFound = false;
      }
    });

  }


}
