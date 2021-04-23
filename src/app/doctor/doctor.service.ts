import { Subject } from 'rxjs';
import { Patient } from './../models/patient.model';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Router } from "@angular/router";
import { map } from 'rxjs/operators';
import {AppService} from '../app.service';

@Injectable({ providedIn: 'root' })
export class DoctorService{
  patients:Patient[];
  private patientUpdated=new Subject<Patient[]>();
  constructor(private http: HttpClient, private router: Router , public appService: AppService) {}

 getDoctorByRegNumber(reg){
    return this.appService.getDoctorByRegNumber(reg);
 }

  getAppointments_ByDate(doctorRegNo: any, appDate: any): any {
    return this.appService.getAppointmentByDoctorAtDate(doctorRegNo, appDate.toDateString());

  }

  storeTreatmentInformation(treatmentInformation:any,type: string){ }
}
