import { MatSnackBar } from '@angular/material';
import { Router } from '@angular/router';
import { map } from 'rxjs/operators';
import { EchannelingService } from './../echannelling.service';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-online-appointment',
  templateUrl: './online-appointment.component.html',
  styleUrls: ['./online-appointment.component.css']
})
export class OnlineAppointmentComponent implements OnInit {
  constructor(public echannellingService: EchannelingService, private snackBar: MatSnackBar) { }

  doctorDetails = [];
  public doctorAvailability = [];
  selectedDoctorName;
  selectedDoctorNo;
  selectedDay;
  selectedTime;
  showAll = false;
  showSearchDoctor = false;
  showHome = true;
  appointmentNum: any = null;
  doctor = [];

  ngOnInit() {
    this.getDoctorsList();
    this.getAppointmentNumber();

  }

  gotoSearchAll() {
    this.showHome = false;
    this.showAll = true;
  }

  gotoHome() {
    this.showHome = true;
    this.showSearchDoctor = false;
    this.showAll = false;
  }


  gotoSearchOne() {
    this.showHome = false;
    this.showSearchDoctor = true;
  }
  getAppointmentNumber() {
    this.echannellingService.getNewAppointmentNumber().subscribe(responseData => {
      this.appointmentNum = 'eAPP/' + responseData;

    });
  }
  getDoctorsList() {
    this.echannellingService.getAllDoctors().subscribe(response => {

      response.map(doctor => {
       this.doctorDetails.push(doctor);
      });
    });
  }

  onBookNow(doctor: any) {
    this.selectedDoctorNo = doctor.doctorRegistrationNumber;
    this.selectedDoctorName = 'Dr. ' + doctor.name.firstName + ' ' + doctor.name.lastName;
    this.doctorAvailability = [];
    this.doctorAvailability = doctor.doctorAvailability;
  }

  onSelectTime(day: string, time: string) {
    this.selectedDay = day;
    this.selectedTime = time;
  }

  onSubmit(form: NgForm) {
    if (form.invalid) {
      this.snackBar.open('Please Enter Valid Details ', 'OK', {
        panelClass: ['error']
      });
    } else {
      const current_datetime = new Date();
      const raw_appNo = form.value.appointmentNumber;
      const appNo = raw_appNo.replace( /^\D+/g, '');

      const onlineAppointment = {
        appointmentNumber: appNo,
        doctorRegistrationNumber: Number(this.selectedDoctorNo),
        name:{firstName : form.value.firstName, lastName: form.value.lastName },
        gender: form.value.gender,
        contactNumber: form.value.contactNumber,
        NIC: form.value.NIC,
        city: form.value.city,
        district: form.value.district,
        timeSlot: this.selectedDay + ' ' + this.selectedTime,
        appointmentDate: new Date(form.value.appointmentDate).toDateString(),
        dateCreated: new Date(current_datetime).toDateString(),
      };
      this.echannellingService.askForAppointment(onlineAppointment).subscribe(response => {
        form.resetForm();
        this.getDoctorsList();
        this.getAppointmentNumber();
        this.doctorDetails = [];
        this.doctorAvailability = [];
        this.selectedDay = '';
        this.selectedDoctorName = '';
        this.selectedDoctorNo = '';
        this.selectedTime = '';
        this.snackBar.open( 'Online Appointment Successfull', 'OK', {
          panelClass: ['success']
        });
      });
    }
  }
}
