import { MatSnackBar } from '@angular/material';
import { NgForm } from '@angular/forms';
import { map } from 'rxjs/operators';
import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ReceptionistService } from '../receptionist.service';
import { ManualAppointment } from './../../models/manual_appointment.model';


@Component({
  selector: 'app-receptionist-schedule-appointments',
  templateUrl: './receptionist-schedule-appointments.component.html',
  styleUrls: ['./receptionist-schedule-appointments.component.css'],
  // encapsulation: ViewEncapsulation.None,
})
export class ReceptionistScheduleAppointmentsComponent implements OnInit {

  constructor(public receptionistService: ReceptionistService, private snackBar: MatSnackBar) { }
  public doctors = [];
  public doctorAvailability = [];
  public selectedDoctorAvailability = [];
  appointmentNum: any = null;
  patientFirstName = '';
  patientLastName = '';
  name: string;
  appointmentTime_Calculated;
  appointmentCount;
  searchedAppointments_viewScheduledApps = [];
  doctorName_viewScheduledApps;
  searchedAppointmentDate_viewScheduledApps;
  showTable = false;

  ngOnInit() {
    this.loadData();
    this.getNewAppointmentNumber();
  }
  loadData() {
    this.receptionistService.getAllDoctors().subscribe(results => {
      results.map(doctor => {
        this.doctors.push({firstName: doctor.name.firstName, lastName: doctor.name.lastName, doctorRegistrationNumber: doctor.doctorRegistrationNumber});
      });
    });
  }
  getNewAppointmentNumber() {

    this.receptionistService.getNewAppointmentNumber().subscribe(responseData => {
      this.appointmentNum = 'APP/' + responseData;

    });
  }
  onSearchPatient(keyupevent: KeyboardEvent) {
    this.name = '';
    const enteredKeyword = (keyupevent.target as HTMLInputElement).value;
    const enteredKeyword_num = enteredKeyword.replace( /^\D+/g, '');
    this.receptionistService.getPatientByRegNumber(enteredKeyword_num).subscribe(result => {
      this.name = String(result.name.firstName)+" "+String(result.name.lastName); ;

    });

  }

  onChangeChooseDoctor(regNo: any) {
    this.doctorAvailability = []
    this.receptionistService.getDoctorByRegNumber(regNo).subscribe(results => {
      results.doctorAvailability.map(timeSlot => {
        this.doctorAvailability.push(timeSlot);
      });
    });
  }

  onChangeSelectDoctor(regNo: any) {
    this.selectedDoctorAvailability = [];
    this.receptionistService.getDoctorByRegNumber(regNo).subscribe(results => {
      results.doctorAvailability.map(timeSlot => {
        this.selectedDoctorAvailability.push(timeSlot);
      });
    });
  }
  /*
  getAppointmentCount(date: Date, doctorRegistrationNumber: Number, timeSlot: string) {

    const object = {
      appointmentDate: new Date(date).toDateString(),
      doctorRegistrationNumber,
      timeSlot
    };
    this.receptionistService.getAppointmentCount(object).subscribe(response => {
      console.log(response.count);
      this.appointmentCount = response.count;
      this.generateAppointmentTime(timeSlot);
    });
  }
  *
   */

  onScheduleAppointment(scheduleAppointmentForm: NgForm) {
    if (scheduleAppointmentForm.invalid) {
      this.snackBar.open('Please Enter Valid Details ', 'OK', {
        panelClass: ['error']
      });
    } else {
      const raw_appNo = scheduleAppointmentForm.value.appointmentNumber;
      const appNo = raw_appNo.replace( /^\D+/g, '');
      const raw_appointment_date = scheduleAppointmentForm.value.appointmentDate;
      const appointment_date = raw_appointment_date.getFullYear() + '-' + (raw_appointment_date.getMonth() + 1) + '-' + raw_appointment_date.getDate();


      const current_datetime = new Date();
      const formatted_current_date = current_datetime.getFullYear() + '-' + (current_datetime.getMonth() + 1) + '-' + current_datetime.getDate();

      console.log(scheduleAppointmentForm.value.selectTimeSlot);
      const appointment: ManualAppointment = {
        appointmentNumber: Number(appNo),
        doctorRegistrationNumber: Number(scheduleAppointmentForm.value.selectDoctor),
        patientRegistrationNumber: Number(scheduleAppointmentForm.value.patientRegistrationNumber),
        timeSlot: { day: scheduleAppointmentForm.value.selectTimeSlot.split(' ')[2],
          startTime: scheduleAppointmentForm.value.selectTimeSlot.split(' ')[0],
          endTime: scheduleAppointmentForm.value.selectTimeSlot.split(' ')[1] },
        appointmentDate: new Date(scheduleAppointmentForm.value.appointmentDate).toDateString(),
        dateCreated: formatted_current_date

      };

      this.receptionistService.scheduleAppointment(appointment).subscribe(responseData => {
        this.getNewAppointmentNumber();
        scheduleAppointmentForm.resetForm();
        this.selectedDoctorAvailability = [];
        this.snackBar.open( 'Appointment Created', 'OK', {
          panelClass: ['success']
        });
      });
    }

  }
  findAppointments(doctorRegistrationNumber: string, date: Date) {
    this.searchedAppointments_viewScheduledApps = [];
    this.doctorName_viewScheduledApps = '';
    this.searchedAppointmentDate_viewScheduledApps = '';
    this.showTable = true;
    this.receptionistService.viewScheduledManualAppointments(doctorRegistrationNumber, date).subscribe(response => {
      console.log(response);
      response.map(app => {
        app.dateCreated = new Date(app.dateCreated).toDateString();
        this.searchedAppointments_viewScheduledApps.push(app);

      });
      this.doctorName_viewScheduledApps = this.searchedAppointments_viewScheduledApps[0].doctor[0].name.firstname + ' ' + this.searchedAppointments_viewScheduledApps[0].doctor[0].name.lastname;
      this.searchedAppointmentDate_viewScheduledApps = new Date(this.searchedAppointments_viewScheduledApps[0].appointmentDate).toDateString();
    });
  }
}
