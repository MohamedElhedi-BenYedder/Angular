import { Admission } from '../models/admission.model';
import { Doctor } from '../models/doctor.model';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Patient } from '../models/patient.model';
import { map} from 'rxjs/operators';
import { Subject, Observable } from 'rxjs';
import { ManualAppointment } from '../models/manual_appointment.model';
import {AppService} from '../app.service';


@Injectable({ providedIn: 'root' })
export class ReceptionistService {
  patients: Patient[];
  private patientUpdated = new Subject<Patient[]>();

  constructor(private http: HttpClient, private router: Router , private appService: AppService ) {}

  admitPatient(admission: Admission) {
    return this.http.post('http://localhost:3000/api/patient/admit', admission);

  }


  getPatientByRegNumber(paientRegNo: any) {
    if (paientRegNo == '') { paientRegNo = null; }
    return this.http.get('http://localhost:3000/api/patient/getByRegNumber/' + paientRegNo);

  }
  getNewPatientRegNo() {
    console.log('New patient reg no is fetched');
    return this.http.get<{NewPatientRegistrationNumber: number}>('http://localhost:3000/api/patient/getNewRegNumber');
  }

  getNewDoctorRegNo() {
    console.log('New Doctor reg no is fetched');
    return this.http.get('http://localhost:3000/api/doctor/getNewRegNumber');
  }

  getNewAppointmentNumber() {
    return this.http.get('http://localhost:3000/api/appointment/getNewNumber');

  }

  getNewAdmissionNumber() {
    console.log('New admission no is fetched');
    return this.http.get<{NewAdmissionNumber: number}>('http://localhost:3000/api/admission/getNewNumber');

  }

  registerDoctor(doctor: Doctor) {
    console.log('Service Reached');
    return this.http.post<{ message: string, doctor: string}>('http://localhost:3000/api/doctor/register', doctor);
  }
  registerPatient(patient: any): Observable<any> {
    console.log('Service Reached');
    console.log(patient);
    return this.http.post<{ message: string, patient: string}>('http://localhost:3000/api/patient/register', patient);
  }
  getAllPatients() {
    return this.http.get('http://localhost:3000/api/patient/getAll');
  }
  searchPatients(keyword: string) {
    if (keyword) {return this.http.get('http://localhost:3000/api/patient/search/' + keyword); }
    return this.getAllPatients();
  }


  getDoctorByRegNumber(regNo: any) {
    return this.appService.getDoctorByRegNumber(regNo);
  }


  getAllDoctors(): Observable<any> {
    return this.appService.getAllDoctors();
  }

  scheduleAppointment(appointment: ManualAppointment) {

    return this.http.post('http://localhost:3000/api/appointment/scheduleAppointment', appointment);
  }




  viewOnlineAppointments_ByDoctor_LinkPatient(doctorRegistrationNumber: string) {
    const load = {
      doctorRegistrationNumber,
    };
    return this.http.post<{onlineAppointments: any}>('http://localhost:3000/api/onlineAppointments/viewByDoctor_LinkPatient', load);
  }


  viewScheduledManualAppointments(doctorRegNo: any, appDate: Date) {

    return this.http.get('http://localhost:3000/api/appointment/'+String(doctorRegNo)+'/'+String(appDate.toDateString()));

  }

  getPreviousAppointments_ViewPatient(patientRegistrationNumber: string) {
    const load = {
      patientRegistrationNumber
    };

    return this.http.post<{normal_appointments: any, online_appointments: any}>('http://localhost:3000/api/patient/getPreviousAppointmentDetails', load);

  }

  countPatients() {
    return this.http.get('http://localhost:3000/api/patient/count');
  }

  countDoctors() {
    return this.http.get('http://localhost:3000/api/doctor/count');
  }

  countAdmissions() {
    return this.http.get('http://localhost:3000/api/dashboard/countAdmissions');
  }

  countNormalAppointments() {
    return this.http.get('http://localhost:3000/api/dashboard/countNormalAppointments');
  }

  countOnlineAppointments() {
    return this.http.get('http://localhost:3000/api/dashboard/countOnlineAppointments');
  }

  countRooms() {
    return this.http.get('http://localhost:3000/api/room/count');
  }

  countEmployees() {
    return this.http.get('http://localhost:3000/api/dashboard/countEmployees');
  }
}
