import { MatSnackBar } from '@angular/material';
import { NgForm } from '@angular/forms';
import { DoctorService } from '../doctor.service';
import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {AuthService} from '../../auth/auth.service';
@Component({
  selector: 'app-doctor-appointments',
  templateUrl: './doctor-appointments.component.html',
  styleUrls: ['./doctor-appointments.component.css']
})
export class DoctorAppointmentsComponent implements OnInit {

  constructor(public activate: ActivatedRoute, public doctorService: DoctorService, private router: Router, private snackBar: MatSnackBar) { }

  public appointmentsByDate = [];
  currentDoctorRegNo = AuthService.registrationNumber;
  elements = [{}, {}];
  serachedDate;
  public selectedAppointment = {};
  public selectedAppointmentType;
  public selectedPatient = {};
  public selectedAppointmentNumber;
  public selectedAppointmentPatientName;
  public selectedPatientRegNo;
  public selectedPatientDob;
  ngOnInit() {
    this.currentDoctorRegNo = 3;
  }
  onSearchAppointments(appointmentDate: Date) {
    this.serachedDate = appointmentDate.toDateString();
    this.appointmentsByDate = [];
    this.doctorService.getAppointments_ByDate(this.currentDoctorRegNo, appointmentDate).subscribe(response => {
       console.log(response);
      if (!response ) {
        this.snackBar.open( 'No results', 'OK', {
          panelClass: ['error']
        });
        return;
      }
      this.appointmentsByDate = response;
      console.log(response);
    });
  }
  onViewAppointment(appointment: any, type: string) {
    this.selectedAppointmentType = type;
    this.selectedAppointment = {};
    this.selectedPatient = {};
    this.selectedAppointment = appointment;
    this.selectedPatient = appointment.patient[0];
    this.selectedAppointmentPatientName = appointment.patient[0].name.firstname + ' ' + appointment.patient[0].name.lastname;
    this.selectedPatientRegNo = 'PAT/' + appointment.patientRegistrationNumber;
    this.selectedPatientDob = new Date(appointment.patient[0].dob).toDateString();
    if (type == 'Normal') {
      this.selectedAppointmentNumber = 'APP/' + appointment.appointmentNumber;

    } else if (type == 'Online') {
      this.selectedAppointmentNumber = 'eAPP/' + appointment.appointmentNumber;
    }
  }




  onSave(form: NgForm) {
    console.log(form.value);
    const appointmentNumber = form.value.appointmentNumber.replace( /^\D+/g, '');

    const treatmentInformation = {
      appointmentNumber,
      symptoms: form.value.symptoms,
      disease: form.value.disease,
      prescription: form.value.prescription
    };
    this.doctorService.storeTreatmentInformation(treatmentInformation, this.selectedAppointmentType).subscribe(response => {
      console.log(response);
      form.reset();
      this.onlineAppointments_ByDate = [];
      this.normalAppointments_ByDate = [];
      this.onlineAppointments_TreatmentHistory = [];
      this.normalAppointments_TreatmentHistory = [];
      this.selectedAppointment = {};
      this.selectedPatient = {};
      this.selectedAppointment = {};
      this.selectedAppointmentPatientName = '';
      this.selectedPatientRegNo = '';
      this.selectedPatientDob = '';
    });
  }
}
