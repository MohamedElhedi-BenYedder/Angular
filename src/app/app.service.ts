import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Router} from '@angular/router';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AppService {

  constructor(private http: HttpClient, private router: Router) {}


  /*************http://localhost:3000/api/doctor/**************/
  getDoctorByRegNumber(regNo: any) : Observable<any> {
    return this.http.get('http://localhost:3000/api/doctor/getByRegNumber/' + String(regNo));
  }
  getAllDoctors(): Observable<any> {
    return this.http.get('http://localhost:3000/api/doctor/getAll');
  }

  /*************http://localhost:3000/api/appointment/**************/
  getAppointmentByDoctorAtDate(docRegNumber: any , date: string) {
    return this.http.get('http://localhost:3000/api/appointment/getByDoctor@Date/' + String(docRegNumber) + '/' + String(date));
  }
}
