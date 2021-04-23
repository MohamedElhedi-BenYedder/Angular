import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Router } from "@angular/router";
import {AppService} from '../app.service';

@Injectable({ providedIn: 'root' })
export class EchannelingService{
  constructor(private http: HttpClient, private router: Router ,private appService : AppService) {}




  getAllDoctors(){
    return this.appService.getAllDoctors();
  }


  askForAppointment(appointmentDetails: any) {
    return this.http.post('http://localhost:3000/api/askforappointment/scheduleAppointment', appointmentDetails);

  }

  getNewAppointmentNumber(){
    return this.http.get('http://localhost:3000/api/askforappointment/getNewNumber');

  }
}
